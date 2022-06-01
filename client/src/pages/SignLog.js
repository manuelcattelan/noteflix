import React, { useState } from 'react';
import { Container, Nav, Tabs, Tab } from 'react-bootstrap';

import Navigation from '../components/Navigation';
import Signup from '../components/Signup';
import Login from '../components/Login';

const SignLog = (props) => {
    return (
        <>
                    <Navigation navbar={props.navbar} token={props.token}/>
                    <Container className='d-flex justify-content-center mt-2'>
                        <div>
                            <p className="titolo text-center my-5">Tutte le risorse di cui hai <br/>bisogno, a portata di <span className='text-primary'>click.</span></p>
                            <Tabs justify defaultActiveKey="login">
                                <Tab eventKey="login" title="Accedi">
                                    <Login token={props.token} setToken={props.setToken} setPage={props.setPage} setUser={props.setUser} setNavbar={props.setNavbar}/>
                                </Tab>
                                <Tab eventKey="signup" title="Registrati">
                                    <Signup token={props.token} setToken={props.setToken} setPage={props.setPage} setUser={props.setUser} setNavbar={props.setNavbar}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </Container>
        </>
    );
};

export default SignLog;