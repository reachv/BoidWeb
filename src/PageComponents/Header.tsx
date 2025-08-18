import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Row, Col} from "react-bootstrap";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { Typography } from "@mui/material";

export function Header(){
    const {elementRef, width, show} = useElementWidth()

    return (
        <div>
            <Row>
                <Typography variant="h2" style={{paddingBottom:"0.5em"}}>
                        Replicating Birds in a 3d Space
                </Typography>
                <Col>
                    <Row className='justify-content-center'>
                        <Col className="rounded align-item-center" style={{textAlign:"center"}}>
                            <div ref={elementRef}>
                                {show && (
                                    <>
                                        <div>
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