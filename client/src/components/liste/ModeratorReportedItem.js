import React from 'react';
import { ListGroup, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const ModeratorFileItemReported = () => {
    return (

            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center"
            >
                <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                <span className="fw-bold text-primary me-3">Scrivi all'autore</span>
                <ListGroup className="me-3" horizontal>
                    <ListGroup.Item>13 commenti</ListGroup.Item>
                    <ListGroup.Item>129 valutazioni</ListGroup.Item>
                    <ListGroup.Item>Piace al 90%</ListGroup.Item>
                </ListGroup>
                <Button variant="primary">Visualizza</Button>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="ms-2" aria-label="First group">
                        <Button variant="outline-primary">Rimuovi segnalazione</Button>
                        <Button variant="outline-primary">Elimina documento</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                
            </ListGroup.Item>

    );
};

export default ModeratorFileItemReported;