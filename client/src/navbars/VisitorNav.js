import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import logolight from "../media/logolight.svg"

const VisitorNav = (props) => {
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
                            {/* <Badge bg="light" text="primary" style={{border:"1px solid #623FF0"}} className="ms-3" >
                                <span style={{fontSize:"12px"}}>Visitatore</span>
                            </Badge> */}
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
                        </Nav>
                        <Nav>
                            <Link to="/signlog" className='ms-3'>
                                <Button>Accedi</Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default VisitorNav;