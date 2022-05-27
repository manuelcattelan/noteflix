import React from 'react';
import { ListGroup, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const ModeratorPendingItem = () => {
    return (

            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center"
            >
                <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                <span className="fw-bold text-primary me-3">Scrivi all'autore</span>
                <Button variant="outline-primary" className="mx-3">Visualizza</Button>
                <Button>Approva</Button>
            </ListGroup.Item>

    );
};

export default ModeratorPendingItem;