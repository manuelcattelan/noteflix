import React, {useEffect, useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ChangePlan from '../components/ChangePlan';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

import gif from '../media/paper.gif'



const NoAccess = (props) => {

    const navigate = useNavigate();
    const token = JSON.parse(window.localStorage.getItem("token"))


    const [piano, setPiano] = useState("")
    const [area, setArea] = useState("")
    useEffect(() => {
        fetch("../api/v2/token/?token="+token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }else{
                setPiano(data.tokenData.subscription.type)
                setArea(data.tokenData.subscription.area)
            }
        })
    }, []);





    return (
        <>
            <Navigation navbar={props.navbar} token={token}/>
            <Container className='d-flex flex-column align-items-center' style={{minHeight:"70vh"}}>
                
                <img src={gif} alt="floating papers" style={{height:"20rem"}}/>
            
                <div>
                    <p className='titolo text-center'>
                        Non ti preoccupare, il tuo documento è ancora <span className='text-primary'>qui</span>.<br/>
                        Perchè visualizzo questa pagina?
                    </p>
                    <p className='testo text-center'>
                        {
                            piano === "matricole"
                            ?
                            <p className=''>
                                Il piano <span className='fw-bold'>matricole</span> ti permette di esplorare il nostro sito, tuttavia non ti fornisce l'accesso ai file che desideri. <br/>
                                Cambia il tuo piano d'abbonamento e accedi a quello che ti vuoi. I tuoi documenti preferiti ti aspettano.<br/>
                                
                            </p>
                            :
                                piano === "studenti"
                                ?
                                <p className=''>
                                    Il piano <span className='fw-bold'>studenti</span> prevede l'accesso ad un'unica macroarea. <br/>
                                    La tua selezione, <span className='fw-bold'>{area}</span> ti permetterà di entrare solo nei documenti di quella categoria.
                                </p>
                                :
                                ""
                        }
                    </p>
                    <div className='d-flex justify-content-center'>
                        <Button variant="outline-dark">
                            <ChangePlan style={{background:"none"}}/>
                        </Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link className='mt-2 fw-bold text-decoration-underline' to="/">
                            Oppure torna alla Piattaforma
                        </Link>
                    </div>
                    
                </div>
                
            </Container>
            <Footer/>
        </>
    );
};

export default NoAccess;