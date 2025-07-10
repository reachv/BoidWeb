import p5 from "p5"
import Boid from "./boid"

class Octree{
    boundary: BoundingBox
    root: OctreeNode
    constructor(center: p5.Vector, size: number, maxCapacity = 10, maxDepth = 3) {
        this.boundary = new BoundingBox(center, size)
        this.root = new OctreeNode(this.boundary, maxCapacity, maxDepth)
    }

    insert(boid : Boid) {
        return this.root.insert(boid)
    }

    queryRadius(center: p5.Vector, radius: number) {
        return this.root.query(center, radius)
    }

    clear() {
        this.root.clear()
    }

    rebuild(boids: Boid[]) {
        this.clear();
        for (let i = 0, len = boids.length; i < len; i++) {
            this.insert(boids[i])
        }
    }

    findNeighbors(boid : Boid, radius: number) {
        let neighbors = this.queryRadius(boid.position, radius);
        for (let i = neighbors.length - 1; i >= 0; i--) {
            if (neighbors[i] === boid) {
                neighbors.splice(i, 1)
                break
            }
        }
        return neighbors;
    }
}
class BoundingBox {
    center: p5.Vector
    size: number
    minX: number
    maxX: number
    minY: number
    maxY: number
    minZ: number
    maxZ: number

    constructor(center: p5.Vector, size:number) {
        this.center = center
        this.size = size
        this.minX = center.x - size
        this.maxX = center.x + size
        this.minY = center.y - size
        this.maxY = center.y + size
        this.minZ = center.z - size
        this.maxZ = center.z + size
    }

    contains(point: p5.Vector) {
        return (point.x >= this.minX && point.x <= this.maxX &&
            point.y >= this.minY && point.y <= this.maxY &&
            point.z >= this.minZ && point.z <= this.maxZ)
    }

    intersectsSphere(center: p5.Vector, radius: number) {
        let dx = Math.max(0, Math.max(this.minX - center.x, center.x - this.maxX))
        let dy = Math.max(0, Math.max(this.minY - center.y, center.y - this.maxY))
        let dz = Math.max(0, Math.max(this.minZ - center.z, center.z - this.maxZ))
        return (dx * dx + dy * dy + dz * dz) <= (radius * radius);
    }
}

class OctreeNode {
    boundary: BoundingBox
    maxCapacity: number
    maxDepth: number
    depth: number
    boids: Boid[]
    children: OctreeNode[]
    divided: boolean
    constructor(boundary: BoundingBox, maxCapacity: number, maxDepth: number, depth = 0) {
        this.boundary = boundary
        this.maxCapacity = maxCapacity
        this.maxDepth = maxDepth
        this.depth = depth
        this.boids = []
        this.children = []
        this.divided = false
    }

    insert(boid: Boid) {
        if (!this.boundary.contains(boid.position)) {
            return false
        }
        if (this.boids.length < this.maxCapacity || this.depth >= this.maxDepth) {
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
        this.children[0] = new OctreeNode(new BoundingBox(new p5.Vector(center.x + offset, center.y + offset, center.z + offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[1] = new OctreeNode(new BoundingBox(new p5.Vector(center.x - offset, center.y + offset, center.z + offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[2] = new OctreeNode(new BoundingBox(new p5.Vector(center.x + offset, center.y - offset, center.z + offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[3] = new OctreeNode(new BoundingBox(new p5.Vector(center.x + offset, center.y + offset, center.z - offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[4] = new OctreeNode(new BoundingBox(new p5.Vector(center.x + offset, center.y - offset, center.z - offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[5] = new OctreeNode(new BoundingBox(new p5.Vector(center.x - offset, center.y + offset, center.z - offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[6] = new OctreeNode(new BoundingBox(new p5.Vector(center.x - offset, center.y - offset, center.z + offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)
        this.children[7] = new OctreeNode(new BoundingBox(new p5.Vector(center.x - offset, center.y - offset, center.z - offset), newSize), this.maxCapacity, this.maxDepth, this.depth + 1)

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

    query(center: p5.Vector, radius: number, found: Boid[] = []) {
        if (!this.boundary.intersectsSphere(center, radius)) {
            return found
        }
        const radiusSq = radius * radius;
        const cx = center.x
        const cy = center.y
        const cz = center.z

        for (let i = 0, len = this.boids.length; i < len; i++) {
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

        if (this.divided) {
            for (let child of this.children) {
                child.query(center, radius, found)
            }
        }
        return found
    }

    clear() {
        this.boids.length = 0
        this.children.length = 0
        this.divided = false
    }

}

export default Octree