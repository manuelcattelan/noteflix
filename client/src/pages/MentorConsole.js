import React, {useEffect, useState} from 'react';
import { Container, ButtonToolbar, ButtonGroup, Button, ListGroup, Row, Col, Form } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Avatar, { AvatarConfig } from 'react-nice-avatar'
import { useNavigate } from 'react-router-dom';
import MentorFileList from '../components/liste/MentorFileList';



const MentorConsole = (props) => {

    const navigate = useNavigate();
    const [docArray, setDocArray] = useState()
    const userId = JSON.parse(window.localStorage.getItem("user"))
    const [persona, setPersona] = useState({})

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/documents/uploaded?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setDocArray(data.documents)
            }
        })

        fetch("http://localhost:3001/api/v1/users/"+userId+"?token="+props.token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(alert(JSON.stringify(persona)))


    }, [""]);

    



    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container className='my-5'>
                <Row>
                    <Col md="3" className='d-flex justify-content-center align-content-center'>
                        <Avatar className="" style={{ width: '10rem', height: '10rem' }} {...persona.avatar}/>
                    </Col>
                    <Col className='d-flex align-content-center'>
                        <div>
                            <p className='h1 fw-bold'>Pagina personale da mentore <br/> di Noteflix, ciao <span className='text-primary'>{persona.username}</span></p>
                            <Form>
                                    <Row>
                                        <Col md="9">
                                            <Form.Control id="descrizione" as="textarea" className="me-2 mb-2" cols={120} rows={4} required
                                                placeholder="Biografia pubblica dell’utente: titoli di studio, aree di interesse, informazioni utili per gli studenti che visitano questo profilo. Biografia pubblica dell’utente: titoli di studio, aree di interesse, informazioni utili per gli studenti che visitano questo profilo. Biografia pubblica dell’utente: titoli di studio, aree di interesse."
                                            />
                                        </Col>
                                        <Col>
                                            <Button variant="outline-primary" size="sm" type="submit">
                                                Aggiorna la biografia
                                            </Button>
                                            <p style={{fontSize:"11px"}} className="mt-2">La nuova biografia sarà resa pubblica e gli utenti avranno la possibilità di leggerla e segnalarla se lo ritengono opportuno.</p>
                                        </Col>
                                    </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <MentorFileList docArray={docArray} token={props.token}/>
            </Container>
            
        </>
    );
};

export default MentorConsole;