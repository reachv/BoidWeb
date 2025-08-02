import { Paper, Typography } from "@mui/material";
import { Row, Col, Image } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import {a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FlockingCode } from "../CodeSnippets/FlockingSnippet";
import AlignmentGif from '/alignment.gif'
import CohesionGif from '/cohesion.gif'
import SeparationGif from '/separation.gif'

export function Flocking(){

    return(
        <>
            <Row className='align-items-center' style={{padding:"2em", paddingBottom:"0em"}}>
                <Col>
                    <Typography variant='h4'>
                    Boids' Behavior
                    </Typography> 
                    <Typography variant='body1'>
                    Each boid in the simulation follows Craig Reynolds' flocking rules:  
                    <strong> Separation </strong>,  
                    <strong> Alignment </strong>, and  
                    <strong> Cohesion </strong>. 
                    <ul>
                        <li>
                        <strong>Separation</strong>: Boids avoid crowding by calculating a repulsion vector from nearby flockmates that are within a close proximity. 
                        The vector is weighted by distance, ensuring stronger avoidance for closer neighbors.
                        </li>
                        <li>
                        <strong>Alignment</strong>: Boids steer to match the average velocity of nearby boids. 
                        This is achieved by averaging the velocity vectors of all neighbors within a specified range and applying a steering force toward that average direction.
                        </li>
                        <li>
                        <strong>Cohesion</strong>: Boids are drawn toward the center of mass of nearby flockmates. This is done by averaging the positions of neighbors and steering toward the resulting point.
                        </li>
                    </ul>
                    </Typography>
                </Col>
                <Col>
                    <Paper elevation={16}>
                        <SyntaxHighlighter language='typescript' style={a11yDark}>
                            {FlockingCode}
                        </SyntaxHighlighter>
                    </Paper>
                </Col>
            </Row>
            <Row style={{padding:"2em"}}>
                <Paper elevation={16} style={{backgroundColor:"rgb(43,43,43)", color:"#f0f8ff"}}>
                    <Row style={{padding:"1em", textAlign:"center"}}>
                        <Col>
                            <Typography variant='h6'>Alignment</Typography>
                            <Image fluid src={AlignmentGif} />
                        </Col>
                        <Col>
                            <Typography variant='h6'>Cohesion</Typography>
                            <Image fluid src={CohesionGif} />
                        </Col>
                        <Col>
                            <Typography variant='h6'>Separation</Typography>
                            <Image fluid src={SeparationGif} />
                        </Col>
                    </Row>
                </Paper>

            </Row>
        </>
    )
}