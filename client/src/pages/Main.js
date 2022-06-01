import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import noteslight from "../media/noteslight.svg"
import notesdark from "../media/notesdark.svg"
import { Link } from 'react-router-dom';


const Main = (props) => {

    return (
        <>   
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container>
                <Row style={{height:"90vh"}}>        
                    <Col className="d-flex justify-content-center align-items-center">
                        <img
                            alt=""
                            src={props.theme==="light"? noteslight : notesdark}
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
                                    <Button size="lg" className='me-2'>Inizia ora</Button>
                                </Link>
                                <Button size="lg" variant="outline-primary">Scopri di più</Button>
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
            </Container>

        </>
    );
};

export default Main;