import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from './PageComponents/Header'
import { Flocking } from './PageComponents/Flocking'
import { Octree } from './PageComponents/Octree'
import { Edge } from './PageComponents/Edge'
import { sidebar } from './PageComponents/SideBar'
import { ThemeProvider } from '@mui/material'
import { theme } from './Theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div style={{borderRadius: "2em", padding:"1em"}}>
        <Row>
          <Col xs={2}>
          </Col>
          <Col >
            <Container fluid className='rounded justify-content-center' style={{
              padding:"2em",
              background: "linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(17, 34, 64, 0.95) 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              {/* HEADER */}
              {Header()}
              {/* FLOCKING */}
              {Flocking()}
              {/* OCTREE */}
              {Octree()}
              {/* EDGE */}
              {Edge()}
            </Container>
          </Col>
        </Row>
      </div>
    </ThemeProvider>
  )
}

export default App

