import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Platform = (props) => {
    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme}/>
            <Container>
                platform
            </Container>
            
        </>
    );
};

export default Platform;