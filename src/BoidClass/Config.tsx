
export const CONFIG = {
    
    // Camera Location
    CAMERA_LOCATION: [1600.73829884712, -564.3011674295059, 1600.6850185941225],

    //SETUP
    BOID_COUNT: 1500,
    CANVAS_SCALE: .5,
    OCTREE_MAX_CAPACITY: 50,
    OCTREE_REBUILD_INTERVAL: 2,
    
    // Performance optimizations for large groups
    MAX_NEIGHBORS_PER_BOID: 15,
    LOD_DISTANCE_THRESHOLD: 200,
    UPDATE_FREQUENCY_FAR: 3,
    
    // Boid behavior parameters
    BOID: {
        MAX_SPEED: 12,
        MAX_FORCE: 3.5,
        INITIAL_SPEED: 9,
        VISUAL_RANGE_FACTOR: 0.75,
        TURNING_FORCE: 0.2,
        
        // Smoothing parameters
        ACCELERATION_DAMPING: 0.3,
        VELOCITY_DAMPING: 1.0,
        VELOCITY_SMOOTHING: 0.15,
        BOUNDARY_SOFTNESS: 50,
        
        // Distance thresholds (squared for performance)
        SEPARATION_DISTANCE_SQ: 1200,
        COHESION_DISTANCE_SQ: 4900,
        ALIGNMENT_DISTANCE_SQ: 3600,
        NEIGHBOR_RADIUS: 100,
        
        // Force multipliers (gentle for natural movement)
        ALIGNMENT_FORCE: 0.3,
        COHESION_FORCE: 0.25,
        SEPARATION_FORCE: 0.9,
    },
    
    // Visual settings
    VISUAL: {
        BACKGROUND: [100, 19, 37] as const,
        BOID_COLOR: [172, 232, 148] as const,
        BOUNDARY_COLOR: [255, 255, 255] as const,
        BOUNDARY_WEIGHT: 5,
        BOID_WEIGHT: 3,
    }
} as const;


