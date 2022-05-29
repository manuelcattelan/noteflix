import React from 'react';
import { Container, Nav, Form, Button, Col, Row } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import check from '../media/completed.svg'

const Policy = (props) => {
    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser} navbar={props.navbar}/>
            <Container>
                <Container>
                    <p className='h1 my-5 fw-bold'>Processo di verifica documenti <br/> della piattaforma <span className='font-italic text-primary'>Noteflix</span></p>
                    <p className=''> Scritto dai membri dello <a style={{textDecoration:"none"}} href="" target="_blank">staff</a> </p>
                    <Row>
                        <Col md="5">
                            <p>
                                Per incoraggiare e mantenere la fiducia tra gli utenti all'interno di <span className='font-italic text-primary'>Noteflix</span>, filtriamo ogni file al caricamento prima che venga effettivamente pubblicato.
                                Al caricamento verrà chiesto di compilare un form con molteplici informazioni utili ai Moderatori per controllare la qualità del file. 
                                <br/><br/>
                                <b>Esso non dovrà contenere:</b> 
                                <ul>
                                    <li>
                                        <b>Informazioni copiate:</b> utilizzando i moderni tool di copyright verranno filtrati e non pubblicati file con un contenuto copiato da altri documenti, siti o fonti esterne.
                                    </li>
                                    <li>
                                        <b>Termini inappropriati:</b> parole o simboli che incitano all'odio o alla violenza, linguaggio scurrile in generale.
                                    </li>
                                    <li>
                                        <b>Immagini soggette a copyright:</b> pubblichiamo i file nel rispetto del lavoro degli altri; non verranno puibblicati file contenti immagini sotto copyright.
                                    </li>
                                </ul>

                                <br/><b>Esso dovrà necessariamente contenere:</b> 
                                <ul>
                                    <li>
                                        <b>Indice:</b> è richiesto che ogni file della piattaforma, per quanto breve, deve essere corredato di indice dei contenuti, visualizzabile nelle pagine di anteprima del file.
                                    </li>
                                    <li>
                                        <b>Data di pubblicazione:</b> è necessario che ogni documento sia corredato di data di pubblicazione nel frontespizio, così che gli utenti possano immediatamente escluderlo se fosse troppo datato.
                                    </li>
                                    <li>
                                        <b>Pagine di anteprima:</b> selezionabili alla pubblicazione, è necessario che ogni documento abbia almeno un paio di pagini visibili da tutti gli utenti, anche esterni e non iscritti alla piattaforma. In queste pagine deve essere possibile agli utenti vedere l'indice dei contenuti del documento.
                                    </li>
                                </ul>

                                <br/>Il team procede nella verifica delle informazioni contenute e declina agli autori la responsabilità di irregolarità alla pubblicazione.


                            </p>
                        </Col>
                        <Col md="7" className='d-flex justify-content-center'>
                            <img src={check} style={{height:"44vh"}}/>
                        </Col>
                    </Row>
                </Container>
                <Container className='my-5'>
                    
                    <p className='h1 my-5 fw-bold'>Tutela dei dati personali,<br/> l'importanza della <span className='font-italic text-primary'>trasparenza</span></p>
                    <p className=''> Scritto dai membri dello <a style={{textDecoration:"none"}} href="" target="_blank">staff</a> </p>
                    <Row>
                        <Col md="9">
                            <p>
                                <b>Email</b> <br/>
                                <span className='font-italic text-primary'>Noteflix</span> è un servizio autogestito che non condivide con terze parti l'email dei propri utenti.
                                <br/>A fini promozionali l'email sarà disponibile unicamente nell'ecosistema Noteflix.
                            </p>
                            <p>
                                <b>Password</b> <br/>
                                Le password vengono custodite con cura nei nostri database, precedentemente criptate con gli algoritmi più aggiornati nel campo della cyber security.
                                I nostri server sono periodicamente controllati per verificare l'assenza di vulnerabilità.                       
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            
        </>
    );
};

export default Policy;