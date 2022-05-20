import React, {useState} from 'react';
import { Container, Col, Row, Button, Form, ButtonToolbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';// Import the main component
import '@react-pdf-viewer/core/lib/styles/index.css';// Import the styles
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';// Import styles
import pdf from '../pdf/ns.pdf';




const Document = (props) => {


    const location = useLocation()
    const { fileUrl, titolo, autore, descrizione } = location.state

    /*
        Parametri per gestire la toolbar sopra i pdf mostrati
    */
    const toolbarPluginInstance = toolbarPlugin();
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => {
        // Override
        return Object.assign({}, slot, {
            Download: () => (
                <>
                    
                </>
            ),
            SwitchTheme: () => (
                <>
                    
                </>
            ),
            Open: () => (
                <>
                    
                </>
            ),
            Print: () => (
                <>
                    
                </>
            ),
        });
    };


    /*
        Stato per gestire l'apertura e chiusura della sezione commenti
    */
    const [chatShow, setChatShow] = useState(false);
    const handleChatClose = () => setChatShow(false);
    const handleChatShow = () => setChatShow(true);


    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser}/>
            <Container>
                <Row className='my-5'>
                    <Col md="9">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '950px',
                                }}
                            >
                                <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                                <Viewer plugins={[toolbarPluginInstance]} fileUrl={fileUrl} />
                            </div>
                        </Worker>
                    </Col>
                    <Col>
                        <p className='doc-titolo mt-5'>
                            {titolo}
                        </p>
                        <p className='doc-autore'>
                            {autore}
                        </p>
                        <p className='doc-descrizione'>
                            {descrizione}
                        </p>
                        {/* <Chat handleChatShow={handleChatShow} handleChatClose={handleChatClose} chatShow={chatShow}/> */}
                        <Form className="mt-3">
                            <Form.Group controlId="formBasic">
                                <Form.Control as="textarea" rows={4} placeholder="Commento..."/>
                            </Form.Group>
                            <ButtonToolbar aria-label="Toolbar with Button groups">
                                <Button variant="outline-primary" className="mt-3 me-auto" size="sm" onClick={handleChatShow}>
                                    Apri la sezione commenti
                                </Button>
                                <Button variant="primary" className="mt-3" size="sm" type="submit">
                                    Commenta
                                </Button>
                            </ButtonToolbar>
                            
                        </Form>
                        <p className="my-5 text-secondary">
                            Qualcosa non va? <span className='fw-bold' style={{cursor:"pointer"}}>Segnala</span> il documento.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Document;