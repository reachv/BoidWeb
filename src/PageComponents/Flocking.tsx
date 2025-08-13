import { Typography } from "@mui/material";
import { Row, Col, Image } from "react-bootstrap";
import AlignmentGif from '/alignment.gif'
import CohesionGif from '/cohesion.gif'
import SeparationGif from '/separation.gif'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FlockingCode } from "../CodeSnippets/FlockingSnippet";
import { TEXT_CONFIG } from "./TextConfigs";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { TwoDBoid } from "../boids/2dboid";
import { sidebar } from "./SideBar";

export function Flocking(display: Boolean = false){
    const {elementRef, width, show} = useElementWidth()
    return(
        <>
            <Row style={{paddingTop:"2em", paddingBottom:"2em"}}>
                <Col xs={4} className="align-self-center">
                    {display && sidebar()}
                </Col>
                <Col xs={8} className="justify-content-end">
                    <Row><Typography variant="body1">{TEXT_CONFIG.INSPIRATIONS}</Typography></Row>
                </Col>
            </Row>
            <Row style={{alignItems:"stretch", fontSize:"1em"}}>
                <Col>
                    <Row style={{minHeight: "100px", alignItems: "flex-start"}}>
                        <Col><Typography variant="body2">
                            <strong>{TEXT_CONFIG.FLOCKING.SEPARATION.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.SEPARATION.CONTEXT} 
                        </Typography></Col>
                       <Col><Typography variant="body2">
                            <strong>{TEXT_CONFIG.FLOCKING.ALIGNMENT.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.ALIGNMENT.CONTEXT} 
                        </Typography></Col>
                        <Col><Typography variant="body2">
                            <strong>{TEXT_CONFIG.FLOCKING.COHESION.TITLE}</strong>: {TEXT_CONFIG.FLOCKING.COHESION.CONTEXT} 
                        </Typography></Col>
                    </Row>
                    <Row style={{paddingTop:"0.5em"}}>
                        <Col><Image fluid src={SeparationGif}></Image></Col>
                        <Col><Image fluid src={AlignmentGif}></Image></Col>
                        <Col><Image fluid src={CohesionGif}></Image></Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{paddingTop:"4em", paddingBottom:"4em"}}>
                <Col xs={4}/>
                <Col xs={8} className="justify-content-end">
                    <Row><Typography variant="h2" style={{paddingTop:"0.5em", paddingBottom:"0.5em"}}>Writing The Three Rules</Typography></Row>
                    <Row><Typography variant="body1">{TEXT_CONFIG.FLOCKING.CODING_TEXT}</Typography></Row>
                </Col>
            </Row>
            <Row>
                <Col xs={6}><SyntaxHighlighter language="typescript" style={lucario}>{FlockingCode[0]}</SyntaxHighlighter></Col>
                <Col xs={6}>
                    <SyntaxHighlighter language="typescript" style={lucario}>{FlockingCode[1]}</SyntaxHighlighter>
                </Col>
            </Row>
            <Row style={{paddingTop:"2em", paddingBottom:"2em"}}>
                <Col xs={4}/>
                <Col xs={8} className="justify-content-end">
                    <Row><Typography variant="body1">{TEXT_CONFIG.FLOCKING.TWO_D_TRANSITION[0]}</Typography></Row>
                    <Row ref={elementRef}><Col style={{textAlign:"center", paddingTop:"2em", paddingBottom:"2em"}}>{show && <ReactP5Wrapper sketch={TwoDBoid(width)} size={width}/>}</Col></Row>
                    <Row><Typography variant="body1">{TEXT_CONFIG.FLOCKING.TWO_D_TRANSITION[1]}</Typography></Row>
                </Col>
            </Row>
            
        </>
    )
}