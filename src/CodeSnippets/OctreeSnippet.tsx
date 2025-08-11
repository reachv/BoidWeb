export const OCTREE_CODE =[
`
private subdivide(): void {
    const { center, size } = this.boundary;
    const newSize = size * 0.5;
    const offset = newSize;

    this.children = OctreeNode.CHILD_OFFSETS.map(([ox, oy, oz]) => {
        const childCenter = center.copy();
        childCenter.add(ox * offset, oy * offset, oz * offset);
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
`,
`   
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
`
]