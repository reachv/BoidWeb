import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Row, Col} from "react-bootstrap";
import { mySketch } from "../boids/sketch";
import { Typography } from "@mui/material";
import { PAGE_CONFIG } from "./PageConfig";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { Instruction } from "./Instructions";

export function Header(){
    const {elementRef} = useElementWidth()

    return (
        <div>
            <Row className='align-items-center'>
                <Col xs={6} style={{padding:"2em"}}>
                    <Row className='justify-content-center'>
                        <Col className="border rounded align-item-center" style={{padding:"2em", textAlign:"center", backgroundColor:PAGE_CONFIG.SECONDARY_COLOR}}>
                            <Row ref={elementRef} style={{maxWidth:"100%"}}>
                                <ReactP5Wrapper sketch={mySketch} n={1500} size={elementRef.current?.offsetWidth} />
                            </Row>
                            {Instruction()}
                        </Col>
                    </Row>
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Typography variant='h3'>A guide to Boids</Typography>
                    <Typography variant='h4'>by Reach Vann</Typography>
                </Col>
            </Row>
        </div>
    )
}