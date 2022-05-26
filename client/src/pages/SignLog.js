import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';

import Navigation from '../components/Navigation';
import Signup from '../components/Signup';
import Login from '../components/Login';

const SignLog = (props) => {

    /*
        stato per la variabile form, che conterrà una stringa di testo
        "login" o "signup" a seconda della selezione dell'utente.
        handleSelect cambia il valore di form alla selezione.
        */
       const [form,setForm] = useState("login");
       const handleSelect = (eventKey) => setForm(eventKey);
       
     
    

    return (
        <>
                    <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser}/>
                    <Container className='d-flex justify-content-center mt-2'>
                        <div>
                            <p className="titolo text-center my-5">Tutte le risorse di cui hai <br/>bisogno, a portata di <span className='text-primary'>click.</span></p>
                            <Nav justify variant="tabs" defaultActiveKey="login" onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="login">Accedi</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="signup">Registrati</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {
                                form==="login"
                                ?
                                <Login token={props.token} setToken={props.setToken} theme={props.theme} setTheme={props.toggleTheme} setPage={props.setPage} setNavbar={props.setNavbar}/>
                                :
                                <Signup token={props.token} setToken={props.setToken} theme={props.theme} setTheme={props.toggleTheme} setPage={props.setPage} setNavbar={props.setNavbar}/>
                            }
                        </div>
                    </Container>
            
        </>
    );
};

export default SignLog;