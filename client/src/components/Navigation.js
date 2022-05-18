import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import logolight from "../media/logolight.svg"
import logodark from "../media/logodark.svg"


const Navigation = (props) => {

    //change theme (light and dark mode)
    const toggleTheme = () => {
        if (props.theme === 'light') {
            props.setTheme('dark')
        } else {
            props.setTheme('light')      
        }
    }


    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{position:"sticky", top: "0", zIndex:"100"}}>
                <Container>
                <Navbar.Brand href="#home">
                    <Link to="/">
                        <img
                            alt=""
                            src={props.theme==="light"? logolight : logodark}
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#def" className="Navtheme">Prezzi</Nav.Link>
                        <Link to="/platform">
                            <Nav.Link href="#def" className="Navtheme">Piattaforma</Nav.Link>
                        </Link>
                        <Nav.Link href="#def" className="Navtheme">Chi siamo</Nav.Link>
                        <NavDropdown title="Impostazioni">
                            <NavDropdown.Item href="#def" onClick={toggleTheme}>
                                Cambia tema
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#def">
                                Altra impostazione
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#def">
                                Altra impostazione
                            </NavDropdown.Item>
                        </NavDropdown>

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

export default Navigation;