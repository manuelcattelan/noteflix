import React, {useState, useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import Avatar from 'react-nice-avatar';
import { HashLink as Link } from 'react-router-hash-link';
import ChangePassword from '../components/ChangePassword';
import ChangePlan from '../components/ChangePlan';
import DeleteAccount from '../components/DeleteAccount';
import logolight from "../media/logolight.svg"

const MentorNav = (props) => {

    const persona = JSON.parse(window.localStorage.getItem("persona"))
    
    return (
        <>
            {
                persona
                ?
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
                        <Nav className="ms-auto">
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
                        <Nav className="ms-3 me-2">
                            <Avatar style={{ width: '3rem', height: '3rem' }} {...persona.avatar}/>
                            <NavDropdown title={persona.username} align="end" className="fw-bold mt-1 ms-2">
                                <NavDropdown.Item href="#" onClick={props.handleLogout}>
                                    Disconnettiti
                                </NavDropdown.Item>
                                <hr/>
                                <ChangePassword/>
                                <ChangePlan/>
                                <hr />
                                <DeleteAccount/>
                            </NavDropdown>
                        </Nav>    
                    </Navbar.Collapse>
                </Navbar>
                :
                ""
            }
            
        </>
    );
};

export default MentorNav;