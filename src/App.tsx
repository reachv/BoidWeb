import { ReactP5Wrapper } from '@p5-wrapper/react'
import './App.css'
import { mySketch } from './boids/sketch'
import { Col, Container, Image, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap'
function App() {
  return (
    <>
      <div style={{padding:"1em"}}>
        <Container fluid>
          <Row>
            <Col>
              <h1>
                Reach Vann
              </h1>
            </Col>
            <Col md={'auto'} style={{paddingTop:"0.5em"}}>
              <Nav className="justify-content-end">
                <Nav.Item style={{ paddingRight: "10px" }}>
                  <a href="https://discord.com/users/208755414181871627">
                    <Image src='/BoidWeb/src/images/discord-logo.png' style={{ height: "32px", width: "32px" }}/>
                  </a>
                </Nav.Item>
              </Nav>
            </Col>
            <Col md={'auto'} style={{paddingTop:"0.5em"}}>
              <Nav className="justify-content-end">
                <Nav.Item style={{ paddingRight: "10px" }}>
                  <a href="https://www.linkedin.com/in/reach-vann-8b24691b0/">
                    <Image src='/BoidWeb/src/images/linkedin-logo.png' style={{ height: "32px", width: "32px" }}/>
                  </a>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{paddingBottom:"1em"}}>
        <Container 
          className='object-fit-contain border rounded' 
          style={{textAlign:"center", padding:"1em", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
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
      <div style={{paddingBottom:"1em"}}>
        <Container 
          className='object-fit-contain border rounded' 
          style={{padding:"1em", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
          <Row className='justify-content-md-center'>
            <Col md = 'auto'>
              <h1>
                Boids
              </h1>
            </Col>
          </Row>
          <Row className='justify-content-md-start'>
            <Col>
              <h2>
                What are Boids?
              </h2>
              <p> 
                Boids are a type of artificial life simulation that replicates the flocking behavior observed in birds and other animals that move in groups. 
                Created by Craig Reynolds in 1986, the term "boid" is a play on the word "bird-oid," mimicking the stereotypical New York accent pronunciation of "bird." 
                Since its introduction, the boid model has inspired numerous variations and has become a foundational concept in the study of emergent behavior in artificial systems. 
              </p>
              <h2>
                Boids' Behavior
              </h2> 
              <p>
                Each boid in the simulation follows Craig Reynolds' foundational flocking rules:  
                <strong> Separation </strong>,  
                <strong> Alignment </strong>, and  
                <strong> Cohesion </strong>. 
                These behaviors are applied through calculated steering forces based on nearby flockmates, which are efficiently queried using an Octree structure.
              </p>
                <ul>
                  <li>
                    <strong>Separation</strong>: Boids avoid crowding by calculating a repulsion vector from nearby flockmates that are within a close proximity. The vector is weighted by distance, ensuring stronger avoidance for closer neighbors.</li>
                  <li>
                    <strong>Alignment</strong>: Boids steer to match the average velocity of nearby boids. 
                    This is achieved by averaging the velocity vectors of all neighbors within a specified range and applying a steering force toward that average direction.
                  </li>
                  <li>
                    <strong>Cohesion</strong>: Boids are drawn toward the center of mass of nearby flockmates. This is done by averaging the positions of neighbors and steering toward the resulting point.
                  </li>
                </ul>
              <p>
                During each simulation frame, a boid queries nearby neighbors within a predetermined-unit radius using the Octree. 
                It accumulates the <code>velocity</code> vectors for alignment, the <code>position</code> vectors for cohesion, and distance-weighted direction vectors for separation. 
                Each of these summed vectors is then normalized and passed to the <code>applySteeringForce()</code> method, which limits the force magnitude and blends it into the boid's current acceleration.
                Boids are also initialized with a random 3D position and direction, with speed constrained by <code>maxSpeed</code> and steering by <code>maxForce</code>. 
                Due to this initial randomization, boids typically begin with slower speeds until they can integrate into a flock.
                The combination of these rules produces natural-looking flocking dynamics that react smoothly and realistically to nearby boids.
              </p>
              <h4>
                Octree Storage
              </h4>
              <p> 
                To efficiently simulate large-scale flocking behavior, boids must continuously identify nearby neighbors within a defined vision radius. 
                A naive approach involves scanning all other boids in the system, which becomes computationally expensive as the number of boids increases. 
                To overcome this bottleneck, a custom <strong>Octree</strong> structure was implemented, significantly enhancing spatial querying performance. 
                The Octree recursively partitions 3D space into eight smaller regions (octants), each represented by a node. 
                The primary class managing this structure is the <code>Octree</code>, which initializes the root node and provides methods for inserting boids, clearing the structure, and querying nearby entities. 
                Each boid is inserted into the tree using the <code>insert(boid)</code> method, which delegates to the <code>OctreeNode</code> class. 
                The <code>OctreeNode</code> maintains a list of boids within a bounding box defined by its <code>BoundingBox</code> object. 
                If the number of boids exceeds a preset <code>maxCapacity</code>, the node subdivides itself into eight children. 
                Subdivision is handled by the <code>subdivide()</code> method, which creates eight new nodes using pre-defined offset patterns and redistributes boids among them based on their positions. 
                To optimize neighbor detection, the Octree supports a <code>query(center, radius)</code> method. This method first checks if a node’s bounding box intersects the search sphere using <code>intersectsSphere()</code>. 
                If it does, it calculates the squared distance between each boid and the query point to determine inclusion. 
                The system limits the returned neighbors to a maximum of 10 boids per query to reduce computation load. 
                If a node is subdivided and fewer than 10 neighbors are found, the query is recursively propagated to its children. 
                The <code>findNeighbors(boid, radius)</code> method wraps this query logic and also filters out the querying boid from the result set. 
                This ensures the boid doesn't influence itself during the flocking behavior calculations (separation, alignment, cohesion). 
                The <code>BoundingBox</code> class defines the spatial limits of each node, using simple min/max boundary checks for <code>contains()</code> and <code>intersectsSphere()</code>. 
                This allows for fast inclusion tests when inserting or querying boids. 
                Before each simulation step, the octree is rebuilt using <code>rebuild(boids)</code>, which clears the current structure and re-inserts all boids based on their updated positions. 
                Thanks to this Octree implementation, the simulation avoids redundant distance checks between all boids. Instead, each boid only needs to check against a small, localized set of neighbors returned by the Octree. 
                This results in a significant boost in performance, especially when handling thousands of agents in real time, making the flocking behavior both scalable and responsive. 
              </p>
              <h2>
                Boids' Edge Behavior
              </h2>
              <p>
                In the demo above, boids are influenced both by the flocking behaviors and by a cubic boundary. 
                When approaching the edges of this cube, boids steer away from the "walls," demonstrating more natural and constrained flocking behavior. 
                This increases the realism of the boids by simulating how real-world animals navigate within environmental limits.
                To produce this behavior, various methods was implemented and tested.
                In the first considered method, the Fibonacci's spiral was used. 
              </p>
              <h4>
                Method One: Fibonacci Spiral
              </h4>
              <p>
                In this implementation, the method is constrained to a boid’s vision cone to ensure only relevant directions are sampled.
                Boids use this spiral pattern to generate a set of evenly distributed sample directions represented initially in polar coordinates.
                However, polar coordinates describe positions on a 2D plane, which is insufficient for modeling direction in 3D space.
                To address this, the polar coordinates are translated into spherical coordinates. Instead of using the radius as the key parameter, 
                the angle <em>φ</em> (phi) is used, where <em>0 ≤ φ ≤ π</em>, to define elevation on the sphere. 
                This allows the boids to generate a uniform and unbiased set of directions within their 3D vision cone, 
                which can then be used to sample the surrounding space for obstacles or flockmates.
                Polar coordinates are shifted to spherical coordinates by changing x = rcos(theta), y = rsin(theta) to 
                x = cos(theta) * sin(phi), y = sin(theta) * sin(phi), z = cos(phi) where r = √(n / NumbersOfPoints), theta = π * (1 + √5) * n,
                phi = arcos(1 - 2 * n / NumbersOfPoints), and <em> 0 ≤ n ≤ NumbersOfPoints</em>.
                After generating the list of spherical coordinates, the coordinates are then scaled to the boids' vision radius and raycasted into the environment.
                If the ray remains within bounds and meets predefined parameters, the corresponding direction vector is stored temporarily. 
                Among all valid rays, the one representing the longest clear path is selected, allowing the boid to make informed decisions when steering near edges or potential collisions.
              </p>
              <h4>
                Cons: Fibonacci's Spiral
              </h4>
              <p>
                While the Fibonacci spiral provides a well-distributed set of directions for sampling, it comes with a performance cost. 
                To effectively determine the best movement direction, each boid requires approximately 20 to 30 sample points per frame.
                Given that the simulation includes 2,000 boids, this results in the system evaluating between 40,000 and 60,000 direction vectors every frame. 
                This level of computation significantly impacts performance, especially when real-time responsiveness is required.
                Due to these constrains, the Fibonacci's spiral was ultimately dropped as a edge collision avoidance system.
              </p>
              <h4>
                Method Two: Linear Velocity
              </h4>
              <p>
                The second method, which proved to be the most intuitive, involved applying a linear repulsion force when environmental boundaries entered a boid’s vision radius. 
                To preserve natural movement, the magnitude of this force was kept minimal—just enough to steer the boid away without causing abrupt directional changes. 
                Upon detection of a boundary within range, the simulation determined which axis-aligned boundary (x, y, or z) was being approached. A corresponding steering vector was then applied in the opposite direction of the detected boundary. 
                To maintain velocity continuity and prevent unnatural acceleration or deceleration, the resulting velocity vector was normalized to preserve the boid’s original speed. 
                Due to the intentionally low steering force, boids were allocated approximately 30% of the total available space as a buffer zone to complete the avoidance maneuver before reaching the boundary. 
                Thanks to its simplicity, the linear velocity method was also highly efficient in terms of performance and memory usage, as it required minimal computational resources.
              </p>
              <h4>
                Cons: Linear Velocity
              </h4>
              <p>
                The primary drawback of using linear velocity was the need for constant re-tuning of the steering force whenever changes were made to the boids’ speed or other applied forces. 
                Any modification to a boid’s movement parameters required recalibration of the boundary avoidance logic. 
                Without proper adjustment, boids were often unable to change direction smoothly and sometimes had to come to a complete stop before redirecting away from a boundary—resulting in unnatural or inefficient behavior. 
                An additional, and somewhat unexpected, limitation was that the simplicity of the implementation left no straightforward method for calculating the required steering force. 
                As a result, any force adjustments had to be determined through trial and error, requiring multiple iterations and fine-tuning.
              </p>
              <p>
                Despite these drawbacks, the linear velocity approach was ultimately chosen for implementation due to its minimal performance footprint, scalability, and sufficient accuracy for real-time edge avoidance in the simulation.
              </p>
              <h2>
                Conclusion
              </h2>
              <p>
                The simulation of boids presented here showcases how simple, biologically inspired rules can lead to complex and realistic emergent behavior. 
                By combining core flocking principles—separation, alignment, and cohesion—with advanced spatial optimization and environmental awareness, the system achieves both visual realism and computational efficiency.
                A key innovation in this simulation is the use of an Octree structure for spatial partitioning. 
                This approach significantly reduces the computational cost of neighbor detection by narrowing the search space for each boid to only those within a relevant 3D region. 
                Without this optimization, real-time performance with thousands of agents would not be feasible. 
                In addressing boundary behavior, two techniques were explored. 
                The Fibonacci spiral sampling method offered high directional accuracy but was computationally expensive and unsuitable for real-time systems. 
                In contrast, the linear velocity repulsion method provided a lightweight and practical solution, allowing boids to navigate environmental constraints with minimal overhead, albeit at the cost of requiring manual tuning.
                Together, these systems form a robust framework capable of simulating lifelike flocking dynamics in a scalable and responsive manner. 
                The resulting behavior not only mirrors that of real-world animal groups but also serves as a compelling example of how local interactions can produce globally 
                coherent motion—a principle central to both artificial life research and real-time interactive systems.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default App

