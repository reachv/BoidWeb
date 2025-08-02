import { Paper, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import OctreeFreezeFrame from "/octreefreezeframe.png"
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { mySketch } from "../boids/sketch";
import { useElementWidth } from "../Handlers/SketchResizeHandlers";
import { PAGE_CONFIG } from "./PageConfig";
import { Instruction } from "./Instructions";
import { lazy, memo, Suspense, useMemo } from "react";

interface OctreeVisualizationProps {
  imageSrc: string;
  imageAlt: string;
  width: number;
}

const LazyImage = lazy(() => import('react-bootstrap').then(module => ({ default: module.Image })));
const OctreeVisualization = memo(({ imageSrc, imageAlt, width }: OctreeVisualizationProps) => {
  const imageSize = useMemo(() => ({
    width: width || 400,
    height: width || 400
  }), [width]);

  return (
    <Paper 
      elevation={16} 
      style={{ backgroundColor: "rgb(43,43,43)", color: "#f0f8ff" }}
      role="img"
      aria-label={imageAlt}
    >
      <Suspense fallback={<div style={{ ...imageSize, backgroundColor: '#333' }}>Loading...</div>}>
        <LazyImage 
          src={imageSrc} 
          alt={imageAlt}
          style={imageSize}
          loading="lazy"
        />
      </Suspense>
    </Paper>
  );
});

export function Octree(){
    const {elementRef, width} = useElementWidth()
    return(
      <>
        <Row className='align-items-center' style={{padding:"2em"}}>
          <Col>
            <Row style={{textAlign:"center"}}>
              <OctreeVisualization 
                imageSrc={OctreeFreezeFrame}
                imageAlt="Visualization of an octree data structure partitioning 3D space"
                width={width}
              />
            </Row>
          </Col>
          <Col>
            <Typography variant='h4'>{PAGE_CONFIG.OCTREE_CONTENT.title}</Typography>
            <Typography variant='body1'>
              {PAGE_CONFIG.OCTREE_CONTENT.introduction}
              <ul>
                {PAGE_CONFIG.OCTREE_CONTENT.implementation.map(({title, explanation}) => (
                  <li>
                    <strong>{title}</strong>: {explanation}
                  </li>
                ))}
              </ul>
            </Typography>
          </Col>
        </Row>
        <Row className='align-items-center' style={{padding:"2em"}}>
          <Col>
            <Typography variant="h4">{PAGE_CONFIG.OCTREE_CONTENT.optimization.title}</Typography>
            <Typography variant='body1'>
                <ul>
                  {PAGE_CONFIG.OCTREE_CONTENT.optimization.content.map((value, index)=>(
                    <li><strong>{PAGE_CONFIG.OCTREE_CONTENT.optimization.methods.at(index)}</strong>: {value}</li>
                  ))}
                </ul>
                {PAGE_CONFIG.OCTREE_CONTENT.optimization.conclusion}
            </Typography>
          </Col>
          <Col xs={6} className="border rounded justify-content-center align-items-center" style={{padding:"2em", textAlign:"center", backgroundColor:PAGE_CONFIG.SECONDARY_COLOR}}>
            <Row ref={elementRef} className='justify-content-center' style={{maxWidth:"100%"}}>
              <ReactP5Wrapper sketch={mySketch} draw={true} n={500} size={elementRef.current?.offsetWidth} />
            </Row>
            {Instruction()}
          </Col>
        </Row>
      </>
    )
}