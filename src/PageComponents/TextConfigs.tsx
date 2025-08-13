export const TEXT_CONFIG = {
    INSPIRATIONS : `If you watch a group of birds in the wild, you notice that the movements that each bird makes is not entirely random. While it may seem chaotic, it's also rather organized in a sense.
        It's cohesive. It's aligned. Its almost like they're moving as one. So, how do they achieve this movement? 
        In nature, similar to like humans movements, birds will oftentimes react to each other's movements and positionings. 
        They move towards the same general direction, all the while matching the flight speeds of their neighbors, but also away once they're too close to each other. 
        To avoid collision with each other, they will suddenly shift from their position, producing the chaotic element we see.
        Broken down to it's very basic components, we have three straight-forward rules: Separation, Alignment, and Cohesion.
        Using these three simple guides as logics, we replicate the flocking movements we see in the wild within our boid simulation.
    `,

    FLOCKING: {
        SEPARATION: {
            TITLE: "Separation",
            CONTEXT: `Boids avoid crowding by calculating a repulsion vector from nearby flockmates that are within a close proximity. 
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

        CODING_TEXT:`Now that's out of the way, what does it actually look like in practice? 
        The answer, a lot of vectors. To start out with, the boid needs a vector to store their position. 
        Since the simulation is in 3 dimension, that means we need an x, y, and z position. 
        In the case of the above simulation, I randomized their positionings to better display their flocking behaviors.
        Similarly, the boid's velocity also needs to be a 3 dimensional vector for it to move correctly.
        I also randomized their velocity vector. This creates an initial chaos within the boids.
        To mimic real-life birds, I gave the boids a visual range that they use to detect edges.
        Afterwards, it was just a matter of implementing the above 3 behaviors and calculating the force they apply.`
        ,

        TWO_D_TRANSITION: [`With a little bit of tweaking and a little bit of fine tuning, here's what the three rule should look like in conjunction with each other.`,
        `As you can probably tell, there's also another logic affecting the boids. In typically simulations, boids are more or less teleported once they've moved out of the canvas.
        In our case, boids are naturally turning once they're within a certain distance from the edge of the canvas. So, how do we create natural turns?`]
    },

    EDGE_CONTENT: {
        TITLE: "Linear Replusion",

        BODY:`The solution I chose was linear replusion. It's as simple and intutive as it sounds. 
        Once the edge of the canvas has entered the boid's visual radius, a linear replusion force is applied against the appropriate velocity vector.
        The replusion forces the boid into a curved path. As the boid travels towards the canvas' edge, it begins to slow until it reaches zero with respect to it's velocity vector.
        At zero, the replusion force overwhelms the boid's velocity in which case it starts to move in the opposite direction. This creates the natural curves that we see in real-life.
        In the case of implementation, its rather as simple as it seems. Define a visual range for the boids. For my case, around 20% of the canvas was the appropriate amount of space.
        Not big enough to change the boids' flocking behavior, and not small enough to allow the boids to escape off the canvas. 
        Once defined, slowly tweak the range and replusion force until the boids have a natural turn. 
        This should be done after finalizing flocking behaviors as any changes to speed or force to flocking behaviors would require more tweaking and fine tuning.
        The fine percision required to produce realistic turns in the boids is the main drawback of linear replusion.
        Too much force creates a ping-pong effect. Too little force allows for the boids to exit the canvas.
        If the replusion force is equal to the flocking force, it forces the boids to travel in a straight line. 
        So the force needs to match a specific range for it to move naturally.
        `,

        TRANSITION: `With this, we've completed the logics for the boids, but there's still one large problem that we have to address. 
        In larger simulations, performance tanks. If your simulation contains over 500 boids, you've probably notice the massive drop in performance.
        This is due to how flocking works. For the boids to display their flocking behaviors, they have to figure out their neighboring boids. 
        Boids too far can't influence the querying boid. This means we have to figure out the distance between the querying boid and the neighboring boid.
        So far, to do this, we iterate over the entire list of boids. This means that in a simulation of 2,000 boids, we would need to complete 4,000,000 comparisons per frame.
        One boid iterates over 2,000 boids to disqualify boids too far and itself. One means two thousand, two thousand gives us four million. This indicates a time complexity of O(n^2).
        Now that we understand the problem, how do we resolve the performance and inefficiency?`
    },

    OCTREE_CONTENT: {
        TITLE: "Octree Speed Up",

        CONTENT: `So, what is an octree? Like it's name, an octree divides a 3 dimensional space into 8 sub-sections.
        Within these 8 sub-sections, boids are stored using their current positioning. 
        This helps to reduce the search for neighboring boids as we know the location of the querying boid which we then use to find the sub-sections needed.
        Using the querying boid's position and a pre-defined search radius, we can check to see if the boid's querying radius intersects with any other sub-section.
        Once it's determined which sub-sections needs to be search, it returns a list of the boids within. 
        The list is then used to determine flocking behaviors. After all boids are updated, the octree is rebuilt using their new updated location.
        With the octree implementation, we shift the time complexity from O(n^2) to O(n*m) where m < n.
        `,

        OPTIMIZATION: `Even though the octree is both efficiently and effectively superior than a linear search, it's still not fully optimized in it's current state.
        In larger flocks of boids, the simulation will still struggle. 
        Large enough groups with too little separation force, creates the same issue of iterating through unnecessary boids as seen in linear search. 
        Albeit less, the simulation will continue to see performance issues because of this.
        One of the ways I used to optimize the octree was to implement a max capacity for each sub-section and a maximum number of boids, k, to return. 
        Once the current section has reached the max capacity of boids, it will, once again, divide into 8 more sub-sections and the boids are redistributed into the new sub-sections.
        This reduces the amount of boids return as a result of the search query as well as increase the accuracy of the boids return.
        Instead of iterating through sections of the octree, each boid only evaluates a small, localized set of neighbors returned by the octree. 
        This reduce the time complexity from O(n * m) where m < n to O(n * m) where m < k while maintaining the accuracy.
        As a result, the simulation sees a substantial performance boost even when managing thousands of boids in real time.
        `
    },


}