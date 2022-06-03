import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import Avatar from 'react-nice-avatar';
import swal from 'sweetalert';

const UserPendingItem = ({username, avatar, email, token, id}) => {

    const mailto = "mailto:" + email
    

    const [decision, setDecision] = useState()

    const handleSubmit = (e) => {

        e.preventDefault(); 

        switch(decision){
            case "approva":
                fetch("../api/v2/users/"+id+"/upgrade?token="+token, {method: 'PATCH'})
                .then(res => res.json())
                .then(e.target.className="d-none")
                .then(data => swal(data.message))
                break;
            case "rifiuta":
                fetch("../api/v2/users/"+id+"/downgrade?token="+token, {method: 'PATCH'})
                .then(res => res.json())
                .then(e.target.className="d-none")
                .then(data => swal(data.message))
                break;
        }
    }


    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
        >
            <Avatar className="ms-2" style={{ width: '3rem', height: '3rem' }} {...avatar}/>
            <div className="fw-bold ms-2 me-auto">{username}</div>
            <a href={mailto} target="_blank" rel="noreferrer">
                <span className="fw-bold text-primary me-3">Scrivi a {email}</span>
            </a>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Select className='mx-3' id="macroarea" maxlength="160" onChange={(e) => setDecision(e.target.value)}>
                    <option disabled selected value="">- seleziona un'azione</option>
                    <option value="approva">Approva richiesta</option>
                    <option value="rifiuta">Rifiuta richiesta</option>
                </Form.Select>
                <Button type="submit" size="sm" variant="primary">Salva</Button>
            </Form>
        </ListGroup.Item>
    );
};

export default UserPendingItem;