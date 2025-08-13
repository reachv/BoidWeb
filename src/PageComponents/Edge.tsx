import { Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { EdgeCode } from "../CodeSnippets/EdgeSnippet";
import { TEXT_CONFIG } from "./TextConfigs";

export function Edge(){
    return (
        <>
          <Row>
            <Col xs={4}/>
            <Col xs={8}>
              <Row><Typography variant="h2">{TEXT_CONFIG.EDGE_CONTENT.TITLE}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop:"2em", paddingBottom:"2em"}}>{TEXT_CONFIG.EDGE_CONTENT.BODY}</Typography></Row>
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
          <Row style={{paddingTop:"2em"}}>
            <Col xs={4}/>
            <Col xs={8}>
              <Row><Typography variant="body1">{TEXT_CONFIG.EDGE_CONTENT.TRANSITION}</Typography></Row>
            </Col>
          </Row>
        </>
    )
}