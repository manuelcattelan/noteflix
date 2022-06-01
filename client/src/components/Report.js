import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

const Report = ({id, token}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReport = (e) => {
        e.preventDefault()

        fetch("../api/v2/documents/"+id+"/report?token="+token, {method: 'PATCH'})
        .then(res => res.json())
        .then(handleClose)
        .then(data => alert(data.message))   
    }

    return (
        <>
            <Button variant="outline-secondary" className="mt-3 me-1" size="sm" onClick={handleShow}>
                Segnala
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Segnala la risorsa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    La tua segnalazione sarà inviata ai moderatori del sito.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleReport}>
                    Sono sicuro di voler segnalare, procedi
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Report;