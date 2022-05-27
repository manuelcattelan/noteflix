import React from 'react';
import { ListGroup, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const MentorFileItem = () => {
    return (

            <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center"
                >
                    <div className="fw-bold ms-2 me-auto">Verifica di Agata</div>
                    <span className="fw-bold text-primary me-3">Online</span>
                    <ListGroup className="me-3" horizontal>
                        <ListGroup.Item>13 commenti</ListGroup.Item>
                        <ListGroup.Item>129 valutazioni</ListGroup.Item>
                        <ListGroup.Item>Piace al 90%</ListGroup.Item>
                    </ListGroup>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                            <Button>Modifica</Button> <Button>Elimina</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </ListGroup.Item>

    );
};

export default MentorFileItem;