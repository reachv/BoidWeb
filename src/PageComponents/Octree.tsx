import { Typography } from "@mui/material";
import { Col, Container, Image, Row } from "react-bootstrap";
import OctreeGIF from "/OCTREE_DEMO.gif"
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { OCTREE_CODE } from "../CodeSnippets/OctreeSnippet";
import { TEXT_CONFIG } from "./TextConfigs";
import { PAGE_CONFIG } from "./PageConfig";

export function Octree(){
    const {elementRef, width, show} = useElementWidth()
    return(
      <>
        <Container fluid style={{paddingRight:PAGE_CONFIG.PADDING.CONTAINER_PADDING.RIGHT_PADDING}}>
          <Row>
            <Col xl={4}/>
            <Col xs={12} xl={8}>
              <Row style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP}}>
                <Row className='justify-content-center'>
                  <Image fluid style={{maxWidth:"750px", maxHeight:"750px"}} src={OctreeGIF}/>
                </Row>
                <Row><Typography variant="h2" style={{paddingTop: "1em"}}>{TEXT_CONFIG.OCTREE_CONTENT.TITLE}</Typography></Row>
                <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.OCTREE_CONTENT.CONTENT}</Typography></Row>
              </Row>
            </Col>
          </Row>
          <Row className='justify-content-center' style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom: PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM}}>
            <Col xs={12} lg={6}><SyntaxHighlighter language="typescript" style={gruvboxDark}>{OCTREE_CODE[0]}</SyntaxHighlighter></Col>
            <Col xs={12} lg={6}><SyntaxHighlighter language="typescript" style={gruvboxDark}>{OCTREE_CODE[1]}</SyntaxHighlighter></Col>
          </Row>
          <Row>
            <Col xl={4}/>
            <Col xs={12} xl={8}>
              <Row><Typography variant="body1">{TEXT_CONFIG.OCTREE_CONTENT.OPTIMIZATION}</Typography></Row>
              <Row style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}><Typography variant="body1">That being said, here's it working in real-time.</Typography></Row>
              <Row className='justify-content-center'>
                <Col className="rounded align-item-center" style={{paddingTop:PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom: PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM, textAlign:"center"}}>
                    <Row ref={elementRef}>
                        {show && <ReactP5Wrapper sketch={mySketch(width, 1000)} size={width} draw={true} />}
                    </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
}