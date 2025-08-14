import { Typography } from "@mui/material"
import { Col, Image, Nav, Row } from "react-bootstrap"
import LinkedInLogo from "/linkedin-logo.png"
import GithubLogo from "/github.png"

export function sidebar(){


    return (
        <>
            <Typography>
                <Typography style={{fontSize:"0.7em"}}>Written by</Typography>
                <Typography >Reach Vann</Typography>
                <Typography style={{fontSize:"0.7em"}}>Published</Typography>
                <Typography >2025.07.21</Typography>
                <Typography style={{fontSize:"0.7em"}}>Contact me on</Typography>  
                <Row>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav >
                            <Nav.Item>
                                <a href="https://www.linkedin.com/in/reach-vann-8b24691b0/">
                                    <Image src={LinkedInLogo} style={{ height: "32px", width: "32px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav >
                            <Nav.Item>
                                <a href="https://github.com/reachv/">
                                    <Image src={GithubLogo} style={{ height: "32px", width: "32px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Typography>
        </>
    )
}