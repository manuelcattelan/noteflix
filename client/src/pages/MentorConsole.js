import React from 'react';
import { Container, ButtonToolbar, ButtonGroup, Button, ListGroup, Row, Col, Form } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Avatar, { AvatarConfig } from 'react-nice-avatar'



const MentorConsole = (props) => {
    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser} navbar={props.navbar}/>
            <Container className='my-5'>
                <Row>
                    <Col md="3" className='d-flex justify-content-center align-content-center'>
                        <Avatar className="" style={{ width: '10rem', height: '10rem' }} {...AvatarConfig}/>
                    </Col>
                    <Col className='d-flex align-content-center'>
                        <div>
                            <p className='h1 fw-bold'>Pagina personale da mentore <br/> di Noteflix, ciao <span className='text-primary'>Raffaele</span></p>
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
                <ListGroup as="ol" numbered>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                        <span className="fw-bold text-primary me-3">Online</span>
                        <ListGroup className="me-3" horizontal>
                            <ListGroup.Item>13 commenti</ListGroup.Item>
                            <ListGroup.Item>129 valutazioni</ListGroup.Item>
                            <ListGroup.Item>Piace al 90%</ListGroup.Item>
                        </ListGroup>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button>Modifica</Button> <Button>Elimina</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                        <span className="fw-bold text-primary me-3">Online</span>
                        <ListGroup className="me-3" horizontal>
                            <ListGroup.Item>13 commenti</ListGroup.Item>
                            <ListGroup.Item>129 valutazioni</ListGroup.Item>
                            <ListGroup.Item>Piace al 90%</ListGroup.Item>
                        </ListGroup>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button>Modifica</Button> <Button>Elimina</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                        <span className="fw-bold text-primary me-3">Online</span>
                        <ListGroup className="me-3" horizontal>
                            <ListGroup.Item>13 commenti</ListGroup.Item>
                            <ListGroup.Item>129 valutazioni</ListGroup.Item>
                            <ListGroup.Item>Piace al 90%</ListGroup.Item>
                        </ListGroup>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button>Modifica</Button> <Button>Elimina</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                        <span className="fw-bold text-primary me-3">Online</span>
                        <ListGroup className="me-3" horizontal>
                            <ListGroup.Item>13 commenti</ListGroup.Item>
                            <ListGroup.Item>129 valutazioni</ListGroup.Item>
                            <ListGroup.Item>Piace al 90%</ListGroup.Item>
                        </ListGroup>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button>Modifica</Button> <Button>Elimina</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
            
        </>
    );
};

export default MentorConsole;