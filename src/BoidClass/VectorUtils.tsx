import type { P5CanvasInstance } from "@p5-wrapper/react";
import type { Vector } from "p5";
import type { MySketchProps } from "./MySketchProps";

export class VectorUtils {
    static distanceSquared(a: Vector, b: Vector): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }

    static createRandomVector(p5: P5CanvasInstance<MySketchProps>, min: number, max: number): Vector {
        return p5.createVector(
            p5.random(min, max),
            p5.random(min, max),
            p5.random(min, max)
        );
    }

    static clampToSphere(vector: Vector, maxMagnitude: number): Vector {
        if (vector.mag() > maxMagnitude) {
            vector.normalize();
            vector.mult(maxMagnitude);
        }
        return vector;
    }

    static createRandom3DVector(p5: P5CanvasInstance<MySketchProps>, first: number = 0, second: number = 0, third: number = 0){
        return p5.createVector(
            p5.random(-first, first),
            p5.random(-second, second),
            p5.random(-third, third)
        )
    }
    
    static dot(A: Vector, B: Vector){
        return A.x * B.x + A.y * B.y + A.z * B.z
    }
}