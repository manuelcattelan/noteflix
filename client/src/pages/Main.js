import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Main = (props) => {

    return (
        <>   
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser} navbar={props.navbar}/>
            <Container>
                Main
            </Container>

        </>
    );
};

export default Main;