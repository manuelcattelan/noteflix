import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import logolight from "../media/logolight.svg"

const ModeratorNav = (props) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{position:"sticky", top: "0", zIndex:"100"}}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Link to="/">
                            <img
                                alt=""
                                src={logolight}
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <Badge bg="light" text="primary" style={{border:"1px solid #623FF0"}} className="ms-3" >
                                <span style={{fontSize:"12px"}}>Moderatore</span>
                            </Badge>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/policy">
                                <Nav.Link href="#def" className="Navtheme">Console moderatore</Nav.Link>
                            </Link>
                            <Link to="/">
                                <Nav.Link href="#def" className="Navtheme">Piattaforma</Nav.Link>
                            </Link>
                            <Link to="/library">
                                <Nav.Link href="#def" className="Navtheme">Libreria personale</Nav.Link>
                            </Link>
                            

                            <Button className='ms-3' onClick={props.handleLogout} variant="outline-primary">Logout</Button>

                            
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default ModeratorNav;