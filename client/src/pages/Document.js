import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button, Form, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';// Import the main component
import '@react-pdf-viewer/core/lib/styles/index.css';// Import the styles
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';// Import styles
import pdf from '../pdf/ns.pdf';

import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar'
import Rating from '../components/Rating';




const Document = (props) => {

    const id = window.location.href.split("?id=")[1] //ottengo l'id del doc
    
    const[doc, setDoc] = useState({
        "author": {
            "username": ""
        },
        "interactions":{
            "liked": false,
            "saved": false
        },
        "document":{
            "url":"https://noteflix.s3.eu-central-1.amazonaws.com/1653654581000.pdf",
            "title":"",
            "description":"",
            "like":0,
            "dislike":0
        }
    })
    


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


               
    useEffect(()=>{                          
        fetch("http://localhost:3001/api/v1/documents/"+id+"?token="+props.token)
        .then(resp => resp.json())
        .then(data => setDoc(data))
    }, [""])

    const handleReport = (e) => {
        e.preventDefault()

        fetch("http://localhost:3001/api/v1/documents/"+id+"/report?token="+props.token, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => alert(data.message))
    }
    

    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
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
                                <Viewer plugins={[toolbarPluginInstance]} fileUrl={doc.document.url} />
                            </div>
                        </Worker>
                    </Col>
                    <Col md="3">
                        <p className='doc-autore d-flex align-items-center'>
                            <Avatar className="my-3 me-2" style={{ width: '5rem', height: '5rem' }} {...doc.author.avatar}/>
                            <div className='mt-2'>
                                Mentore
                                <p className='text-primary fs-2 mt-2'>{doc.author.username}</p>
                            </div>
                            
                        </p>
                        <p className='doc-titolo'>
                        <i class="bi bi-bookmark pe-2" style={{fontSize: "2rem"}}></i>{doc.document.title}
                        </p>
                        <p className='doc-descrizione' style={{overflowWrap: "break-word"}}>
                            {doc.document.description}
                        </p>
                        <Rating like={doc.document.like} dislike={doc.document.dislike} rating={doc.interactions.rating} saved={doc.interactions.saved} id={id} token={props.token}/>

                        <Form className="" onSubmit={handleReport}>
                            <Form.Text>
                                <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            <p className="mt-1"> Cliccando "invia una segnalazione" sottoponi il documento ad un controllo da parte dei nostri moderatori.</p>
                                        </Tooltip>
                                    }
                                    >
                                    <span className="mt-1 text-secondary">Qualcosa non va?</span>
                                </OverlayTrigger>
                                <input type="submit" size="sm" className="fw-bold text-secondary" value="Invia una segnalazione" style={{border:"none", background:"none", textDecoration:"underline"}}/> 
                            </Form.Text>
                        </Form>
                        {/* <Chat handleChatShow={handleChatShow} handleChatClose={handleChatClose} chatShow={chatShow}/> */}

                        
                        <Form className="mt-5">
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
                        
                        
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Document;