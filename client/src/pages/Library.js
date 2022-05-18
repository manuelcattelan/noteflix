import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const Library = (props) => {
    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme}/>
            <Container>
                library
            </Container>
            
        </>
    );
};

export default Library;