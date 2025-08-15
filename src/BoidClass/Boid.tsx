import type { P5CanvasInstance} from "@p5-wrapper/react";
import type { Vector } from "p5";
import { VectorUtils } from "./VectorUtils";
import { CONFIG } from "./Config";
import type { Octree } from "./Octree";
import type { MySketchProps } from "./MySketchProps";

interface FlockingForces {
    alignment: Vector | null;
    cohesion: Vector | null;
    separation: Vector | null;
}

export class Boid{
    readonly position: Vector;
    readonly velocity: Vector;
    private readonly acceleration: Vector;
    private readonly visualRange: Vector;
    p5: P5CanvasInstance<MySketchProps>
    
    // Reusable vectors for calculations - vector pooling optimization
    private readonly tempVector1: Vector;
    private readonly tempVector2: Vector;
    private readonly tempVector3: Vector;
    private readonly tempVector4: Vector;
    
    // Level-of-detail optimization
    private updateCounter: number = 0;

    constructor(p5: P5CanvasInstance<MySketchProps>) {
        this.p5 = p5
        this.position = VectorUtils.createRandom3DVector(p5, CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.width, CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.height, CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.width);
        
        this.velocity = VectorUtils.createRandomVector(p5, -CONFIG.BOID.MAX_SPEED, CONFIG.BOID.MAX_SPEED);
        this.velocity.setMag(CONFIG.BOID.INITIAL_SPEED);
        
        this.acceleration = p5.createVector(0, 0, 0);
        this.visualRange = p5.createVector(
            CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.width,
            CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.height,
            CONFIG.BOID.VISUAL_RANGE_FACTOR * p5.width
        );
        
        // Initialize pooled vectors
        this.tempVector1 = p5.createVector(0, 0, 0);
        this.tempVector2 = p5.createVector(0, 0, 0);
        this.tempVector3 = p5.createVector(0, 0, 0);
        this.tempVector4 = p5.createVector(0, 0, 0);
    }

    applyForces(octree: Octree): void{
        this.applyBoundaryForces()
        this.applyFlockingBehavior(octree)

    }

    applyBoundaryForces(): void {
        // Use pooled vector instead of creating new one
        this.tempVector1.set(0, 0, 0);
        // Quick boundary check optimization - only calculate if near boundaries
        const margin = this.visualRange.x;
        const pos = this.position;
        if (pos.x > -this.p5.width + margin || pos.x < this.p5.width - margin ||
            pos.y > -this.p5.height + margin || pos.y < this.p5.height - margin ||
            pos.z > -this.p5.width + margin || pos.z < this.p5.width - margin) {
            // X boundaries with soft force scaling
            const leftBoundary = -this.p5.width + this.visualRange.x;
            const rightBoundary = this.p5.width - this.visualRange.x;
            if (this.position.x < leftBoundary) {
                const distance = leftBoundary - this.position.x;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.x = CONFIG.BOID.TURNING_FORCE * forceStrength;
            } else if (this.position.x > rightBoundary) {
                const distance = this.position.x - rightBoundary;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.x = -CONFIG.BOID.TURNING_FORCE * forceStrength;
            }
            // Y boundaries with soft force scaling
            const topBoundary = -this.p5.height + this.visualRange.y;
            const bottomBoundary = this.p5.height - this.visualRange.y;
            if (this.position.y < topBoundary) {
                const distance = topBoundary - this.position.y;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.y = CONFIG.BOID.TURNING_FORCE * forceStrength;
            } else if (this.position.y > bottomBoundary) {
                const distance = this.position.y - bottomBoundary;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.y = -CONFIG.BOID.TURNING_FORCE * forceStrength;
            }
            // Z boundaries with soft force scaling
            const frontBoundary = -this.p5.width + this.visualRange.z;
            const backBoundary = this.p5.width - this.visualRange.z;
            if (this.position.z < frontBoundary) {
                const distance = frontBoundary - this.position.z;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.z = CONFIG.BOID.TURNING_FORCE * forceStrength;
            } else if (this.position.z > backBoundary) {
                const distance = this.position.z - backBoundary;
                const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
                this.tempVector1.z = -CONFIG.BOID.TURNING_FORCE * forceStrength;
            }
            this.velocity.add(this.tempVector1);
        }
        VectorUtils.clampToSphere(this.velocity, CONFIG.BOID.MAX_SPEED);
    }

