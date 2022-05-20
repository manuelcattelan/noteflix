import React, {useState, useEffect} from 'react';
import { Container, Form, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';

import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";// Or, if you have to support IE9
import { Arrow, Fade } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";

import Risultati from '../components/Risultati';

const Platform = (props) => {


    const [docArray, setDocArray] = useState({})

    const handleDoc = () => {
        const url='http://localhost:3001/api/v1/documents/?token='+props.token
        fetch(url, {
            method: 'GET',
        })
        .then((resp) => resp.json())
        .then(result => setDocArray(result))
        .catch(error => console.log('error', error)); // Transform the data into json
    }


    //Arrow for each carousel
    const arrowSet1 = [new Arrow({moveCount:2}), new Fade("", 0.5)];


    //esegue il fetch al caricamento dell'app e al cambiamento di token
    useEffect(() => handleDoc,[]);




    return (
        <>    
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser} navbar={props.navbar}/>
            <Container>
                <p className='doc-titolo text-center' style={{marginTop:"10vh"}}>Esplora e scopri nuovi dispense per la tua libreria</p>
                <Form className="d-flex justify-content-center">
                    <Row style={{width:"80%"}}>
                        <Col xs="12" className="my-1">
                            <Form.Control id="inlineFormInputName" placeholder="Digita alcune parole chiave per iniziare" />
                        </Col>
                        <Col xs="12" className="my-1">
                            <p type="submit" className="text-primary text-center fw-bold">Cerca</p>
                        </Col>                        
                    </Row>
                </Form>
                <br/><br/><br/>
            </Container> 

           {/*  <Container>
                <p className="text-center titoletti">Raccomandati per te</p>
            </Container> 
            <Flicking
                circular={true}
                circularFallback="linear"
                moveType="freeScroll"
                plugins={arrowSet1}
            >
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>
                <div><DocSpoil/></div>



                <ViewportSlot>
                    <span className="flicking-arrow-prev is-circle mx-5" style={{backgroundColor:"#623FF0"}}></span>
                    <span className="flicking-arrow-next is-circle mx-5" style={{backgroundColor:"#623FF0"}}></span>
                </ViewportSlot>
            </Flicking> */}


            <Container>
                <p className="text-center titoletti">Tutti i documenti</p>
            </Container>
            <Container className="d-flex justify-content-center flex-wrap">

                <Risultati documenti={docArray.documents}/>

            </Container>
                        
                    
                
                
                
            

        </>
    );
};

export default Platform;