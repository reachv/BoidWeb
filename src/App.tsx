import { ReactP5Wrapper } from '@p5-wrapper/react'
import './App.css'
import { mySketch } from './boids/sketch'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
function App() {
  return (
    <>
    <div style={{paddingBottom:"1em"}}>
      <Container className='object-fit-contain border rounded' style={{textAlign:"center", padding:"1em", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
        <ReactP5Wrapper sketch={mySketch} />
        <Row className='justify-content-md-center' style={{paddingTop:"1em"}}>
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
      </Container>
    </div>
      <Container className='object-fit-contain border rounded' style={{padding:"1em", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
        <Row className='justify-content-md-center'>
          <Col md = 'auto'>
            <h1>Boids</h1>
          </Col>
        </Row>
        <Row className='justify-content-md-start'>
          <Col>
            <h2>What are Boids?</h2>
            <p> 
              Boids are a type of artificial life simulation that replicates the flocking behavior observed in birds and other animals that move in groups. 
              Created by Craig Reynolds in 1986, the term "boid" is a play on the word "bird-oid," mimicking the stereotypical New York accent pronunciation of "bird." 
              Since its introduction, the boid model has inspired numerous variations and has become a foundational concept in the study of emergent behavior in artificial systems. 
            </p>
            <h2>Boids' Behavior</h2> 
            <p> Craig Reynolds' original boid model is based on three core behavioral rules: <strong>Separation</strong>, <strong>Alignment</strong>, and <strong>Cohesion</strong>. 
              <ul> 
                <li><strong>Separation</strong>: Avoid crowding neighbors (steer to avoid collisions).</li>
                <li><strong>Alignment</strong>: Steer toward the average heading of nearby flockmates.</li> 
                <li><strong>Cohesion</strong>: Move toward the average position of nearby flockmates.</li> 
              </ul>
              In the demo above, each boid is initialized with a random 3D position, speed, and direction. 
              Boids are assigned a vision radius of 50 units, within which they can detect nearby flockmates.
              Using this perception range, a boid identifies neighboring boids and adjusts its movement based on the three behavioral rules:
              <ul> 
                <li>For <strong>alignment</strong>, the boid matches its direction with the average heading of its neighbors.</li> 
                <li>For <strong>cohesion</strong>, it moves toward the average position of nearby boids.</li> 
                <li>For <strong>separation</strong>, a secondary radius is used to determine if any boids are too close. 
                  The influence of each nearby boid is weighted inversely proportional to its distance, ensuring that closer neighbors exert greater influence on the current boid's behavior, 
                  thereby improving the accuracy and realism of the flocking response.
                </li> 
              </ul> 
            </p>
            <h4>Octree Storage</h4>
            <p>
              In order for boids to accurately mimic flocking behavior, the simulation must continuously check the position of nearby boids. 
              This typically involves iterating through the entire boid population to determine which boids fall within a given vision radius—excluding the boid itself. 
              While this approach is straightforward, it becomes highly inefficient as the number of boids increases.
              To address this performance bottleneck, an Octree data structure was implemented. 
              The octree partitions 3D space into hierarchical regions, enabling the simulation to quickly identify nearby boids based on spatial locality. 
              This significantly reduces the number of distance checks required, eliminating the need to iterate over every boid in the system.
              Instead of scanning the entire population, each boid queries the octree for neighbors within its vision radius. 
              Once the octree returns a list of nearby positions, the flocking behavior calculations (separation, alignment, and cohesion) can be applied efficiently. 
              This approach improves overall performance, particularly in simulations with large numbers of boids.
            </p>
            <h2>Boids' Edge Behavior</h2>
            <p>
              In the demo above, boids are influenced both by the flocking behaviors and by a cubic boundary. 
              When approaching the edges of this cube, boids steer away from the "walls," demonstrating more natural and constrained flocking behavior. 
              This increases the realism of the boids by simulating how real-world animals navigate within environmental limits.
              To produce this behavior, various methods was implemented and tested.
              In the first considered method, the Fibonacci's spiral was used.
            </p>
            <h4>Method One: Fibonacci Spiral</h4>
            <p>
              In this implementation, the method is constrained to a boid’s vision cone to ensure only relevant directions are sampled.
              Boids use this spiral pattern to generate a set of evenly distributed sample directions represented initially in polar coordinates.
              However, polar coordinates describe positions on a 2D plane, which is insufficient for modeling direction in 3D space.
            </p>
            <p>
              To address this, the polar coordinates are translated into spherical coordinates. Instead of using the radius as the key parameter, 
              the angle <em>φ</em> (phi) is used, where <em>0 ≤ φ ≤ π</em>, to define elevation on the sphere. 
              This allows the boids to generate a uniform and unbiased set of directions within their 3D vision cone, 
              which can then be used to sample the surrounding space for obstacles or flockmates.
              Polar coordinates are shifted to spherical coordinates by changing x = rcos(theta), y = rsin(theta) to x = cos(theta) * sin(phi), y = sin(theta) * sin(phi), z = cos(phi) where r = √(n / NumbersOfPoints), theta = π * (1 + √5) * n,
              phi = arcos(1 - 2 * n / NumbersOfPoints), and <em> 0 ≤ n ≤ NumbersOfPoints</em>.
              After generating the list of spherical coordinates, the coordinates are then scaled to the boids' vision radius and raycasted into the environment.
              If the ray remains within bounds and meets predefined parameters, the corresponding direction vector is stored temporarily. 
              Among all valid rays, the one representing the longest clear path is selected, allowing the boid to make informed decisions when steering near edges or potential collisions.
            </p>
            <h4>Cons: Fibonacci's Spiral</h4>
            <p>
              While the Fibonacci spiral provides a well-distributed set of directions for sampling, it comes with a performance cost. 
              To effectively determine the best movement direction, each boid requires approximately 20 to 30 sample points per frame.
              Given that the simulation includes 2,000 boids, this results in the system evaluating between 40,000 and 60,000 direction vectors every frame. 
              This level of computation significantly impacts performance, especially when real-time responsiveness is required.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App

