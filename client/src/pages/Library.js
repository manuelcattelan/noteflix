import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Risultati from '../components/Risultati';

const Library = (props) => {
   
    const navigate = useNavigate();
    const [docArray, setDocArray] = useState({})

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/documents/saved?token='+props.token, {
            method: 'GET',
        })
        .then((resp) => resp.json())
        .then(result => {
            if(!result.success) navigate('/')
            else setDocArray(result)
        })
        .catch(error => console.log('error', error)); // Transform the data into json
    
    }, []);



    

    
        




    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container>
                <p className='titolo text-center mt-5'>Ecco la tua <span className='text-primary'>libreria</span> personale.</p>
                <p className='testo text-center'>Qui troverai i documenti che hai salvato dalla sezione esplora.</p>        
            </Container>
            <Container className="d-flex justify-content-center flex-wrap">
                <Risultati documenti={docArray.documents}/>
            </Container>
        </>
    );
};

export default Library;