import {type P5CanvasInstance}  from '@p5-wrapper/react';
import type { Vector } from 'p5';


export function TwoDBoid(p5: P5CanvasInstance){
    let flock : Boid[] = []
    p5.setup = () => {
        let canvasSize = p5.min(p5.windowHeight, p5.windowWidth)
        canvasSize *= .6
        p5.createCanvas(canvasSize, canvasSize)
        for(let i: number = 0; i < 100; i++){
            flock.push(new Boid())
        }
        
    }

    p5.draw = () => {
        p5.background(0)
        for(let boid of flock){
            boid.edge()
            boid.flock(flock)
            boid.update()
            boid.show()
        }
    }

    p5.windowResized = () => {
        let canvasSize = p5.min(p5.windowHeight, p5.windowWidth)
        canvasSize *= .6
        p5.resizeCanvas(canvasSize, canvasSize)
    }

    class Boid{
        position: Vector
        velocity: Vector
        acceleration: Vector
        VisualRange: Vector
        maxSpeed: number
        maxForce: number
        constructor(){
            this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height))
            this.velocity = p5.createVector(p5.random(-4,4), p5.random(-4,4))
            this.VisualRange = p5.createVector(.2 * p5.width, .2 * p5.height)
            this.velocity.setMag(p5.random(2, 4))
            this.acceleration = p5.createVector()
            this.maxSpeed = 4
            this.maxForce = 0.2
        }

        flock(boids: Boid[]){
            let AlignmentAverage: Vector = p5.createVector()
            let AlignmentCount: number = 0

            let CohesionAverage: Vector = p5.createVector()
            let CohesionCount: number = 0

            let SeparationAverage: Vector = p5.createVector()
            let SeparationCount: number = 0

            for(let boid of boids){
                if(boid != this){
                    let distance: number = p5.dist(this.position.x, this.position.y, boid.position.x, boid.position.y)
                    distance *= distance
                    let dx = this.position.x - boid.position.x
                    let dy = this.position.y - boid.position.y
                    let dz = this.position.z - boid.position.z
                    let distSq = dx * dx + dy * dy + dz * dz


                    AlignmentAverage.add(boid.velocity)
                    AlignmentCount++

                    CohesionAverage.add(boid.position)
                    CohesionCount++

                    let dist = Math.sqrt(distSq)
                    let tempVector = p5.createVector(dx, dy, dz)
                    tempVector.div(dist)
                    SeparationAverage.add(tempVector)
                    SeparationCount++
                }
                
            }
            if (AlignmentCount > 0) {
                AlignmentAverage.div(AlignmentCount)
                this.applySteeringForce(AlignmentAverage)
            }
            if (CohesionCount > 0) {
                CohesionAverage.div(CohesionCount)
                CohesionAverage.sub(this.position)
                this.applySteeringForce(CohesionAverage)
            }
            if (SeparationCount > 0) {
                SeparationAverage.div(SeparationCount)
                this.applySteeringForce(SeparationAverage, 1.2)
            }
        }

        applySteeringForce(force: Vector, ForceMult: number = 1.0) {
            force.setMag(this.maxSpeed)
            force.sub(this.velocity)
            force.limit(this.maxForce)
            force.mult(ForceMult)
            this.acceleration.add(force)
        }

        edge(){
                let TurningForce = .25
                let SteeringVector = p5.createVector()

                if (this.position.x < this.VisualRange.x || this.position.x > p5.width - this.VisualRange.x) {
                    if(this.position.x < this.VisualRange.x){SteeringVector.x += TurningForce} 
                    else{SteeringVector.x -= TurningForce}
                }

                if (this.position.y < this.VisualRange.y || this.position.y > p5.height - this.VisualRange.y) {
                    if(this.position.y < this.VisualRange.y){SteeringVector.y += TurningForce} 
                    else{SteeringVector.y -= TurningForce}
                }

                this.velocity.add(SteeringVector)
                if (this.velocity.mag() > this.maxSpeed) {
                        this.velocity.normalize()
                        this.velocity.mult(this.maxSpeed)
            }
        }

        update(){
            this.position.add(this.velocity)
            this.velocity.add(this.acceleration)
            this.velocity.limit(this.maxSpeed)
            this.acceleration.mult(0)
        }
        show(){
            p5.strokeWeight(1)
            p5.stroke(255)
            p5.point(this.position.x, this.position.y)
        }
    }

}



