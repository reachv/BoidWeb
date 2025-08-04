
export const PAGE_CONFIG = {
    COLOR_PALETTE:{
        CONTAINER_COLOR: "#035385",
        TEXT_COLOR: "#03071E",
        SKETCH_COLOR: "#67C4E6",
        LIST_GROUP_ITEM_BACKGROUND: "#035385",
        LIST_GROUP_ITEM_TEXT: "#ffffff"
    },
    PRIMARY_COLOR: "#03071E",
    SECONDARY_COLOR: "#DC2F02",
    OCTREE_CONTENT: {
        title: "Octree Optimization",
        introduction: `To efficiently simulate large-scale flocking behavior, boids must continuously identify nearby neighbors within a defined vision radius. 
            A naive approach involves scanning all other boids in the system, which becomes computationally expensive as the number of boids increases.
            For example, in a simulation of 2000 boids, it would be necessary to run roughly 4,000,000 comparisons per frame. Since each boid needs to be check against every boid, 
            this means that 1 boid means 2000 comparisons, 2000 boids means 4,000,000 comparisons. Instead, an octree implementation helps efficiently and effectively manage large numbers of boids.`,
        
        implementation: [
            {title: "Octree", explanation: "A spatial partitioning structure used to efficiently manage and query 3D positions of boids."},
            {title: "OctreeNode", explanation: `Maintains a list of boids within a bounding box defined by its BoundingBox object. 
                    If the number of boids exceeds a preset capacity, the node subdivides itself into eight children.`},
            {title: "BoundingBox", explanation: "a 3D cube-shaped bounding volume in space, useful for spatial queries."},
            ],

        optimization:{
            title: "Optimizing Neighbor Detection",
            content: [
                `Checks if a node's bounding box intersects the search sphere. 
                If it does, it calculates the squared distance between each boid and the query point to determine inclusion. If fewer than 10 neighbors are found, the query is recursively propagated to its children`,
                `Wraps query logic and also filters out the querying boid from the resulting set`,
                `Clears the current structure and re-inserts all boids based on their updated positions`
            ],
            methods: ["query()", "findNeighbor()", "rebuild()"],
            conclusion: `This approach prevents unnecessary distance checks between all boids. Instead, each boid only evaluates a small, localized set of neighbors returned by the octree. 
              As a result, the simulation sees a substantial performance boost—especially when managing thousands of agents in real time.` 
        },

    },

    EDGE_CONTENT: {
        title: "Edge Case",
        body: `In terms of edge case, in typically simulations, boids will just be sent to the other side once they've left the canvas. 
        This causes the boids to not really have a natural feel, since in a sense, they're basically teleporting across the canvas. Instead of this, I chose to implement a linear avoidance system. 
        For this system, once the boid's vision radius intersects with the boundary, a linear replusion force is applied. This acts as a turning force for the boids, allowing them to produce a more life-like turn.`,
        implements: {
            pros:{
                title: "Pros",
                list: ["Simplistic and easy implementation allows for boids to takes seemingly more natural turns as a result", 
                    "Highly adaptable due to straightfoward logic", "Efficient and effective method as each both only takes a constant O(1) processing time"],
            },
            cons: {
                title: "Cons",
                list: ["Fine tuning required: force too high produced a ping-pong effect, force too low allowed for the boids to escape", 
                    "Manual Adjustments were often times required due to the simplistic logic", "Any adjustments made in flocking behavior required adjustments made to the steering force."]
            }
        }
    }
}