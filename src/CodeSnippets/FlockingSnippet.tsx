 export const FlockingCode = [
    `   
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
        this.position = VectorUtils.createRandom3DVector(p5, p5.width, p5.height, p5.width);
        
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
    `,
    ` 
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
    `
 ]