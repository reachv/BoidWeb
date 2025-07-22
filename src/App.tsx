import { ReactP5Wrapper } from '@p5-wrapper/react'
import './App.css'
import { mySketch } from './boids/sketch'
import DiscordLogo from "/discord-logo.png"
import LinkedInLogo from "/linkedin-logo.png"
import GithubLogo from "/github.png"
import PolarCord from "/polar_coordinates.png"
import SphericalCords from "/spherical_coords.png"
import OctreeFreezeFrame from "/octreefreezeframe.png"
import { mySketchOctree } from './boids/sketchoctree'
import  { TwoDBoid } from './boids/2dboid'
import AlignmentGif from '/alignment.gif'
import CohesionGif from '/cohesion.gif'
import SeparationGif from '/separation.gif'

import { Container, Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Card, CardContent, Paper, Typography } from '@mui/material'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'







function App() {
  const FlockingCode =  `
      for (let other of nearbyBoids) {
          let dx = this.position.x - other.position.x
          let dy = this.position.y - other.position.y
          let dz = this.position.z - other.position.z
          let distSq = dx * dx + dy * dy + dz * dz

          if (distSq < 10000) {
              this.alignmentSum.add(other.velocity)
              alignmentCount++

              this.cohesionSum.add(other.position)
              cohesionCount++

              if(distSq < 1500){
                  let dist = Math.sqrt(distSq)
                  this.tempVector.set(dx, dy, dz)
                  this.tempVector.div(dist)
                  this.separationSum.add(this.tempVector)
                  separationCount++
              }
          }
      }
    `
  const OctreeCode = `
  class Octree{
      boundary: BoundingBox
      root: OctreeNode
      constructor(center: Vector, size: number, maxCapacity = 20) {
          this.boundary = new BoundingBox(center, size)
          this.root = new OctreeNode(this.boundary, maxCapacity)
      }
      insert(boid : Boid) {
          return this.root.insert(boid)
      }
      queryRadius(center: Vector, radius: number) {
          return this.root.query(center, radius)
      }
      clear() {
          this.root.clear()
      }
      rebuild(boids: Boid[]) {
          this.clear();
          for (let i = 0; i < boids.length; i++) {
              this.insert(boids[i])
          }
      }
      findNeighbors(boid : Boid, radius: number) {
          let neighbors = this.queryRadius(boid.position, radius);
          const idx = neighbors.indexOf(boid)
          if (idx !== -1) {
              neighbors[idx] = neighbors[neighbors.length - 1]
              neighbors.pop()
          }
          return neighbors;
      }
      draw() {
          p5.push();
          p5.stroke(100, 100, 255, 100); 
          p5.strokeWeight(1);
          p5.noFill();
          this.root.draw();
          p5.pop();
      }
  }`
  return (
    <div>
      <Container className='justify-content-center' style={{paddingTop:"1em"}}>
        <Row className='align-items-center'>
          <Col>
            <ReactP5Wrapper sketch={mySketch} />
             <Row className='justify-content-md-center'>
                <Col md = 'auto'>
                  <ListGroup horizontal>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Scroll to zoom
                    </ListGroupItem>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Hold left click to rotate
                    </ListGroupItem>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Hold right click to shift position
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
          </Col>

          <Col>
            <Typography variant='h2'>
              A guide to boids
            </Typography>
            <Typography variant='h3'>
              by Reach Vann
            </Typography>
          </Col>
        </Row>
        <Row style={{paddingTop:"1em"}}>
          <Col>
            <Typography variant='h4'>
              History of boids
            </Typography>
            <Typography variant='body1'>
              Boids are a type of artificial life simulation that replicates the flocking behavior observed in birds and other animals that move in groups. 
              Created by Craig Reynolds in 1986, the term "boid" is a play on the word "bird-oid," mimicking the stereotypical New York accent pronunciation of "bird." 
              Since its introduction, the boid model has inspired numerous variations and has become a foundational concept in the study of emergent behavior in artificial systems.
            </Typography>
          </Col>
        </Row>
        <Row className='align-items-center' style={{paddingTop:"1em", paddingBottom:"1em"}}>
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
        <Row className='align-items-center' style={{paddingTop:"2em", paddingBottom:"2em"}}>
          <Col sm={"auto"}>
            <Image src={OctreeFreezeFrame}/>
          </Col>
          <Col>
            <Typography variant='h4'>
              Octree Optimization
            </Typography>
            <Typography variant='body1'>
              To efficiently simulate large-scale flocking behavior, boids must continuously identify nearby neighbors within a defined vision radius. 
              A naive approach involves scanning all other boids in the system, which becomes computationally expensive as the number of boids increases. 
              The Octree recursively partitions 3D space into eight smaller regions (octants), each represented by a node. 
              Each boid is inserted into the tree using the <code>insert(boid)</code> method, which delegates to the <code>OctreeNode</code> class. 
              The <code>OctreeNode</code> maintains a list of boids within a bounding box defined by its <code>BoundingBox</code> object. 
              If the number of boids exceeds a preset <code>maxCapacity</code>, the node subdivides itself into eight children. 
              Subdivision creates eight new nodes using pre-defined offset patterns and redistributes boids among them based on their positions. 
            </Typography>
          </Col>
        </Row>
        <Row className='align-items-center'>
          <Col>
            <Typography variant='body1'>
              To optimize neighbor detection, the Octree supports a <code>query(center, radius)</code> method. This method first checks if a node’s bounding box intersects the search sphere. 
              If it does, it calculates the squared distance between each boid and the query point to determine inclusion. 
              The system limits the returned neighbors to a maximum of 10 boids per query to reduce computation load. 
              If a node is subdivided and fewer than 10 neighbors are found, the query is recursively propagated to its children. 
              The <code>findNeighbors(boid, radius)</code> method wraps this query logic and also filters out the querying boid from the result set.  
              Before each simulation step, the octree is rebuilt using <code>rebuild(boids)</code>, which clears the current structure and re-inserts all boids based on their updated positions. 
              This approach prevents unnecessary distance checks between all boids. Instead, each boid only evaluates a small, localized set of neighbors returned by the octree. 
              As a result, the simulation sees a substantial performance boost—especially when managing thousands of agents in real time—making the flocking behavior both scalable and responsive.
            </Typography>
          </Col>
          <Col>
            <ReactP5Wrapper sketch={mySketchOctree}/>
              <Row className='justify-content-md-center'>
                <Col md = 'auto'>
                  <ListGroup horizontal>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Scroll to zoom
                    </ListGroupItem>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Hold left click to rotate
                    </ListGroupItem>
                    <ListGroupItem style={{backgroundColor:"rgba(var(--bs-body-color-rgb))", color: "aliceblue"}}>
                      Hold right click to shift position
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App

