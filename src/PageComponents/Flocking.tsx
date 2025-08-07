import { Typography } from "@mui/material";
import { Row, Col, Image } from "react-bootstrap";
import AlignmentGif from '/alignment.gif'
import CohesionGif from '/cohesion.gif'
import SeparationGif from '/separation.gif'
import { PAGE_CONFIG } from "./PageConfig";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FlockingCode } from "../CodeSnippets/FlockingSnippet";

export function Flocking(){

    return(
        <>
            <Row style={{paddingBottom:"1em"}}>
                <Col xs={4}/>
                <Col xs={8} className="justify-content-end">
                    <Row><Typography variant="h2" style={{paddingTop:"0.5em", paddingBottom:"0.5em"}}>Flocking Behaviors</Typography></Row>
                    <Row><Typography variant="body1">{PAGE_CONFIG.FLOCKING_CONTENT.BACKGROUND}</Typography></Row>
                    <Row><Typography variant="body1" style={{paddingTop:"2em", paddingBottom:"2em"}}>{PAGE_CONFIG.FLOCKING_CONTENT.BACKGROUND_TRANSITION}</Typography></Row>
                </Col>
            </Row>
            <Row style={{alignItems:"stretch", fontSize:"1em"}}>
                <Col>
                    <Row style={{minHeight: "100px", alignItems: "flex-start"}}>
                        <Col><Typography variant="body2">
                            <strong>{PAGE_CONFIG.FLOCKING_CONTENT.SEPARATION.title}</strong>: {PAGE_CONFIG.FLOCKING_CONTENT.SEPARATION.context} 
                        </Typography></Col>
                       <Col><Typography variant="body2">
                            <strong>{PAGE_CONFIG.FLOCKING_CONTENT.ALIGNMENT.TITLE}</strong>: {PAGE_CONFIG.FLOCKING_CONTENT.ALIGNMENT.CONTEXT} 
                        </Typography></Col>
                        <Col><Typography variant="body2">
                            <strong>{PAGE_CONFIG.FLOCKING_CONTENT.COHESION.TITLE}</strong>: {PAGE_CONFIG.FLOCKING_CONTENT.COHESION.CONTEXT} 
                        </Typography></Col>
                    </Row>
                    <Row style={{paddingTop:"0.5em"}}>
                        <Col><Image fluid src={SeparationGif}></Image></Col>
                        <Col><Image fluid src={AlignmentGif}></Image></Col>
                        <Col><Image fluid src={CohesionGif}></Image></Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{paddingTop:"4em"}}>
                <Col xs={4}/>
                <Col xs={8} className="justify-content-end">
                    <Row><Typography variant="body1">{PAGE_CONFIG.FLOCKING_CONTENT.CODING_TEXT}</Typography></Row>
                    <Row><Typography variant="body1" style={{paddingTop:"2em", paddingBottom:"2em"}}>{PAGE_CONFIG.FLOCKING_CONTENT.CODING_TEXT_TRANSITION}</Typography></Row>
                </Col>
            </Row>
            <Row>
                <Col xs={6}><SyntaxHighlighter language="typescript" style={lucario}>{FlockingCode[0]}</SyntaxHighlighter></Col>
                <Col xs={6}>
                    <SyntaxHighlighter language="typescript" style={lucario}>{FlockingCode[1]}</SyntaxHighlighter>
                </Col>
            </Row>
        </>
    )
}