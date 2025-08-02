import { type P5CanvasInstance} from '@p5-wrapper/react';
import { Boid } from '../BoidClass/Boid';
import { Octree } from '../BoidClass/Octree';
import type { MySketchProps } from '../BoidClass/MySketchProps';
import { CONFIG } from '../BoidClass/Config';

// ============================================================================
// BATCH RENDERING FUNCTION
// ============================================================================
function renderBoidsBatch(p5: P5CanvasInstance<MySketchProps>, boids: Boid[]): void {
    // Set rendering properties once for all boids
    p5.strokeWeight(CONFIG.VISUAL.BOID_WEIGHT);
    p5.stroke(...CONFIG.VISUAL.BOID_COLOR);
    
    // Render all boids in a single draw call setup
    p5.beginShape(p5.POINTS);
    for (const boid of boids) {
        const [x, y, z] = boid.getPositionData();
        p5.point(x, y, z);
    }
    p5.endShape();
}

// ============================================================================
// MAIN SKETCH FUNCTION
// ============================================================================
export function mySketch(p5: P5CanvasInstance<MySketchProps>) {
    let flock: Boid[] = [];
    let draw = false;
    let canvasSize = p5.min(p5.windowHeight, p5.windowWidth);
    canvasSize *= CONFIG.CANVAS_SCALE;
    let octree: Octree = new Octree(p5.createVector(0, 0, 0), canvasSize);
    let frameCounter = 0;
    p5.setup = () => {
        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);

        // Create boids
        for (let i = 0; i < 10; i++) {
            flock.push(new Boid(p5));
        }
    };

    p5.draw = () => {
        p5.background(...CONFIG.VISUAL.BACKGROUND);
        p5.orbitControl();

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
        if(!draw){
            p5.box(2*p5.width, 2*p5.height, 2*p5.width)
        }
    };

    p5.updateWithProps = (props) => {
        let needsOctreeReset = false;
        
        if (props.size && props.size !== canvasSize) {
            canvasSize = props.size;
            p5.resizeCanvas(props.size, props.size);
            needsOctreeReset = true;
        }
        
        if (props.n && props.n != flock.length) {
            flock = []
            for(let i = 0; i < props.n; i++){
                flock.push(new Boid(p5))
            }
            needsOctreeReset = true;
        }
        
        if (props.draw !== undefined) {
            draw = props.draw;
        }
        
        // Completely reset octree if any structural change occurred
        if (needsOctreeReset) {
            octree = new Octree(p5.createVector(0,0,0), canvasSize);
            // Reset frame counter to force immediate rebuild in next draw
            frameCounter = 0;
        }
    }
}