    applyFlockingBehavior(octree: Octree): void {
        const neighbors = octree.findNeighbors(this, CONFIG.BOID.NEIGHBOR_RADIUS);
        if (neighbors.length === 0) return;

        const forces = this.calculateFlockingForces(neighbors);
        
        if (forces.alignment) {
            this.applySteeringForce(forces.alignment, CONFIG.BOID.ALIGNMENT_FORCE);
        }
        if (forces.cohesion) {
            this.applySteeringForce(forces.cohesion, CONFIG.BOID.COHESION_FORCE);
        }
        if (forces.separation) {
            this.applySteeringForce(forces.separation, CONFIG.BOID.SEPARATION_FORCE);
        }
    }

    private calculateFlockingForces(neighbors: Boid[]): FlockingForces {
        // Use pooled vectors instead of creating new ones
        this.tempVector2.set(0, 0, 0); // alignmentSum
        this.tempVector3.set(0, 0, 0); // cohesionSum  
        this.tempVector4.set(0, 0, 0); // separationSum
        
        let alignmentCount = 0;
        let cohesionCount = 0;
        let separationCount = 0;

        for (const neighbor of neighbors) {
            const distSq = VectorUtils.distanceSquared(this.position, neighbor.position);

            // Always apply alignment and cohesion for neighbors
            if (distSq < CONFIG.BOID.ALIGNMENT_DISTANCE_SQ) {
                // Alignment - match average velocity
                this.tempVector2.add(neighbor.velocity);
                alignmentCount++;
            }
            
            if (distSq < CONFIG.BOID.COHESION_DISTANCE_SQ) {
                // Cohesion
                this.tempVector3.add(neighbor.position);
                cohesionCount++;
            }

            if (distSq < CONFIG.BOID.SEPARATION_DISTANCE_SQ) {
                // Separation - use squared distance optimization
                const invDistSq = 1.0 / Math.max(distSq, 0.01); // Avoid sqrt, use squared distance
                this.tempVector1.set(
                    this.position.x - neighbor.position.x,
                    this.position.y - neighbor.position.y,
                    this.position.z - neighbor.position.z
                );
                // Scale by inverse squared distance for performance
                this.tempVector1.mult(invDistSq);
                this.tempVector4.add(this.tempVector1);
                separationCount++;
            }
        }

        return {
            alignment: alignmentCount > 0 ? this.tempVector2.copy().div(alignmentCount) : null,
            cohesion: cohesionCount > 0 ? this.tempVector3.copy().div(cohesionCount).sub(this.position) : null,
            separation: separationCount > 0 ? this.tempVector4.copy().div(separationCount) : null
        };
    }

    private applySteeringForce(force: Vector, multiplier: number): void {
        force.setMag(CONFIG.BOID.MAX_SPEED);
        force.sub(this.velocity);
        force.limit(CONFIG.BOID.MAX_FORCE);
        force.mult(multiplier);
        this.acceleration.add(force);
    }

    render(): void {
        // Individual rendering - kept for compatibility
        this.p5.strokeWeight(CONFIG.VISUAL.BOID_WEIGHT);
        this.p5.stroke(...CONFIG.VISUAL.BOID_COLOR);
        this.p5.point(this.position.x, this.position.y, this.position.z);
    }

    // Method for batch rendering - just returns position data
    getPositionData(): [number, number, number] {
        return [this.position.x, this.position.y, this.position.z];
    }

    update(octree: Octree): void {
        this.updateCounter++;
        
        this.applyForces(octree)
        
        // Calculate target velocity using pooled vector
        this.tempVector1.set(this.velocity.x, this.velocity.y, this.velocity.z);
        this.tempVector1.add(this.acceleration);
        this.tempVector1.limit(CONFIG.BOID.MAX_SPEED);
        
        // Smooth velocity interpolation for natural movement  
        this.velocity.lerp(this.tempVector1, CONFIG.BOID.VELOCITY_SMOOTHING);
        
        // Ensure minimum velocity to prevent stopping
        if (this.velocity.mag() < 0.5) {
            this.velocity.setMag(CONFIG.BOID.INITIAL_SPEED * 0.3);
        }
        
        // Add subtle random variation for organic movement using pooled vector
        this.tempVector2.set(
            this.p5.random(-0.02, 0.02),
            this.p5.random(-0.02, 0.02), 
            this.p5.random(-0.02, 0.02)
        );
        this.velocity.add(this.tempVector2);
        
        this.position.add(this.velocity);
        this.acceleration.mult(CONFIG.BOID.ACCELERATION_DAMPING);
        // Note: render() removed for batch rendering optimization
    }
}