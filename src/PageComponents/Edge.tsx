import { Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { EdgeCode } from "../CodeSnippets/EdgeSnippet";
import { TEXT_CONFIG } from "./TextConfigs";
import { PAGE_CONFIG } from "./PageConfig";

export function Edge(){
    return (
        <>
        <Container fluid style={{paddingTop: PAGE_CONFIG.PADDING.CONTAINER_PADDING.TOP_PADDING, paddingRight: PAGE_CONFIG.PADDING.CONTAINER_PADDING.RIGHT_PADDING}}>
          <Row>
            <Col xs={4}/>
            <Col xs={8}>
              <Row><Typography variant="h2">{TEXT_CONFIG.EDGE_CONTENT.TITLE}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.EDGE_CONTENT.BODY[0]}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.EDGE_CONTENT.BODY[1]}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>This is the 2d and 3d implementation of linear replusion.</Typography></Row>
            </Col>
          </Row>
          <Row style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom: PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM}}>
            <Col xs={6}>
              <SyntaxHighlighter language="typescript" style={lucario}>{EdgeCode[1]}</SyntaxHighlighter>
            </Col>
            <Col xs={6}>
              <SyntaxHighlighter language="typescript" style={lucario}>{EdgeCode[0]}</SyntaxHighlighter>
            </Col>
          </Row>
          <Row>
            <Col xs={4}/>
            <Col xs={8}>
              <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.EDGE_CONTENT.TRANSITION[0]}</Typography></Row>
              <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.EDGE_CONTENT.TRANSITION[1]}</Typography></Row>
            </Col>
          </Row>
        </Container>
        </>
    )
}