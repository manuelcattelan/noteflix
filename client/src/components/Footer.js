import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logolight from "../media/logolight.svg"


const Footer = (props) => {
    return(
        
                <Row style={{minHeight:"20vh", backgroundColor:"#f4f4f4", position: "relative", bottom:"0"}} className="mt-5 text-muted">
                    <Col xs="12" md="6" lg="3" className='d-flex justify-content-center'>
                        <div>
                        <img
                            alt=""
                            src={logolight}
                            height="30"
                            className='my-5'
                        />
                        </div>
                    </Col>
                    <Col xs="12" md="6" lg="3" className='d-flex justify-content-center'>
                        <small className='my-5'>
                            Ci impegnamo per fornirti i migliori <br/>
                            appunti universitari per qualsiasi corso <br/>
                            e per qualsiasi facoltà.<br/>
                            <Link to="/policy" className='fw-bold text-primary mt-3'>
                                Dai un'occhiata alla nostra policy
                            </Link>
                        </small>
                    </Col>
                    <Col xs="12" md="6" lg="3" className='d-flex justify-content-center'>
                        <small className='my-5'>
                            Crediti per le illustrazioni:<br/>
                            <a href="https://storyset.com/business"  target="_blank">Business illustrations by Storyset</a>
                        </small>
                    </Col>
                    <Col xs="12" md="6" lg="3" className='d-flex justify-content-center'>
                        <small className='my-5'>
                            Autori del progetto:<br/>
                            <span className='text-primary'>- Manuel Cattelan</span> <br/>
                            <span className='text-primary'>- Raffaele Crocco</span> <br/>
                            <span className='text-primary'>- Alberto Gusmeroli</span>
                        </small>
                    </Col>
                </Row>

    );
};

export default Footer