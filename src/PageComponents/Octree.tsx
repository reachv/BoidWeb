import { Typography } from "@mui/material";
import { Col, Image, Row } from "react-bootstrap";
import OctreeGIF from "/OctreeGIF.gif"
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { PAGE_CONFIG } from "./PageConfig";
import { Instruction } from "./Instructions";

export function Octree(){
    const {elementRef, width, show} = useElementWidth()
    return(
      <>
        <Row>
          <Col xs={4}/>
          <Col xs={8}>
            <Row style={{paddingTop:"2em"}}><Typography variant="body1">{PAGE_CONFIG.OCTREE_CONTENT.INTRODUCTION}</Typography></Row>
            <Row style={{paddingTop:"2em"}}>
              <Row><Typography variant="h2" style={{paddingBottom:"0.5em"}}>{PAGE_CONFIG.OCTREE_CONTENT.TITLE}</Typography></Row>
              <Row><Typography variant="body1">{PAGE_CONFIG.OCTREE_CONTENT.CONTENT}</Typography></Row>
              <Row className='justify-content-center' style={{paddingTop: "2em", paddingBottom:"2em"}}><Image fluid style={{maxWidth:"750px", maxHeight:"750px"}} src={OctreeGIF}/></Row>
              <Row><Typography variant="body1">{PAGE_CONFIG.OCTREE_CONTENT.OPTIMIZATION}</Typography></Row>
              <Row style={{paddingTop:"2em", paddingBottom:"2em"}}><Typography variant="body1">That being said, here's it working in real-time.</Typography></Row>
              <Row className='justify-content-center'>
                <Col className="rounded align-item-center" style={{textAlign:"center", zIndex:"10"}}>
                    <Row ref={elementRef}>
                        {show && <ReactP5Wrapper sketch={mySketch(width, 500)} size={width} draw={true} />}
                    </Row>
                    {Instruction()}
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </>
    )
}