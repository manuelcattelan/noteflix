import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const DocPage = (props) => {


    const [docArray, setDocArray] = useState()

    const handleDoc = () => {
        
        fetch('http://localhost:3001/api/v1/documents', {
            method: 'GET',
        })
        .then((resp) => resp.json()).then(result => setDocArray(result))
        .catch(error => console.log('error', error)); // Transform the data into json
    }





    return (
        <>    
            <Navigation theme={props.theme} setTheme={props.setTheme}/>       
            <Container onLoad={handleDoc}>
                {}
            </Container>

        </>
    );
};

export default DocPage;