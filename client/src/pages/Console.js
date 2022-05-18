import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Console = (props) => {
    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme}/>       
            <Container>
                console
            </Container>
            
        </>
    );
};

export default Console;