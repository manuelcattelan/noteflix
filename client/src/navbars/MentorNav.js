import React from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import Avatar from 'react-nice-avatar';
import { HashLink as Link } from 'react-router-hash-link';
import logolight from "../media/logolight.svg"

const MentorNav = (props) => {
    return (
        <>
            <Navbar className="mx-5 mt-1" collapseOnSelect expand="lg" style={{position:"sticky", top: "0", zIndex:"100"}}>
                    <Navbar.Brand href="#home">
                        <Link to="/">
                            <img
                                alt=""
                                src={logolight}
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <Badge bg="light" text="primary" style={{border:"1px solid #623FF0"}} className="ms-3" >
                                <span style={{fontSize:"12px"}}>Mentore</span>
                            </Badge>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Link to="/mentorconsole">
                                <Nav.Link href="#def" className="Navtheme">Console mentore</Nav.Link>
                            </Link>
                            <Link to="/upload">
                                <Nav.Link href="#def" className="Navtheme">Carica un file</Nav.Link>
                            </Link>
                            <Link to="/">
                                <Nav.Link href="#def" className="Navtheme">Piattaforma</Nav.Link>
                            </Link>
                            <Link to="/library">
                                <Nav.Link href="#def" className="Navtheme">Libreria personale</Nav.Link>
                            </Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={props.persona.username} className="fw-bold mt-1 me-2 text-decoration-underline">
                                <NavDropdown.Item href="#" onClick={props.handleLogout}>
                                    Disconnettiti
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Avatar style={{ width: '3rem', height: '3rem' }} {...props.persona.avatar}/>
                        </Nav>
                        
                    </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default MentorNav;