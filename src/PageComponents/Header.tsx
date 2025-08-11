import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Row, Col} from "react-bootstrap";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { Typography } from "@mui/material";
import { canvas } from "../boids/createcanvas";

export function Header(){
    const {elementRef, width, show} = useElementWidth()

    return (
        <div>
            <Row>
                <Typography variant="h1" style={{paddingBottom:"0.5em"}}>
                        A Guide to Emulating Flocking Birds using Boids
                </Typography>
            </Row>
            <Row className='align-items-center'>
                <Col>
                    <Row className='justify-content-center'>
                        <Col className="rounded align-item-center" style={{textAlign:"center"}}>
                            <div ref={elementRef} style={{position: "relative"}}>
                                {show && (
                                    <>
                                        <div style={{position: "absolute", top: 0, left: 0, zIndex: 0}}>
                                            <ReactP5Wrapper sketch={canvas(width)} size={width} />
                                        </div>
                                        <div style={{position: "relative", zIndex: 1}}>
                                            <ReactP5Wrapper sketch={mySketch(width, 1500)} size={width} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}