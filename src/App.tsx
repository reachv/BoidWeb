import './App.css'
import { Container } from 'react-bootstrap'
import { Header } from './PageComponents/Header'
import { Flocking } from './PageComponents/Flocking'
import { Octree } from './PageComponents/Octree'
import { Edge } from './PageComponents/Edge'
import { PAGE_CONFIG } from './PageComponents/PageConfig'

function App() {
  return (
    <div style={{borderRadius: "2em", padding:"1em"}}>
      <Container fluid='xxl' className='rounded justify-content-center' style={{paddingTop:"2em", paddingBottom:"2em", backgroundColor: PAGE_CONFIG.COLOR_PALETTE.CONTAINER_COLOR}}>
        {/* HEADER */}
        {Header()}
        {/* FLOCKING */}
        {Flocking()}
        {/* OCTREE */}
        {Octree()}
        {/* EDGE */}
        {Edge()}
      </Container>
    </div>
  )
}

export default App

