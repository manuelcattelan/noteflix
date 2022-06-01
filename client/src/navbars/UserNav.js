import React from 'react';
import { Navbar, Nav, NavDropdown, Badge, Dropdown } from 'react-bootstrap';
import Avatar from 'react-nice-avatar';
import { HashLink as Link } from 'react-router-hash-link';
import ChangePassword from '../components/ChangePassword';
import ChangePlan from '../components/ChangePlan';
import DeleteAccount from '../components/DeleteAccount';
import logolight from "../media/logolight.svg"

const UserNav = (props) => {

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
                                <span style={{fontSize:"12px"}}>Utente</span>
                            </Badge>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/">
                                <Nav.Link href="#def" className="Navtheme">Piattaforma</Nav.Link>
                            </Link>
                            <Link to="/library">
                                <Nav.Link href="#def" className="Navtheme">Libreria personale</Nav.Link>
                            </Link>
                        </Nav>
                        <Nav className="ms-3 me-2">
                            <Avatar style={{ width: '3rem', height: '3rem' }} {...props.persona.avatar}/>
                            <NavDropdown title={props.persona.username} className="fw-bold mt-1 ms-2">
                                <NavDropdown.Item href="#" onClick={props.handleLogout}>
                                    Disconnettiti
                                </NavDropdown.Item>
                                <hr />
                                <NavDropdown.Item>
                                    <Link to="/mentorwannabe" className='text-dark'>
                                        Diventa Mentor
                                    </Link>
                                </NavDropdown.Item>
                                <ChangePassword/>
                                <ChangePlan/>
                                <hr />
                                <DeleteAccount/>
                            </NavDropdown>
                        </Nav>   
                    </Navbar.Collapse>

            </Navbar>
        </>
    );
};

export default UserNav;