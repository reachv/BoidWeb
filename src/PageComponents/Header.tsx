import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Row, Col} from "react-bootstrap";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { Instruction } from "./Instructions";
import { Typography } from "@mui/material";

export function Header(){
    const {elementRef, width, show} = useElementWidth()

    return (
        <div>
            <Row>
                <Typography variant="h1" textAlign={"center"}>
                        A Guide to Emulating Flocking Birds using Boids
                </Typography>
            </Row>
            <Row className='align-items-center'>
                <Col>
                    <Row className='justify-content-center'>
                        <Col className="rounded align-item-center" style={{textAlign:"center", zIndex:"10"}}>
                            <Row ref={elementRef}>
                                {show && <ReactP5Wrapper sketch={mySketch(width, 1500)} size={width} />}
                            </Row>
                            {Instruction()}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}