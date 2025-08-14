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
    
    // Calculate max distance from camera to furthest corner of bounding box
    const halfSize = p5.width / 2;
    const FAR_CORNER = [-halfSize, halfSize, -halfSize];
    const CLOSE_CORNER = [halfSize, -halfSize, halfSize]


    const dx = CLOSE_CORNER[0] - FAR_CORNER[0];
    const dy = CLOSE_CORNER[1] - FAR_CORNER[1];
    const dz = CLOSE_CORNER[2] - FAR_CORNER[2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    
    // Render all boids in a single draw call setup
    for (const boid of boids) {
        const [x, y, z] = boid.getPositionData();

        const dx = CLOSE_CORNER[0] - x;
        const dy = CLOSE_CORNER[1] - y;
        const dz = CLOSE_CORNER[2] - z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const normalizedDistance = Math.min(distance / dist, 1);
        const opacity = (1 - normalizedDistance) * 255;

        // Set stroke with calculated opacity
        p5.stroke(CONFIG.VISUAL.BOID_COLOR[0], CONFIG.VISUAL.BOID_COLOR[1], CONFIG.VISUAL.BOID_COLOR[2], opacity < 25 ? 25 : opacity);
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
        let octree: Octree = new Octree(p5.createVector(0, 0, 0), INITIAL_SIZE);
        let frameCounter = 0;
        let camera: Camera
        p5.setup = () => {
            if(INITIAL_SIZE > 750){
                p5.createCanvas(750, 750, p5.WEBGL);
            }else{
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
            camera.setPosition(...CONFIG.CAMERA_LOCATION)
            camera.lookAt(0,0,0)
            
            // Draw plane frame centered at camera with 2x width
            p5.push();
            p5.noFill();
            p5.stroke(255, 255, 255, 150);
            p5.strokeWeight(3);
            const planeSize = p5.width * 2;
            const halfSize = planeSize / 2;
            // Position plane between camera and origin, facing camera
            const camX = CONFIG.CAMERA_LOCATION[0];
            const camY = CONFIG.CAMERA_LOCATION[1];
            const camZ = CONFIG.CAMERA_LOCATION[2];
            // Place plane at 1/3 distance from origin to camera
            p5.translate(camX * 0.3, camY * 0.3, camZ * 0.3);
            // Rotate plane to face camera
            p5.rotateY(Math.atan2(camX, camZ));
            p5.rotateX(-Math.atan2(camY, Math.sqrt(camX * camX + camZ * camZ)));
            // Draw rectangle frame manually
            p5.beginShape();
            p5.vertex(-halfSize, -halfSize, 0);
            p5.vertex(halfSize, -halfSize, 0);
            p5.vertex(halfSize, halfSize, 0);
            p5.vertex(-halfSize, halfSize, 0);
            p5.vertex(-halfSize, -halfSize, 0);
            p5.endShape();
            p5.pop();
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
            p5.stroke(255);
            p5.strokeWeight(5);
        };

        p5.updateWithProps = (props) => {

            
            if (props.size && props.size !== p5.width) {
                if(props.size > 750){
                    p5.resizeCanvas(750, 750)
                }else{
                    p5.resizeCanvas(props.size, props.size);
                }
                octree = new Octree(p5.createVector(0,0,0), props.size > 750 ? 750 : props.size);
                frameCounter = 0;
            }
            
            if (props.draw !== undefined) {
                draw = props.draw;
            }
        
        }
    }
    return sketch
}