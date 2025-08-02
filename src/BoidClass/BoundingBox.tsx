import type { P5CanvasInstance} from "@p5-wrapper/react";
import  type { Vector } from "p5";
import p5 from "p5";
import type { MySketchProps } from "./MySketchProps";


interface Bounds {
    min: Vector;
    max: Vector;
}

export class BoundingBox{
    readonly center: Vector;
    readonly size: number;
    readonly bounds: Bounds;

    constructor(center: Vector, size: number) {
        this.center = center.copy();
        this.size = size;
        
        const sizeVector = center.copy();
        sizeVector.set(size, size, size);
        
        this.bounds = {
            min: p5.Vector.sub(center, sizeVector),
            max: p5.Vector.add(center, sizeVector)
        };
    }

    contains(point: Vector): boolean {
        return (
            point.x >= this.bounds.min.x && point.x <= this.bounds.max.x &&
            point.y >= this.bounds.min.y && point.y <= this.bounds.max.y &&
            point.z >= this.bounds.min.z && point.z <= this.bounds.max.z
        );
    }

    intersectsSphere(center: Vector, radius: number): boolean {
        const dx = Math.max(0, Math.max(this.bounds.min.x - center.x, center.x - this.bounds.max.x));
        const dy = Math.max(0, Math.max(this.bounds.min.y - center.y, center.y - this.bounds.max.y));
        const dz = Math.max(0, Math.max(this.bounds.min.z - center.z, center.z - this.bounds.max.z));
        return (dx * dx + dy * dy + dz * dz) <= (radius * radius);
    }

    draw(p5: P5CanvasInstance<MySketchProps>): void {
        p5.push();
        p5.translate(this.center.x, this.center.y, this.center.z);
        p5.box(this.size * 2);
        p5.pop();
    }
}