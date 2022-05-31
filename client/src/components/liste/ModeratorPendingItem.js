import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModeratorPendingItem = ({title, id, email, token}) => {

    const mailto = "mailto:" + email

    const [decision, setDecision] = useState()

    const handleSubmit = (e) => {

        e.preventDefault();

        switch(decision){
            case "approva":
                fetch("api/v1/documents/"+id+"/validate?token="+token, {method: 'PATCH'})
                .then(res => res.json())
                .then(e.target.className="d-none")
                .then(data => alert(data.message))
                break;
            case "elimina":
                fetch("api/v1/documents/"+id+"?token="+token, {method: 'DELETE'})
                .then(res => res.json())
                .then(e.target.className="d-none")
                .then(data => alert(data.message))
                break;
        }
    }


    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
        >
            <div className="fw-bold ms-2 me-auto">{title}</div>
            <a href={mailto} target="_blank" rel="noreferrer">
                <span className="fw-bold text-primary me-3">Scrivi a {email}</span>
            </a>
            <Link to={"/document/?id="+id}>
                <Button variant="outline-primary">Visualizza</Button>
            </Link>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Select className='mx-3' id="macroarea" maxlength="160" onChange={(e) => setDecision(e.target.value)}>
                    <option disabled selected value="">- seleziona un'azione</option>
                    <option value="approva">Approva documento</option>
                    <option value="elimina">Elimina documento</option>
                </Form.Select>
                <Button type="submit" size="sm" variant="primary">Salva</Button>
            </Form>
            
        </ListGroup.Item>
    );
};

export default ModeratorPendingItem;