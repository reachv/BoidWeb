import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from './PageComponents/Header'
import { Flocking } from './PageComponents/Flocking'
import { Octree } from './PageComponents/Octree'
import { Edge } from './PageComponents/Edge'
import { responsiveFontSizes, ThemeProvider, Typography } from '@mui/material'
import { theme } from './Theme'
import { PAGE_CONFIG } from './PageComponents/PageConfig'
import { sidebar } from './PageComponents/SideBar'
import { useElementWidth } from './Handlers/SketchResizeHandlers'
import { useState, useEffect } from 'react'

function App() {
  const {elementRef, width} = useElementWidth()
  const [showSidebar, setShowSidebar] = useState(false)
  
  useEffect(() => {
    setShowSidebar(width > 1200)
  }, [width])
  let newTheme = responsiveFontSizes(theme)
  return (
    <ThemeProvider theme={newTheme}>
      <Row style={{paddingLeft:"1em", paddingTop:"1em"}}><Typography variant='h1'>Reach Vann</Typography></Row>
      <div style={{borderRadius: "2em", padding:"1em", paddingTop:"5em"}}>
        <Row ref={elementRef} >
          <Col xs={2}>
            {showSidebar && (
              <Row style={{position:"fixed", top:"40vh"}}>
                {sidebar()}
              </Row>
            )}
          </Col>
          <Col>
            <Container fluid className='rounded justify-content-center' style={{
              padding:"2em",
              background: PAGE_CONFIG.COLOR_PALETTE.CONTAINER_COLOR,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              {/* HEADER */}
              {Header()}
              {/* FLOCKING */}
              {Flocking(!showSidebar)}
              {/* EDGE */}
              {Edge()}
              {/* OCTREE */}
              {Octree()}
            </Container>
          </Col>
        </Row>
      </div>
    </ThemeProvider>
  )
}

export default App

