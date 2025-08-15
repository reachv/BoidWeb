import type { Vector } from "p5";
import { CONFIG } from "./Config";
import { OctreeNode } from "./OctreeNode";
import { BoundingBox } from "./BoundingBox";
import type { Boid } from "./Boid";
import type { P5CanvasInstance} from "@p5-wrapper/react";
import type { MySketchProps } from "./MySketchProps";


export class Octree{
    private boidLocations = new Map<Boid, OctreeNode>();

    root: OctreeNode;

    constructor(center: Vector, size: Vector, maxCapacity = CONFIG.OCTREE_MAX_CAPACITY) {
        const boundary = new BoundingBox(center, size);
        this.root = new OctreeNode(boundary, maxCapacity);
    }

    rebuild(boids: Boid[]): void {
        // Always do a full rebuild to ensure proper octree structure
        this.root.clear();
        this.boidLocations.clear();
        
        for (const boid of boids) {
            const node = this.root.insert(boid);
            if (node) {
                this.boidLocations.set(boid, node);
            }
        }
    }



    findNeighbors(boid: Boid, radius: number): Boid[] {
        return this.root.queryExcluding(boid.position, radius, boid);
    }

    draw(p5: P5CanvasInstance<MySketchProps>): void {
        p5.push();
        p5.stroke(100, 100, 255, 100);
        p5.strokeWeight(1);
        p5.noFill();
        this.root.draw(p5);
        p5.pop();
    }
}
