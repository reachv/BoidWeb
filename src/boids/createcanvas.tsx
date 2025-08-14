import type { P5CanvasInstance } from "@p5-wrapper/react";
import { CONFIG } from "../BoidClass/Config";
import type { MySketchProps } from "../BoidClass/MySketchProps";

export function canvas(INITIAL_SIZE : number) {
    const background = (p5: P5CanvasInstance<MySketchProps>) =>{
        p5.setup = ()=>{
            if(INITIAL_SIZE > 760){
                p5.createCanvas(INITIAL_SIZE, 760);
            }else{
                p5.createCanvas(INITIAL_SIZE, INITIAL_SIZE);
            }
            p5.background(...CONFIG.VISUAL.BACKGROUND)

            p5.stroke(255)
            p5.strokeWeight(5)
            p5.noFill()
            p5.rect(0, 0, p5.width, p5.height)
        }

        p5.updateWithProps = (props)=>{
            if (props.size && props.size !== p5.width) {
                if(props.size > 750){
                    p5.resizeCanvas(props.size, 750)
                }else{
                    p5.resizeCanvas(props.size, props.size);
                }
            }
        }
    }


    return background
} 