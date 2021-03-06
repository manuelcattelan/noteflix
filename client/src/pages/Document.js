import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button, ButtonToolbar, Spinner } from 'react-bootstrap';
import Navigation from '../components/Navigation';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';// Import the main component
import '@react-pdf-viewer/core/lib/styles/index.css';// Import the styles
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';// Import styles

import Avatar from 'react-nice-avatar'
import Rating from '../components/Rating';
import Report from '../components/Report';
import Chat from '../components/Chat';
import Save from '../components/Save';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';




const Document = (props) => {

    const id = window.location.href.split("?id=")[1] //ottengo l'id del doc
    
    const[doc, setDoc] = useState()
    


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
    const navigate = useNavigate()

               
    useEffect(()=>{                          
        fetch("../api/v2/documents/"+id+"?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                setDoc(data)
            }
            else{
                navigate("/noaccess")
            }
        })
    }, [])

    
    

    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            {
                doc
                ?
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
                                    <p className='text-primary doc-mentore mt-2'>{doc.author.username}</p>
                                </div>
                                
                            </p>
                            <p className='Save text-muted'>
                                <Save id={id} saved={doc.interactions.saved}/>
                            </p>
                            <p className='doc-titolo'>
                                {doc.document.title}
                            </p>
                            <p className='doc-descrizione' style={{overflowWrap: "break-word"}}>
                                {doc.document.description}
                            </p>

                        
                            <Chat handleChatShow={handleChatShow} handleChatClose={handleChatClose} chatShow={chatShow} comments={doc.comments} id={id}/>

                            
                        
                            <Rating like={doc.document.like} dislike={doc.document.dislike} rating={doc.interactions.rating} saved={doc.interactions.saved} id={id} token={props.token}/>

                            <ButtonToolbar aria-label="Toolbar with Button groups">
                                <Report id={id} token={props.token}/>
                                <Button variant="outline-primary" className="mt-3 me-1" size="sm" onClick={handleChatShow}>
                                    Apri la sezione commenti
                                </Button>
                            </ButtonToolbar>
                                
                            
                            
                            
                        </Col>
                    </Row>
                </Container>
                :
                <Container className="d-flex flex-column justify-content-center align-items-center" style={{height:"80vh"}}>
                        <Spinner animation="border" variant="primary" className='text-center'/>
                        <p className="mt-2 text-center">Stiamo caricando il tuo documento, tieni duro.</p>
                </Container>
            }
            <Footer/>
        </>
    );
};

export default Document;