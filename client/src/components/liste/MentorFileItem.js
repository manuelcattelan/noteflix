import React, { useEffect, useState } from 'react';
import { ListGroup, Button, ButtonGroup, ButtonToolbar, Badge, Form, ModalTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MentorFileItem = ({id, title, status, like, comments}) => {

    const[decision, setDecision] = useState()

    const handleSubmit = (e) => {

    }


    return (
            <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center"
            >
            <div className="fw-bold ms-2 me-auto">
                {title}
                {
                    status === "public"
                    ?
                    <Badge bg="light" text="primary" style={{border:"1px solid #623FF0"}} className="ms-3 my-0" >
                        <span style={{fontSize:"12px"}}>Pubblico</span>
                    </Badge>
                    :
                    <Badge bg="light" text="secondary" style={{border:"1px solid #1e1b21"}} className="ms-3 my-0" >
                        <span style={{fontSize:"12px"}}>In approvazione</span>
                    </Badge>
                }
                
            </div>
            <ListGroup className="me-3" horizontal>
                <ListGroup.Item>{comments == 0 ? "Nessun commento" : comments + " commenti"}</ListGroup.Item>
                {/* <ListGroup.Item>{votes == null ? "Nessuna valutazione" : votes + " valutazioni"}</ListGroup.Item> */}
                <ListGroup.Item>{like == null ? "Nessun like" : "Piace al " + like + "%"}</ListGroup.Item>
            </ListGroup>
            <Link to={"/document/?id="+id}>
                <Button variant="outline-primary">Visualizza</Button>
            </Link>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Select className='mx-3' id="macroarea" maxlength="160" onChange={(e) => setDecision(e.target.value)}>
                    <option disabled selected value>- seleziona un'azione</option>
                    <option value="modifica">Modifica</option>
                    <option value="elimina">Elimina</option>
                </Form.Select>
                <Button type="submit" size="sm" variant="primary">Salva</Button>
            </Form>
        </ListGroup.Item>
    );
};

export default MentorFileItem;