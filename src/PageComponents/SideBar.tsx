import { Typography } from "@mui/material"
import { Col, Image, Nav, Row } from "react-bootstrap"
import DiscordLogo from "/discord-logo.png"
import LinkedInLogo from "/linkedin-logo.png"
import GithubLogo from "/github.png"

export function sidebar(){


    return (
        <>
            <Typography variant="body1">
                <Typography variant="body1">Written by</Typography>
                <Typography variant="h3">Reach Vann</Typography>
                <Typography variant="body1">Published</Typography>
                <Typography variant="h3">2025.07.21</Typography>
                <p>Contact me on</p>    
                <Row>
                    <Col md={'auto'} style={{paddingTop:"0.5em"}}>
                        <Nav >
                            <Nav.Item>
                                <a href="https://discord.com/users/208755414181871627">
                                    <Image src={DiscordLogo} style={{ height: "32px", width: "32px" }}/>
                                </a>
                            </Nav.Item>
                        </Nav>
                    </Col>
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