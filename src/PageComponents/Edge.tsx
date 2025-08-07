import { Typography } from "@mui/material";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Col, Row } from "react-bootstrap";
import { TwoDBoid } from "../boids/2dboid";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { PAGE_CONFIG } from "./PageConfig";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { EdgeCode } from "../CodeSnippets/EdgeSnippet";

export function Edge(){
    const {elementRef, width, show} = useElementWidth()
    return (
        <>
          <Row>
            <Col xs={4}/>
            <Col xs={8}>
              <Row><Typography variant="body1" style={{paddingTop:"2em", paddingBottom:"2em"}}>{PAGE_CONFIG.EDGE_CONTENT.TRANSITION}</Typography></Row>
              <Row><Typography variant="h2">{PAGE_CONFIG.EDGE_CONTENT.TITLE}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop:"2em", paddingBottom:"2em"}}>{PAGE_CONFIG.EDGE_CONTENT.BODY}</Typography></Row>
              <Row><Typography variant="body1">Below is an example of linear replusion working in a 2d space.</Typography></Row>
              <Row ref={elementRef}><Col style={{textAlign:"center", paddingTop:"2em", paddingBottom:"2em"}}>{show && <ReactP5Wrapper sketch={TwoDBoid(width)} size={width}/>}</Col></Row>
              <Row><Typography variant="body1">This is the 2d and 3d implementation of linear replusion.</Typography></Row>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <SyntaxHighlighter language="typescript" style={lucario}>{EdgeCode[1]}</SyntaxHighlighter>
            </Col>
            <Col xs={6}>
              <SyntaxHighlighter language="typescript" style={lucario}>{EdgeCode[0]}</SyntaxHighlighter>
            </Col>
          </Row>
        </>
    )
}