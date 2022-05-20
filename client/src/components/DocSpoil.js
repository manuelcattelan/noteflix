import React from 'react';
import { Card, Button } from 'react-bootstrap';
import anteprima from '../media/anteprima.png'

const DocSpoil = () => {
    return (
        <>
            <Card className="m-3" style={{ width: '18rem' }}>
                <Card.Header>Macroarea</Card.Header>
                <Card.Img variant="top" src={anteprima} />
                <Card.Body>
                    <Card.Title>Dispensa di Network e Cyber Security</Card.Title>
                    <Card.Text className='doc-descrizione'>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Button variant="outline-primary" className='me-3 mb-2'>Visualizza</Button>
                    <Card.Link href="#">Salva nella libreria</Card.Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default DocSpoil;