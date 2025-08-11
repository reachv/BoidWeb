
export const PAGE_CONFIG = {
    COLOR_PALETTE:{
        CONTAINER_COLOR: "rgba(10, 25, 47, 0.95)",
        TEXT_COLOR: "#0A192F",
        SKETCH_COLOR: "#64FFDA",
        LIST_GROUP_ITEM_BACKGROUND: "#112240",
        LIST_GROUP_ITEM_TEXT: "#CCD6F6",
        ACCENT_COLOR: "#64FFDA",
        SECONDARY_ACCENT: "#F76C6C",
        GRADIENT_START: "rgba(100, 255, 218, 0.1)",
        GRADIENT_END: "rgba(17, 34, 64, 0.1)"
    },
    PRIMARY_COLOR: "#0A192F",
    SECONDARY_COLOR: "#F76C6C",
    OCTREE_CONTENT: {
        TITLE: "Octree Implementation",
        INTRODUCTION: `From here, we have to figure out an optimal way to find boids to calculate flocking behaviors. 
        To effectively simulate flocking behavior, these boids have to continuously identify nearby neighbors within the defined vision radius. 
        The naive approach involves scanning all other boids in the system, which becomes pretty intensive on the hardware as the number of boids increases.
        For example, in a simulation of 2000 boids, it would be necessary to run roughly 4,000,000 comparisons per frame. 
        Since each boid needs to be check against every other boid, this means that 1 boid means roughly 2000 comparisons, 2000 boids means 4,000,000 comparisons, effectively making this an O(n^2) time complexity. 
        Instead, we can use an octree implementation to help efficiently and effectively manage large numbers of boids.
        `,
        CONTENT: `So, what is an octree? Like it's name, an octree divides a 3 dimensional space into 8 sub-sections.
        Within these 8 sub-sections, boids are stored using their current positioning. 
        This helps to reduce the search for neighboring boids as we know the location of the querying boid which we then use to find the sub-sections needed.
        Using the querying boid's position and a pre-defined search radius, we can check to see if the boid's querying radius intersects with any other sub-section.
        Once it's determined which sub-sections needs to be search, it returns a list of the boids within. 
        The list is then used to determine flocking behaviors. After all boids are updated, the octree is rebuilt using their new updated location.
        With the octree implementation, we shift the time complexity from O(n^2) to O(n*m) where m < n.
        `,
        OPTIMIZATION: `Although the octree is both efficiently and effectively superior than a linear search, it's still not fully optimized. 
        In larger flocks of boids, the simulation will still struggle. 
        One of the ways I used to optimize the octree was to implement a max capacity for each sub-section and a maximum number of boids, k, to return. 
        Once the current section has reached the max capacity of boids, it will, once again, divide into 8 more sub-sections and the boids are redistributed into the new sub-sections.
        This reduces the amount of boids return as a result of the search query as well as increase the accuracy of the boids return.
        Instead of iterating through sections of the octree, each boid only evaluates a small, localized set of neighbors returned by the octree. 
        This reduce the time complexity from O(n * m) where m < n to O(n * m) where m < k while maintaining the accuracy.
        As a result, the simulation sees a substantial performance boost even when managing thousands of boids in real time.
        `
    },

    EDGE_CONTENT: {
        TITLE: "Edge Case",
        TRANSITION: `Now that we've address optimizing flocking behavior, we have to talk about the edge case. 
        Once a boid reaches the edge of the canvas, typically, a majority of people will allow the boids to appear from the opposite side of the canvas.
        This produces a unnatural effect as the boids are essentially teleporting across the canvas. So, how do we make the boids turn naturally?
        `,
        BODY:`The solution I chose was linear replusion. It's as simple and intutive as it sounds. 
        Once the edge of the canvas has entered the boid's visual radius, a linear replusion force is applied against the appropriate velocity vector.
        The replusion forces the boid into a curved path. As the boid travels towards the canvas' edge, it begins to slow until it reaches zero with respect to it's velocity vector.
        At zero, the replusion force overwhelms the boid's velocity in which case it starts to move in the opposite direction. This creates the natural curves that we see in real-life.
        In the case of implementation, its rather as simple as it seems. Define a visual range for the boids. For my case, around 20% of the canvas was the solution. 
        Once defined, slowly tweak the range and replusion force until the boids have a natural turn. 
        This should be done after flocking behaviors as any changes to speed or force to flocking behaviors would mean more tweaking.
        The main drawback of linear replusion is that any changes means more tweaking. Too much force creates a ping-pong effect. Too little force allows for the boids to exit the canvas.
        If the replusion force is equal to the flocking force, it forces the boids to travel in a straight line. So the force needs to match a specific range for it to move naturally.
        `
    },

    FLOCKING_CONTENT: {
        BACKGROUND: `If you watch a group of birds, you can see that the movements that each bird makes is not entirely random. It appears that they move in an almost dance-like pattern. 
        While it may seem chaotic, it's also rather organized in a sense.
        In nature, similar to like humans movements, birds will oftentimes react to each other's movements and positionings. 
        They move towards the same general direction, all the while matching the flight speeds of their neighbors, but also away once they're too close to each other. 
        To avoid collision with each other, they will suddenly shift from their position, producing the chaotic element we see.
        `,  
        BACKGROUND_TRANSITION:`
        So the question becomes how do we reproduce this effect in a simulation? 
        To mimic natural flocking behaviors, we break down their movements into 3 simple behaviors: Separation, Alignment, and Cohesion.
        `,

        SEPARATION: {
            title: "Separation",
            context: `Boids avoid crowding by calculating a repulsion vector from nearby flockmates that are within a close proximity. 
                        The vector is weighted by distance, ensuring stronger avoidance for closer neighbors.`
        },

        COHESION: {
            TITLE: "Cohesion",
            CONTEXT: `Boids are drawn toward the center of mass of nearby flockmates. This is done by averaging the positions of neighbors and steering toward the resulting point.`
        },

        ALIGNMENT: {
            TITLE: "Alignment",
            CONTEXT: ` Boids steer to match the average velocity of nearby boids. 
                        This is achieved by averaging the velocity vectors of all neighbors within a specified range and applying a steering force toward that average direction.`
        },
        
        CODING_TEXT:`So now that all three rules are addressed, what does it actually look like in practice? 
        The answer, a lot of vectors. To start out with, the boid needs a vector to store their position. 
        Since the simulation is in 3 dimension, that means we need an x, y, and z position. 
        In the case of the above simulation, I randomized their positionings to better display their flocking behaviors.
        Similarly, the boid's velocity also needs to be a 3 dimensional vector for it to move correctly.
        I also randomized their velocity vector. This creates an initial chaos within the boids.
        To mimic real-life birds, I gave the boids a visual range that they use to detect edges.
        Afterwards, it was just a matter of implementing the above 3 behaviors and calculating the force they apply.`,
    }
}