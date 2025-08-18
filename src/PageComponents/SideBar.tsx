import { Typography } from "@mui/material"
import { Col, Image, Nav, Row } from "react-bootstrap"
import LinkedInLogo from "/linkedin-logo.png"
import GithubLogo from "/github.png"

export function sidebar(){


    return (
        <>
            <Typography>
                <Row><Typography variant="sidebar1">Written by</Typography></Row>
                <Row><Typography variant="sidebar2">Reach Vann</Typography></Row>
                <Row><Typography variant="sidebar1">Published</Typography></Row>
                <Row><Typography variant="sidebar2">2025.07.21</Typography></Row>
                <Row><Typography variant="sidebar1">Contact me on</Typography></Row>
                <Row>
                    <Col xs={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav >
                            <Nav.Item>
                                <a href="https://www.linkedin.com/in/reach-vann-8b24691b0/">
                                    <Image src={LinkedInLogo} style={{ height: "24px", width: "24px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav >
                            <Nav.Item>
                                <a href="https://github.com/reachv/">
                                    <Image src={GithubLogo} style={{ height: "24px", width: "24px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Typography>
        </>
    )
}