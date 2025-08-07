import { Typography } from "@mui/material"
import { Col, Image, Nav, Row } from "react-bootstrap"
import DiscordLogo from "/discord-logo.png"
import LinkedInLogo from "/linkedin-logo.png"
import GithubLogo from "/github.png"

export function sidebar(){


    return (
        <>
            <Typography variant="body1">
                <p>Written by</p>
                <p style={{fontSize:"20px"}}>Reach Vann</p>
                <p style={{paddingTop:"10px"}}>Published</p>
                <p style={{fontSize:"20px"}}>2025.07.21</p>
                <p>Contact me on</p>    
                <Row>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <a href="https://discord.com/users/208755414181871627">
                                    <Image src={DiscordLogo} style={{ height: "32px", width: "32px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <a href="https://www.linkedin.com/in/reach-vann-8b24691b0/">
                                    <Image src={LinkedInLogo} style={{ height: "32px", width: "32px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav className="justify-content-end">
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