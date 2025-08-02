import {type P5CanvasInstance}  from '@p5-wrapper/react';
import type { Vector } from 'p5';
import { CONFIG } from '../BoidClass/Config';
import type { MySketchProps } from '../BoidClass/MySketchProps';


export function TwoDBoid(INITAL_SIZE: number){
    const sketch = (p5: P5CanvasInstance<MySketchProps>) =>{
        let flock : Boid[] = []
        p5.setup = () => {
                p5.createCanvas(INITAL_SIZE, INITAL_SIZE)
                for(let i: number = 0; i < 250; i++){
                    flock.push(new Boid())
                }
                
            }

        p5.draw = () => {
            p5.background(...CONFIG.VISUAL.BACKGROUND)
            for(let boid of flock){
                boid.update(flock)
            }
        }


        p5.updateWithProps = (props) => {
            if(props.size){
                let CANVAS_SIZE = props.size
                p5.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE)
            }
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
                this.VisualRange = p5.createVector(.4 * p5.width, .4 * p5.height)
                this.velocity.setMag(p5.random(4, 8))
                this.acceleration = p5.createVector()
                this.maxSpeed = 12
                this.maxForce = 0.12
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
                        let dx = this.position.x - boid.position.x
                        let dy = this.position.y - boid.position.y
                        let distSq = dx * dx + dy * dy 
                        
                        if(distSq < 20000){
                            AlignmentAverage.add(boid.velocity)
                            AlignmentCount++

                            CohesionAverage.add(boid.position)
                            CohesionCount++
                            if(distSq < 256){
                                let dist = Math.sqrt(distSq)
                                let tempVector = p5.createVector(dx, dy)
                                tempVector.div(dist)
                                SeparationAverage.add(tempVector)
                                SeparationCount++
                            }
                        }
                    }
                    
                }
                if (AlignmentCount > 0) {
                    AlignmentAverage.div(AlignmentCount)
                    this.applySteeringForce(AlignmentAverage, 0.8)
                }
                if (CohesionCount > 0) {
                    CohesionAverage.div(CohesionCount)
                    CohesionAverage.sub(this.position)
                    this.applySteeringForce(CohesionAverage, 0.6)
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
                    let TurningForce = .2
                    let SteeringVector = p5.createVector()
                    let boundarySmoothing = 30

                    // Soft X boundaries
                    if (this.position.x < this.VisualRange.x) {
                        let distance = this.VisualRange.x - this.position.x
                        let forceStrength = Math.min(1, distance / boundarySmoothing)
                        SteeringVector.x += TurningForce * forceStrength
                    } else if (this.position.x > p5.width - this.VisualRange.x) {
                        let distance = this.position.x - (p5.width - this.VisualRange.x)
                        let forceStrength = Math.min(1, distance / boundarySmoothing)
                        SteeringVector.x -= TurningForce * forceStrength
                    }

                    // Soft Y boundaries
                    if (this.position.y < this.VisualRange.y) {
                        let distance = this.VisualRange.y - this.position.y
                        let forceStrength = Math.min(1, distance / boundarySmoothing)
                        SteeringVector.y += TurningForce * forceStrength
                    } else if (this.position.y > p5.height - this.VisualRange.y) {
                        let distance = this.position.y - (p5.height - this.VisualRange.y)
                        let forceStrength = Math.min(1, distance / boundarySmoothing)
                        SteeringVector.y -= TurningForce * forceStrength
                    }

                    this.velocity.add(SteeringVector)
                    this.velocity.mult(0.98)
                    if (this.velocity.mag() > this.maxSpeed) {
                            this.velocity.normalize()
                            this.velocity.mult(this.maxSpeed)
                }
            }
            applyForce(boids: Boid[]){
                this.edge()
                this.flock(boids)
            }
            update(boids: Boid[]){
                this.applyForce(boids)
                this.position.add(this.velocity)
                this.velocity.add(this.acceleration)
                this.velocity.limit(this.maxSpeed)
                this.acceleration.mult(0.15)
                this.show()
            }
            show(){
                p5.strokeWeight(2)
                p5.stroke(255)
                p5.point(this.position.x, this.position.y)
            }
        }
    }
    return sketch
}

