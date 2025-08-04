import { Typography } from "@mui/material";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Col, Row } from "react-bootstrap";
import { TwoDBoid } from "../boids/2dboid";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { PAGE_CONFIG } from "./PageConfig";

export function Edge(){
    const {elementRef, width, show} = useElementWidth()
    return (
        <>
        <Row className='align-items-top' style={{padding:"2em", paddingBottom:"2em"}}>
          <Col xs={8}>
            <Row>
              <Typography variant='h4'>{PAGE_CONFIG.EDGE_CONTENT.title}</Typography>
            </Row>
            <Row>
              <Col xs={6}>
                <Typography variant='body1'>{PAGE_CONFIG.EDGE_CONTENT.body}</Typography>
              </Col>
              <Col xs={6}>
                <strong>{PAGE_CONFIG.EDGE_CONTENT.implements.pros.title}</strong>
                <ul>
                  {PAGE_CONFIG.EDGE_CONTENT.implements.pros.list.map((text) =>(
                    <li>{text}</li>
                  ))}
                </ul>
                <strong>{PAGE_CONFIG.EDGE_CONTENT.implements.cons.title}</strong>
                <ul>
                  {PAGE_CONFIG.EDGE_CONTENT.implements.cons.list.map((text) =>(
                    <li>{text}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={4} style={{padding:"2em"}}>
            <Row  ref={elementRef} style = {{paddingTop:"0.5em"}}>
              {show && <ReactP5Wrapper sketch={TwoDBoid(width)} size = {elementRef.current?.offsetWidth}/>}
            </Row>
          </Col>
        </Row>
        </>
    )
}