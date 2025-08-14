import { Typography } from "@mui/material";
import { Col, Image, Row } from "react-bootstrap";
import OctreeGIF from "/OctreeGIF.gif"
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { OCTREE_CODE } from "../CodeSnippets/OctreeSnippet";
import { TEXT_CONFIG } from "./TextConfigs";

export function Octree(){
    const {elementRef, width, show} = useElementWidth()
    return(
      <>
        <Row>
          <Col xs={4}/>
          <Col xs={8}>
            <Row>
              <Row className='justify-content-center' style={{paddingTop: "4em", paddingBottom:"2em"}}><Image fluid style={{maxWidth:"750px", maxHeight:"750px"}} src={OctreeGIF}/></Row>
              <Row><Typography variant="h2" style={{paddingBottom:"1em", paddingTop:"1em"}}>{TEXT_CONFIG.OCTREE_CONTENT.TITLE}</Typography></Row>
              <Row><Typography variant="body1">{TEXT_CONFIG.OCTREE_CONTENT.CONTENT}</Typography></Row>
            </Row>
          </Col>
        </Row>
        <Row className='justify-content-center' style={{paddingTop: "2em", paddingBottom:"2em"}}>
          <Col xs={6}><SyntaxHighlighter language="typescript" style={lucario}>{OCTREE_CODE[0]}</SyntaxHighlighter></Col>
          <Col xs={6}><SyntaxHighlighter language="typescript" style={lucario}>{OCTREE_CODE[1]}</SyntaxHighlighter></Col>
        </Row>
        <Row>
          <Col xs={4}/>
          <Col xs={8}>
            <Row><Typography variant="body1">{TEXT_CONFIG.OCTREE_CONTENT.OPTIMIZATION}</Typography></Row>
            <Row style={{paddingTop:"2em", paddingBottom:"2em"}}><Typography variant="body1">That being said, here's it working in real-time.</Typography></Row>
            <Row className='justify-content-center'>
              <Col className="rounded align-item-center" style={{textAlign:"center"}}>
                  <Row ref={elementRef}>
                      {show && <ReactP5Wrapper sketch={mySketch(width, 1000)} size={width} draw={true} />}
                  </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
}