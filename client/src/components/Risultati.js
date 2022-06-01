import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import DocSpoil from '../components/DocSpoil';

const Risultati = (props) => {
    return (
        <>
            {
                props.documenti ? 
                <>
                    <p className="text-center titoletti">Tutti i documenti</p>
                    <Container className="d-flex justify-content-center flex-wrap">
                    {
                        props.documenti.map((item) => 
                            <DocSpoil 
                                titolo={item.title}
                                descrizione={item.description}
                                url={item.url}
                                macroarea={item.area}
                                id={item._id}
                                approval={item.approval}
                            /> 
                        )
                    }
                    </Container>
                </>
                : 
                <Container className="d-flex flex-column justify-content-center align-items-center" style={{height:"30vh"}}>
                    <Spinner animation="border" variant="primary" className='text-center'/>
                    <p className="mt-2 text-center">Stiamo caricando i file, tieniti forte.</p>
                </Container>
            }
        </>
    );
};

export default Risultati;