import { Typography } from "@mui/material";
import { Row, Col, Image, Container } from "react-bootstrap";
import AlignmentGif from '/FLOCKING_ALIGNMENT.gif'
import CohesionGif from '/FLOCKING_COHESION.gif'
import SeparationGif from '/FLOCKING_SEPARATION.gif'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FlockingCode } from "../CodeSnippets/FlockingSnippet";
import { TEXT_CONFIG } from "./TextConfigs";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { TwoDBoid } from "../boids/2dboid";
import { sidebar } from "./SideBar";
import { PAGE_CONFIG } from "./PageConfig";

export function Flocking(showSideBar: number){
    const {elementRef, width, show} = useElementWidth()

    return(
        <>
            <Container fluid style={{paddingTop:PAGE_CONFIG.PADDING.CONTAINER_PADDING.TOP_PADDING, paddingRight: PAGE_CONFIG.PADDING.CONTAINER_PADDING.RIGHT_PADDING}}>
                <Row>
                    {(showSideBar > 1200) && <Col lg={4}/>}
                    {(showSideBar < 1200 && showSideBar > 992) && <Col lg={4} className="align-self-center">{sidebar()}</Col>}
                    {(showSideBar <= 992) && <Row style={{paddingBottom:"2em"}}>{sidebar()}</Row>}
                    <Col xs={12} lg={8} className="justify-content-end">
                        <Row><Typography variant="body1">{TEXT_CONFIG.INSPIRATIONS[0]}</Typography></Row>
                        <Row style={{paddingTop:"1em"}}><Typography variant="body1">{TEXT_CONFIG.INSPIRATIONS[1]}</Typography></Row>
                    </Col>
                </Row>
                <Row style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom: PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM, alignItems:"stretch"}}>
                    <Col>
                        <Row>
                            <Col xs={12} md={4}>
                                <Row><Image fluid src={SeparationGif}></Image></Row>
                                <Row>
                                    <Typography variant="body2" style={{paddingTop:PAGE_CONFIG.PADDING.SUBTEXT_PADDING, paddingBottom:PAGE_CONFIG.PADDING.SUBTEXT_PADDING}}>
                                        <strong>{TEXT_CONFIG.FLOCKING.SEPARATION.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.SEPARATION.CONTEXT}
                                </Typography>
                                </Row>
                            </Col>
                            <Col xs={12} md={4}>
                                <Row><Image fluid src={AlignmentGif}></Image></Row>
                                <Row>
                                    <Typography variant="body2" style={{paddingTop:PAGE_CONFIG.PADDING.SUBTEXT_PADDING, paddingBottom:PAGE_CONFIG.PADDING.SUBTEXT_PADDING}}>
                                        <strong>{TEXT_CONFIG.FLOCKING.ALIGNMENT.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.ALIGNMENT.CONTEXT}
                                    </Typography>
                                </Row>
                            </Col>
                            <Col xs={12} md={4}>
                                <Row><Image fluid src={CohesionGif}></Image></Row>
                                <Row>
                                    <Typography variant="body2" style={{paddingTop:PAGE_CONFIG.PADDING.SUBTEXT_PADDING, paddingBottom:PAGE_CONFIG.PADDING.SUBTEXT_PADDING}}>
                                        <strong>{TEXT_CONFIG.FLOCKING.COHESION.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.COHESION.CONTEXT}
                                    </Typography>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{paddingTop: PAGE_CONFIG.PADDING.CONTAINER_PADDING.TOP_PADDING, paddingRight: PAGE_CONFIG.PADDING.CONTAINER_PADDING.RIGHT_PADDING}}>
                <Row>
                    <Col xl={4}/>
                    <Col xs={12} xl={8} className="justify-content-end">
                        <Row><Typography variant="h2">Writing The Three Rules</Typography></Row>
                        <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.FLOCKING.CODING_TEXT[0]}</Typography></Row>
                        <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.FLOCKING.CODING_TEXT[1]}</Typography></Row>
                    </Col>
                </Row>
                <Row style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom:PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM}}>
                    <Col xs={12} lg={6}><SyntaxHighlighter language="typescript" style={gruvboxDark}>{FlockingCode[0]}</SyntaxHighlighter></Col>
                    <Col xs={12} lg={6}><SyntaxHighlighter language="typescript" style={gruvboxDark}>{FlockingCode[1]}</SyntaxHighlighter></Col>
                </Row>
                <Row>
                    <Col xl={4}/>
                    <Col xs={12} xl={8} className="justify-content-end">
                        <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.FLOCKING.TWO_D_TRANSITION[0]}</Typography></Row>
                        <Row ref={elementRef}><Col style={{paddingTop: PAGE_CONFIG.PADDING.IMAGE_PADDING.TOP, paddingBottom: PAGE_CONFIG.PADDING.IMAGE_PADDING.BOTTOM, textAlign: "center"}}>{show && <ReactP5Wrapper sketch={TwoDBoid(width)} size={width}/>}</Col></Row>
                        <Row><Typography variant="body1" style={{paddingTop: PAGE_CONFIG.PADDING.PARAGRAPH_PADDING}}>{TEXT_CONFIG.FLOCKING.TWO_D_TRANSITION[1]}</Typography></Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}