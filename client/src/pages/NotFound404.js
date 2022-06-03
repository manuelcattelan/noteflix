import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import notfound from '../media/notfound.svg'


const NotFound404 = () => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    return (
        <>
            <Navigation/>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{minHeight:"70vh"}}>
                <img src={notfound} style={{height:"60vh"}}/>
                <Link to="/">
                    <Button>
                        Torna alla home
                    </Button>
                </Link>
            </Container>
            <Footer/>
        </>
    );
};

export default NotFound404;