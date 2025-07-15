import {type P5CanvasInstance}  from '@p5-wrapper/react';
import type { Vector } from 'p5';

export function mySketchOctree(p5: P5CanvasInstance) {
        let n = 500
        let draw = true
        let flock: Boid[] = []
        let octree: Octree
        let frameCount : number = 0
        p5.setup = () => {
            let canvasSize = p5.min(p5.windowHeight, p5.windowWidth)
            p5.createCanvas(750, 750, p5.WEBGL);
            for(let i: number = 0; i < n; i++){
                flock.push(new Boid())
            }
            octree = new Octree(p5.createVector(0,0,0), canvasSize)
        };

        p5.draw = () => {
            p5.background(0);
            p5.orbitControl()
            
            octree.rebuild(flock)
            if(draw){
                octree.draw()
            }
            for(let boid of flock){
                boid.flock(octree)
                boid.update()
                boid.edge()
                boid.show()
            }

            p5.noFill()
            p5.stroke(255)
            p5.strokeWeight(5)
            p5.box(2*p5.width, 2*p5.height, 2*p5.width)
            frameCount++
        };
    
        class Boid {
            position: Vector
            velocity: Vector
            acceleration: Vector
            tempVector: Vector
            VisualRange: Vector
            alignmentSum: Vector
            cohesionSum: Vector
            separationSum: Vector
            maxForce: number
            maxSpeed: number

            constructor() {
                this.alignmentSum = p5.createVector()
                this.cohesionSum = p5.createVector()
                this.separationSum = p5.createVector()
                this.acceleration = p5.createVector()
                this.tempVector = p5.createVector()
                this.position = p5.createVector(p5.random(-p5.width, p5.width),p5.random(-p5.height, p5.height),p5.random(-p5.width, p5.width))
                this.VisualRange = p5.createVector(.3 * p5.width, .3 * p5.height, .3 * p5.width)
                this.velocity = p5.createVector(p5.random(-4, 4), p5.random(-4,4), p5.random(-4,4))
                this.velocity.setMag(4)
                this.maxForce = 0.4
                this.maxSpeed = 8
            }

            edge() {
                let TurningForce = 0.65
                let SteeringVector = p5.createVector()

                if (this.position.x < -p5.width + this.VisualRange.x || this.position.x > p5.width - this.VisualRange.x) {
                    if(this.position.x < -p5.width + this.VisualRange.x){SteeringVector.x += TurningForce} 
                    else{SteeringVector.x -= TurningForce}
                }

                if (this.position.y < -p5.height + this.VisualRange.y || this.position.y > p5.height - this.VisualRange.y) {
                    if(this.position.y < -p5.height + this.VisualRange.y){SteeringVector.y += TurningForce} 
                    else{SteeringVector.y -= TurningForce}
                }

                if (this.position.z < -p5.width + this.VisualRange.z || this.position.z > p5.width - this.VisualRange.z) {
                    if(this.position.z < -p5.width + this.VisualRange.z){SteeringVector.z += TurningForce} 
                    else{SteeringVector.z -= TurningForce}
                }

                this.velocity.add(SteeringVector)
                if (this.velocity.mag() > this.maxSpeed) {
                        this.velocity.normalize()
                        this.velocity.mult(this.maxSpeed)
                    }
            }

            flock(octree : Octree) {
                this.acceleration.mult(0)

                let nearbyBoids = octree.findNeighbors(this, 50)
                if (nearbyBoids.length === 0) { return }
                
                this.alignmentSum.mult(0)
                this.cohesionSum.mult(0)
                this.separationSum.mult(0)

                let alignmentCount = 0
                let cohesionCount = 0
                let separationCount = 0

                for (let other of nearbyBoids) {
                    let dx = this.position.x - other.position.x
                    let dy = this.position.y - other.position.y
                    let dz = this.position.z - other.position.z
                    let distSq = dx * dx + dy * dy + dz * dz

                    if (distSq < 5000) {
                        this.alignmentSum.add(other.velocity)
                        alignmentCount++

                        this.cohesionSum.add(other.position)
                        cohesionCount++

                        if(distSq < 1500){
                            let dist = Math.sqrt(distSq)
                            this.tempVector.set(dx, dy, dz)
                            this.tempVector.div(dist)
                            this.separationSum.add(this.tempVector)
                            separationCount++
                        }
                    }
                }

                if (alignmentCount > 0) {
                    this.alignmentSum.div(alignmentCount)
                    this.applySteeringForce(this.alignmentSum)
                }

                if (cohesionCount > 0) {
                    this.cohesionSum.div(cohesionCount)
                    this.cohesionSum.sub(this.position)
                    this.applySteeringForce(this.cohesionSum, 1.1)
                }

                if (separationCount > 0) {
                    this.separationSum.div(separationCount)
                    this.applySteeringForce(this.separationSum, 1.4)
                }
            }

            applySteeringForce(force: Vector, ForceMult: number = 1.0) {
                force.setMag(this.maxSpeed)
                force.sub(this.velocity)
                force.limit(this.maxForce)
                if(ForceMult != 0){
                    force.mult(ForceMult)
                }
                this.acceleration.add(force)
            }
            
            update() {
                this.position.add(this.velocity)
                this.velocity.add(this.acceleration)
                this.velocity.limit(this.maxSpeed)
                this.acceleration.mult(0)
            }

            show() {
                p5.strokeWeight(1)
                p5.stroke(255)
                p5.point(this.position.x, this.position.y, this.position.z)
            }
        }

        class Octree{
            boundary: BoundingBox
            root: OctreeNode
            constructor(center: Vector, size: number, maxCapacity = 20) {
                this.boundary = new BoundingBox(center, size)
                this.root = new OctreeNode(this.boundary, maxCapacity)
            }

            insert(boid : Boid) {
                return this.root.insert(boid)
            }

            queryRadius(center: Vector, radius: number) {
                return this.root.query(center, radius)
            }

            clear() {
                this.root.clear()
            }

            rebuild(boids: Boid[]) {
                this.clear();
                for (let i = 0; i < boids.length; i++) {
                    this.insert(boids[i])
                }
            }

            findNeighbors(boid : Boid, radius: number) {
                let neighbors = this.queryRadius(boid.position, radius);
                const idx = neighbors.indexOf(boid)
                if (idx !== -1) {
                    neighbors[idx] = neighbors[neighbors.length - 1]
                    neighbors.pop()
                }
                return neighbors;
            }

            draw() {
                p5.push();
                p5.stroke(100, 100, 255, 100); // Light blue, semi-transparent
                p5.strokeWeight(1);
                p5.noFill();
                this.root.draw();
                p5.pop();
            }
        }

        class BoundingBox {
            center: Vector
            size: number
            minX: number
            maxX: number
            minY: number
            maxY: number
            minZ: number
            maxZ: number

            constructor(center: Vector, size:number) {
                this.center = center
                this.size = size
                this.minX = center.x - size
                this.maxX = center.x + size
                this.minY = center.y - size
                this.maxY = center.y + size
                this.minZ = center.z - size
                this.maxZ = center.z + size
            }

            contains(point: Vector) {
                return (point.x >= this.minX && point.x <= this.maxX &&
                    point.y >= this.minY && point.y <= this.maxY &&
                    point.z >= this.minZ && point.z <= this.maxZ)
            }

            intersectsSphere(center: Vector, radius: number) {
                let dx = Math.max(0, Math.max(this.minX - center.x, center.x - this.maxX))
                let dy = Math.max(0, Math.max(this.minY - center.y, center.y - this.maxY))
                let dz = Math.max(0, Math.max(this.minZ - center.z, center.z - this.maxZ))
                return (dx * dx + dy * dy + dz * dz) <= (radius * radius);
            }

            draw() {
                p5.push();
                p5.translate(this.center.x, this.center.y, this.center.z);
                p5.box(this.size * 2);
                p5.pop();
            }
        }

        class OctreeNode {
            boundary: BoundingBox
            maxCapacity: number
            depth: number
            boids: Boid[]
            children: OctreeNode[]
            divided: boolean
            private static childOffsets = [
                [1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1],
                [1, -1, -1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
            ]
            constructor(boundary: BoundingBox, maxCapacity: number, depth = 0) {
                this.boundary = boundary
                this.maxCapacity = maxCapacity
                this.depth = depth
                this.boids = []
                this.children = []
                this.divided = false
            }

            insert(boid: Boid) {
                if (!this.boundary.contains(boid.position)) {
                    return false
                }
                if (this.boids.length < this.maxCapacity) {
                    this.boids.push(boid)
                    return true
                }
                if (!this.divided) {
                    this.subdivide()
                }
                for (let child of this.children) {
                    if (child.insert(boid)) {
                        return true
                    }
                }
                this.boids.push(boid)
                return true
            }

            subdivide() {
                let center = this.boundary.center
                let newSize = this.boundary.size * 0.5
                const offset = newSize * 0.5
                this.children = new Array(8)
                for (let i = 0; i < 8; i++) {
                    const [ox, oy, oz] = OctreeNode.childOffsets[i]  
                    const childCenter = p5.createVector(               
                        center.x + ox * offset,
                        center.y + oy * offset,
                        center.z + oz * offset
                    )
                    this.children[i] = new OctreeNode(                
                        new BoundingBox(childCenter, newSize),
                        this.maxCapacity,
                        this.depth + 1
                    )
                }
                let reDist = [...this.boids]
                this.boids = []
                for (let i = 0, len = reDist.length; i < len; i++) {
                    const boid = reDist[i]
                    let inserted = false
                    for (let j = 0; j < 8; j++) {
                        if (this.children[j].insert(boid)) {
                            inserted = true
                            break
                        }
                    }
                    if (!inserted) {
                        this.boids.push(boid);
                    }
                }
                this.divided = true
            }

            query(center: Vector, radius: number, found: Boid[] = []) {
                if (!this.boundary.intersectsSphere(center, radius)) {
                    return found
                }
                const radiusSq = radius * radius;
                const cx = center.x
                const cy = center.y
                const cz = center.z

                for (let i = 0; i < this.boids.length && found.length < 10; i++) {
                    const boid = this.boids[i]
                    const pos = boid.position
                    const dx = pos.x - cx
                    const dy = pos.y - cy
                    const dz = pos.z - cz
                    const distSq = dx * dx + dy * dy + dz * dz;
                    if (distSq <= radiusSq) {
                        found.push(boid)
                    }
                }
                if (this.divided && found.length < 10) {
                    for (let i = 0; i < 8; i++) {
                        this.children[i].query(center, radius, found)
                        if (found.length >= 10) break
                    }
                }
                return found
            }

            clear() {
                this.boids.length = 0
                this.children.length = 0
                this.divided = false
            }
            draw() {
                if (this.divided || this.boids.length > 0) {
                    p5.push();

                    // Color code by depth
                    let alpha = 60 + (this.depth * 30); // Deeper levels are more opaque
                    switch (this.depth) {
                        case 0: p5.stroke(255, 0, 0, alpha); break;     // Red for root
                        case 1: p5.stroke(0, 255, 0, alpha); break;     // Green for level 1
                        case 2: p5.stroke(0, 0, 255, alpha); break;     // Blue for level 2
                        case 3: p5.stroke(255, 255, 0, alpha); break;   // Yellow for level 3
                        default: p5.stroke(255, 0, 255, alpha); break;  // Magenta for deeper
                    }

                    p5.strokeWeight(1 + this.depth * 0.5); // Thicker lines for deeper levels
                    this.boundary.draw();
                    p5.pop();
                }

                // Recursively draw children
                if (this.divided) {
                    for (let child of this.children) {
                        child.draw();
                    }
                }
            }
        }
};