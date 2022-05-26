import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import logolight from "../media/logolight.svg"

const VisitorNav = (props) => {
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
                                <span style={{fontSize:"12px"}}>Visitatore</span>
                            </Badge>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#def" className="Navtheme">Prezzi</Nav.Link>
                            <Nav.Link href="#def" className="Navtheme">Chi siamo</Nav.Link>
                            <Link to="/policy">
                                <Nav.Link href="#def" className="Navtheme">Policy</Nav.Link>
                            </Link>
                            

                            <Link to="/signlog" className='ms-3'>
                                <Button>Accedi</Button>
                            </Link>
                            
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default VisitorNav;