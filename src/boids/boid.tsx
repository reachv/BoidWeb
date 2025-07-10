import p5 from "p5"
import Octree from "./Octree"

class Boid {
    p5x: p5
    position: p5.Vector
    velocity: p5.Vector
    acceleration: p5.Vector
    tempVector: p5.Vector
    maxForce: number
    maxSpeed: number

    constructor(p5x : p5) {
        this.p5x = p5x
        this.position = new p5.Vector(0,0,0)
        this.velocity = p5.Vector.random3D()
        this.velocity.setMag(p5x.random(3, 4))
        this.acceleration = p5x.createVector()
        this.tempVector = p5x.createVector()
        this.maxForce = .1
        this.maxSpeed = 4
    }

    edge() {
        let VisualRange = this.p5x.createVector(.4 * this.p5x.width, .4 * this.p5x.height, .4 * this.p5x.width)
        let TurningForce = 0.15
        let SteeringVector = this.p5x.createVector()

        if (this.position.x < -this.p5x.width + VisualRange.x || this.position.x > this.p5x.width - VisualRange.x) {
            let inverse = (this.position.x < -this.p5x.width + VisualRange.x) ? 1 : -1
            SteeringVector.add(this.p5x.createVector(TurningForce * inverse, 0, 0))
        }

        if (this.position.y < -this.p5x.height + VisualRange.y || this.position.y > this.p5x.height - VisualRange.y) {
            let inverse = (this.position.y < -this.p5x.height + VisualRange.y) ? 1 : -1
            SteeringVector.add(this.p5x.createVector(0, TurningForce * inverse, 0))
        }

        if (this.position.z < -this.p5x.width + VisualRange.z || this.position.z > this.p5x.width - VisualRange.z) {
            let inverse = (this.position.z < -this.p5x.width + VisualRange.z) ? 1 : -1
            SteeringVector.add(this.p5x.createVector(0, 0, TurningForce * inverse))
        }

        this.velocity.add(SteeringVector)
    }

    flock(octree : Octree) {
        this.acceleration.mult(0)

        let nearbyBoids = octree.findNeighbors(this, 50)
        if (nearbyBoids.length === 0) { return }

        let alignmentSum = this.p5x.createVector()
        let cohesionSum = this.p5x.createVector()
        let separationSum = this.p5x.createVector()

        let alignmentCount = 0
        let cohesionCount = 0
        let separationCount = 0

        for (let other of nearbyBoids) {
            let dx = this.position.x - other.position.x
            let dy = this.position.y - other.position.y
            let dz = this.position.z - other.position.z
            let distSq = dx * dx + dy * dy + dz * dz

            if (distSq < 2500) {
                alignmentSum.add(other.velocity)
                alignmentCount++

                cohesionSum.add(other.position)
                cohesionCount++
            }

            if (distSq < 400 && distSq > 0) {
                let dist = Math.sqrt(distSq)
                this.tempVector.set(dx, dy, dz)
                this.tempVector.div(dist)
                separationSum.add(this.tempVector)
                separationCount++
            }
        }

        if (alignmentCount > 0) {
            alignmentSum.div(alignmentCount)
            alignmentSum.setMag(this.maxSpeed)
            alignmentSum.sub(this.velocity)
            alignmentSum.limit(this.maxForce)
            this.acceleration.add(alignmentSum)
        }

        if (cohesionCount > 0) {
            cohesionSum.div(cohesionCount)
            cohesionSum.sub(this.position)
            cohesionSum.setMag(this.maxSpeed)
            cohesionSum.sub(this.velocity)
            cohesionSum.limit(this.maxForce)
            this.acceleration.add(cohesionSum)
        }

        if (separationCount > 0) {
            separationSum.div(separationCount)
            separationSum.setMag(this.maxSpeed)
            separationSum.sub(this.velocity)
            separationSum.limit(this.maxForce)
            this.acceleration.add(separationSum)
        }
    }

    update() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0)

    }

    show() {
        this.p5x.strokeWeight(5)
        this.p5x.stroke(255)
        this.p5x.point(this.position.x, this.position.y, this.position.z)
    }
}

export default Boid