import React from 'react';
import { Container, Row, Col, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import noteslight from "../media/knowledge.svg"
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import mockup from '../media/mockup.svg'
import studyboy from '../media/studyboy.svg'

const Main = (props) => {

    return (
        <>   
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container>
                <Row style={{minHeight:"90vh"}}>        
                    <Col xs="12" md="6" className="d-flex justify-content-center align-items-center">
                        <img
                            alt=""
                            src={noteslight}
                            height="60%"
                            className="d-inline-block align-top"
                        />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <div>
                            <p className='tagline'>la piattaforma</p>
                            <p className='titolo'><span className='text-primary'>Noteflix</span>, le <br/>migliori risorse <br/>per i tuoi esami.</p>
                            <p className='testo'>Ci impegnamo per fornirti i migliori <br/>appunti universitari per qualsiasi corso <br/>e per qualsiasi facoltà.</p>
                            <div>
                                <Link to="/signlog">
                                    <Button size="lg" className='me-2'>Inizia ora <i class="bi bi-arrow-right ms-2"></i></Button>
                                </Link>
                            </div>
                            {/* <Row style={{marginTop:"85px"}}>
                                <Col xs="6">
                                    <p style={{fontWeight: "600", fontSize: "56px", lineheight: "60px", letterSpacing: "-1.8px"}}>98%</p>
                                    <p style={{fontWeight: "500", fontSize: "18px", lineheight: "28px", letterSpacing: "-0.4px"}}>la percentuale di <br/>studenti che supera <br/>esami con successo <br/>utilizzando noteflix.</p>
                                </Col>
                                <Col>
                                    <p style={{fontWeight: "600", fontSize: "56px", lineheight: "60px", letterSpacing: "-1.8px"}}>27.5</p>
                                    <p style={{fontWeight: "500", fontSize: "18px", lineheight: "28px", letterSpacing: "-0.4px"}}>la valutazione <br/>media che i nostri <br/>utenti ottengono <br/>utilizzando noteflix.</p>
                                </Col>
                            </Row> */}
                        </div>
                        
                    </Col>
                </Row>
                <a id="why"></a>
                <Row style={{minHeight:"70vh", borderRadius:"20px"}} className="d-flex flex-column justify-content-center">
                    <p className='tagline text-center'>perchè noteflix</p>
                    <p className='titolo text-center mb-5'>Alcune delle ragioni che ci rendono unici.</p>                       
                    <div className="d-flex flex-wrap">  
                        <Col className="d-flex justify-content-center align-items-center mb-3">
                            <Card style={{width:"20rem", height:"18rem"}}>
                                <Card.Body>
                                    <i className="bi bi-subtract fs-1"></i>
                                    <Card.Title>
                                        <p className='ragioni'>Un unico abbonamento per accedere a tutte informazioni che ti servono.</p>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    Non ti piace com’è strutturato un documento? Avanti il prossimo!
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center mb-3">
                            <Card style={{width:"20rem", height:"18rem"}}>
                                <Card.Body>
                                    <i className="bi bi-file-earmark-break fs-1"></i>
                                    <Card.Title>
                                        <p className='ragioni'>Un unico posto dove cercare tutto ciò di cui hai bisogno per i tuoi esami.</p>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    Smettila di chiedere a Google, trovi tutto qui.
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center mb-3">
                            <Card style={{width:"20rem", height:"18rem"}}>
                                <Card.Body>
                                    <i className="bi bi-mortarboard-fill fs-1"></i>
                                    <Card.Title>
                                        <p className='ragioni'>I mentor devono superare un’attenta fase di verifica prima di poter pubblicare.</p>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    Questo ti permette di trovare sempre appunti di qualità.
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </Row>
                <a id="prezzi"></a>
                <Row style={{minHeight:"90vh"}} className="d-flex flex-column justify-content-center">
                    <p className='tagline text-center'>Prezzi</p>
                    <p className='titolo text-center mb-5'>Scegli il piano che più ti sia addice</p>                       
                    <div className="d-flex flex-wrap">  
                        <Col className="d-flex justify-content-center align-items-center">
                            <Card style={{width:"20rem", height:"29rem"}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className='ragioni'>Matricole</p>
                                    </Card.Title>
                                    <p style={{fontWeight: "600", fontSize: "56px"}}> €0 <span className="text-secondary" style={{fontWeight: "600", fontSize: "16px"}}>/mese</span> </p>
                                    Scopri il potenziale di noteflix senza pagare un euro.
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem className="text-secondary">Accesso alla piattaforma</ListGroupItem>
                                    <ListGroupItem className="text-secondary">Esplora e salva i file che ti servono</ListGroupItem>
                                    <ListGroupItem className="text-secondary">Questo piano non ti permette di visualizzare i documenti</ListGroupItem>
                                </ListGroup>
                                <Card.Body className="d-flex justify-content-center align-items-end">
                                    <Link to="signlog" className="w-100">
                                        <Button variant="outline-dark" className="w-100">Continua</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Card style={{width:"20rem", height:"29rem"}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className='ragioni'>Studenti</p>
                                    </Card.Title>
                                    <p style={{fontWeight: "600", fontSize: "56px"}}> €4.99 <span className="text-secondary" style={{fontWeight: "600", fontSize: "16px"}}>/mese</span> </p>
                                    Il piano preferito dalla maggior parte dei nostri utenti.
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem className="text-secondary">Accesso illimitato ai documenti della tua area di studio</ListGroupItem>
                                    <ListGroupItem className="text-secondary">Salva i documenti che ti interessano così da poterli leggere più tardi</ListGroupItem>
                                </ListGroup>
                                <Card.Body className="d-flex justify-content-center align-items-end">
                                    <Link to="signlog" className="w-100">
                                        <Button variant="outline-primary" className="w-100">Il preferito dai nostri utenti</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Card style={{width:"20rem", height:"29rem"}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className='ragioni'>Nerd</p>
                                    </Card.Title>
                                    <p style={{fontWeight: "600", fontSize: "56px"}}> €8.99 <span className="text-secondary" style={{fontWeight: "600", fontSize: "16px"}}>/mese</span> </p>
                                    Per alcuni studiare è un dovere, per altri una passione.
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem className="text-secondary">Tutti i vantaggi del piano “Studenti”</ListGroupItem>
                                    <ListGroupItem className="text-secondary">Accesso illimitato ai documenti di qualsiasi area di studio, qualsiasi.</ListGroupItem>
                                </ListGroup>
                                <Card.Body className="d-flex justify-content-center align-items-end">
                                    <Link to="signlog" className="w-100">
                                        <Button variant="outline-dark" className="w-100">Continua</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </Row>
                {/* <Row style={{minHeight:"70vh"}} className="d-flex align-items-center">
                    <Col xs="12" md="6">
                        <p className='titolo mb-5'>Un’esperienza di accesso da tutti i tuoi disposivi .</p>
                        <p className='special mb-5'>
                            Paga solo per le risorse che ti servono e accedi da tutti i dispositivi. 
                            Studiare non è mai stato così semplice: tutte le risorse che ti servono a portata di un click.
                        </p>                       
                    </Col>
                    <Col xs="12" md="6" className="d-flex justify-content-end">
                        <img src={mockup} style={{width:"80%"}}/>
                    </Col>
                </Row> */}
                <Row style={{minHeight:"70vh"}}>   
                    <Col className="d-flex justify-content-center align-items-center">
                        <div>
                            <p className='titolo'>Così puoi concentrarti sullo studio, nient’altro.</p>
                            <p className='testo'>Ore di lezione condensate in documenti che <br/>permettono ai nostri utenti di concentrarsi su ciò che <br/>importa davvero, studiare.</p>
                            <div>
                                <Link to="/signlog">
                                    <Button size="lg" className='me-2'>Inizia ora  <i class="bi bi-arrow-right ms-2"></i></Button>
                                </Link>
                            </div>
                            {/* <Row style={{marginTop:"85px"}}>
                                <Col xs="6">
                                    <p style={{fontWeight: "600", fontSize: "56px", lineheight: "60px", letterSpacing: "-1.8px"}}>98%</p>
                                    <p style={{fontWeight: "500", fontSize: "18px", lineheight: "28px", letterSpacing: "-0.4px"}}>la percentuale di <br/>studenti che supera <br/>esami con successo <br/>utilizzando noteflix.</p>
                                </Col>
                                <Col>
                                    <p style={{fontWeight: "600", fontSize: "56px", lineheight: "60px", letterSpacing: "-1.8px"}}>27.5</p>
                                    <p style={{fontWeight: "500", fontSize: "18px", lineheight: "28px", letterSpacing: "-0.4px"}}>la valutazione <br/>media che i nostri <br/>utenti ottengono <br/>utilizzando noteflix.</p>
                                </Col>
                            </Row> */}
                        </div>
                        
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <img
                            alt=""
                            src={studyboy}
                            height="75%"
                            className="d-inline-block align-top"
                        />
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};

export default Main;