import React, {useEffect} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import img from '../media/mentorwannabe.svg'



const MentorWannaBe = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/token/?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
        })
    }, []);


    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container className='d-flex justify-content-center align-items-center' style={{height:"90vh"}}>
                <div>
                    <p className='titolo text-center'><span className='text-primary'>Guadagnare</span> vendendo <span className='text-primary'>appunti</span> di <br/> qualità sulla nostra piattafroma.</p>
                    <p className='testo text-center'>Prima di cominciare permetti al nostro team di valutare il tuo profilo.</p>
                        
                    <Row className='mt-5'>
                        <Col xs="12" lg="4">
                            <img src={img} alt="diventa mentor" style={{width:"90%"}}/>
                        </Col>
                        <Col>
                            <p className='special mb-4 mt-3'>Mandaci un’email con le seguenti <br/>informazioni e parlaci di te.</p>
                            <p className='testo mb-4'>
                                <ul>
                                    <li>Una video presentazione breve (5 minuti massimo) in cui parli di te e di cosa fai nella vita.</li>
                                    <li>Una breve intorduzione (3 righe) del motivo che ti spinge a diventare Mentor su Noteflix.</li>
                                    <li>Due allegati contenenti le tue dispense più recenti per valutare il tuo stile.</li>
                                    <li>Il tuo titolo di studio più recente in allegato.</li>
                                </ul>
                            </p>
                            <Button>Scrivici un'email</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
            
        </>
    );
};

export default MentorWannaBe;