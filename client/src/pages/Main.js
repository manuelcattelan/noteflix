import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Main = (props) => {

    return (
        <>    
            <Navigation theme={props.theme} setTheme={props.setTheme}/>       
            <Container>
                Main
            </Container>

        </>
    );
};

export default Main;