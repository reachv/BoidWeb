import { type P5CanvasInstance} from '@p5-wrapper/react';
import { Boid } from '../BoidClass/Boid';
import { Octree } from '../BoidClass/Octree';
import type { MySketchProps } from '../BoidClass/MySketchProps';
import { CONFIG } from '../BoidClass/Config';
import type { Camera } from 'p5';

// ============================================================================
// BATCH RENDERING FUNCTION
// ============================================================================
function renderBoidsBatch(p5: P5CanvasInstance<MySketchProps>, boids: Boid[]): void {
    // Set rendering properties once for all boids
    p5.strokeWeight(CONFIG.VISUAL.BOID_WEIGHT);
    
    // Get camera position
    const [camX, camY, camZ] = [0, 0, CONFIG.CAMERA_RATE + p5.width];
    
    // Calculate max distance from camera to furthest possible corner of bounding box
    const boxSize = p5.width;
    const corners = [
        [-boxSize, -boxSize, -boxSize],
        [-boxSize, -boxSize, boxSize],
        [-boxSize, boxSize, -boxSize],
        [-boxSize, boxSize, boxSize],
        [boxSize, -boxSize, -boxSize],
        [boxSize, -boxSize, boxSize],
        [boxSize, boxSize, -boxSize],
        [boxSize, boxSize, boxSize]
    ];
    
    let maxDistance = 0;
    for (const corner of corners) {
        const dx = corner[0] - camX;
        const dy = corner[1] - camY;
        const dz = corner[2] - camZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        maxDistance = Math.max(maxDistance, dist);
    }

    // Render all boids in a single draw call setup
    for (const boid of boids) {
        const [x, y, z] = boid.getPositionData();

        // Calculate distance from camera position
        const dx = x - camX;
        const dy = y - camY;
        const dz = z - camZ;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = (1 - normalizedDistance) * 255;

        // Set stroke with calculated opacity
        p5.stroke(CONFIG.VISUAL.BOID_COLOR[0], CONFIG.VISUAL.BOID_COLOR[1], CONFIG.VISUAL.BOID_COLOR[2], opacity < 1 ? 1 : opacity);
        p5.point(x, y, z);
    }

}

// ============================================================================
// MAIN SKETCH FUNCTION
// ============================================================================
export function mySketch(INITIAL_SIZE: number, FLOCK_SIZE: number) {
    const sketch = (p5: P5CanvasInstance<MySketchProps>) =>{
        let flock: Boid[] = [];
        let draw = false;
        let octree: Octree
        let frameCounter = 0;
        let camera: Camera
        p5.setup = () => {
            if(INITIAL_SIZE > 750){
                p5.createCanvas(INITIAL_SIZE, 750, p5.WEBGL);
                let sizeVector = p5.createVector(INITIAL_SIZE, 750, INITIAL_SIZE) 
                octree = new Octree(p5.createVector(0, 0, 0), sizeVector)
            }else{
                let sizeVector = p5.createVector(INITIAL_SIZE, INITIAL_SIZE, INITIAL_SIZE) 
                octree = new Octree(p5.createVector(0, 0, 0), sizeVector)
                p5.createCanvas(INITIAL_SIZE, INITIAL_SIZE, p5.WEBGL);
            }
            camera = p5.createCamera()
            // Create boids
            for (let i = 0; i < FLOCK_SIZE; i++) {
                flock.push(new Boid(p5));
            }
        };

        p5.draw = () => {
            p5.background(...CONFIG.VISUAL.BACKGROUND);
            p5.orbitControl();

            camera.setPosition(0, 0, p5.width + CONFIG.CAMERA_RATE);
            camera.lookAt(0, 0, 0);
            
            // Rebuild octree every 2 frames
            if (frameCounter % CONFIG.OCTREE_REBUILD_INTERVAL === 0) {
                octree.rebuild(flock);
            }
            frameCounter++;

            
            //Octree Drawing
            if(draw){
                octree.draw(p5)
            }

            // Update boids (without individual rendering)
            for (const boid of flock) {
                boid.update(octree);
            }

            // Batch render all boids for performance
            renderBoidsBatch(p5, flock);

            // Draw bounding box
            p5.noFill();
            p5.stroke(140);
            p5.strokeWeight(5);
            p5.box(p5.width*1.5,p5.height*1.5, p5.width*1.5)
        };

        p5.updateWithProps = (props) => {

            
            if (props.size && props.size !== p5.width) {
                if(props.size > 750){
                    p5.resizeCanvas(props.size, 750)
                    octree = new Octree(p5.createVector(0,0,0), p5.createVector(props.size, 750, props.size))
                }else{
                    p5.resizeCanvas(props.size, props.size);
                    octree = new Octree(p5.createVector(0,0,0), p5.createVector(props.size, props.size, props.size))
                }
                frameCounter = 0;
            }

            
            if (props.draw !== undefined) {
                draw = props.draw;
            }
        
        }
    }
    return sketch
}