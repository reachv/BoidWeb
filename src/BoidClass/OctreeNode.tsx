import type { Vector } from "p5";
import type { Boid } from "./Boid";
import { BoundingBox } from "./BoundingBox";
import { VectorUtils } from "./VectorUtils";
import type { P5CanvasInstance} from "@p5-wrapper/react";
import type { MySketchProps } from "./MySketchProps";
import { CONFIG } from "./Config";


export class OctreeNode{
    private static readonly CHILD_OFFSETS = [
        [1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1],
        [1, -1, -1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
    ] as const;


    private static readonly DEPTH_COLORS = [
        [255, 0, 0],     // Red for root
        [0, 255, 0],     // Green for level 1
        [0, 0, 255],     // Blue for level 2
        [255, 255, 0],   // Yellow for level 3
        [255, 0, 255]    // Magenta for deeper
    ] as const;

    readonly boundary: BoundingBox;
    readonly maxCapacity: number;
    readonly depth: number;
    
    private boids: Boid[] = [];
    private children: OctreeNode[] = [];
    private isDivided = false;

    constructor(boundary: BoundingBox, maxCapacity: number, depth = 0) {
        this.boundary = boundary;
        this.maxCapacity = maxCapacity;
        this.depth = depth;
    }


    insert(boid: Boid): OctreeNode | null {
        if (!this.boundary.contains(boid.position)) {
            return null;
        }

        if (this.boids.length < this.maxCapacity && !this.isDivided) {
            this.boids.push(boid);
            return this;
        }

        if (!this.isDivided) {
            this.subdivide();
        }

        // Try to insert into children first
        for (const child of this.children) {
            const result = child.insert(boid);
            if (result) {
                return result;
            }
        }

        // If no child can contain it, store in this node
        this.boids.push(boid);
        return this;
    }

    removeBoid(boid: Boid): boolean {
        const index = this.boids.indexOf(boid);
        if (index !== -1) {
            this.boids[index] = this.boids[this.boids.length - 1];
            this.boids.pop();
            return true;
        }
        return false;
    }

    private subdivide(): void {
        const { center, size } = this.boundary;
        const newSize = size.copy();
        newSize.mult(0.5);

        this.children = OctreeNode.CHILD_OFFSETS.map(([ox, oy, oz]) => {
            const childCenter = center.copy();
            childCenter.add(ox * newSize.x, oy * newSize.y, oz * newSize.z);
            return new OctreeNode(
                new BoundingBox(childCenter, newSize),
                this.maxCapacity,
                this.depth + 1
            );
        });

        // Redistribute existing boids
        const boidsToRedistribute = [...this.boids];
        this.boids = [];

        for (const boid of boidsToRedistribute) {
            let inserted = false;
            for (const child of this.children) {
                if (child.insert(boid)) {
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                this.boids.push(boid);
            }
        }

        this.isDivided = true;
    }

    queryExcluding(center: Vector, radius: number, exclude: Boid): Boid[] {
        const found: Boid[] = [];
        const stack: OctreeNode[] = [this];
        const radiusSq = radius * radius;
        const maxNeighbors = CONFIG.MAX_NEIGHBORS_PER_BOID;

        while (stack.length > 0 && found.length < maxNeighbors) {
            const node = stack.pop()!;
            
            if (!node.boundary.intersectsSphere(center, radius)) {
                continue;
            }

            // Check boids in this node with early termination
            for (const boid of node.boids) {
                if (found.length >= maxNeighbors) break;
                
                if (boid !== exclude && VectorUtils.distanceSquared(boid.position, center) <= radiusSq) {
                    found.push(boid);
                }
            }

            // Add children to stack for processing (only if we need more neighbors)
            if (node.isDivided && found.length < maxNeighbors) {
                for (const child of node.children) {
                    stack.push(child);
                }
            }
        }

        return found;
    }

    // Keep original query method for compatibility
    query(center: Vector, radius: number, found: Boid[] = []): Boid[] {
        if (!this.boundary.intersectsSphere(center, radius)) {
            return found;
        }

        const radiusSq = radius * radius;

        // Check boids in this node
        for (const boid of this.boids) {
            
            if (VectorUtils.distanceSquared(boid.position, center) <= radiusSq) {
                found.push(boid);
            }
        }

        // Check children
        if (this.isDivided ) {
            for (const child of this.children) {
                child.query(center, radius, found);
            }
        }

        return found;
    }

    clear(): void {
        this.boids.length = 0;
        
        for (const child of this.children) {
            child.clear();
        }
        
        this.children.length = 0;
        this.isDivided = false;
    }

    draw(p5: P5CanvasInstance<MySketchProps>): void {
        if (!this.isDivided && this.boids.length === 0) return;

        p5.push();
        
        const colorIndex = Math.min(this.depth, OctreeNode.DEPTH_COLORS.length - 1);
        const [r, g, b] = OctreeNode.DEPTH_COLORS[colorIndex];
        const alpha = 60 + (this.depth * 30);
        
        p5.stroke(r, g, b, alpha);
        p5.strokeWeight(2 + this.depth * 0.5);
        this.boundary.draw(p5);
        p5.pop();

        if (this.isDivided) {
            for (const child of this.children) {
                child.draw(p5);
            }
        }
    }
}