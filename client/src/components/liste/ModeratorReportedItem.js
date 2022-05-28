import React, {useState} from 'react';
import { ListGroup, Button, ButtonGroup, ButtonToolbar, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModeratorFileItemReported = ({token, id, title, reportedTimes}) => {


    const [decision, setDecision] = useState()

    const handleSubmit = (e) => {

        e.preventDefault();

        switch(decision){
            case "rimuovi":
                fetch("api/v1/documents/"+id+"/validate?token="+token, {method: 'PATCH'})
                .then(res => res.json())
                .then(data => alert(data.message))
                .then(document.getElementById("item").className="d-none")
                break;
            case "elimina":
                fetch("api/v1/documents/"+id+"?token="+token, {method: 'DELETE'})
                .then(res => res.json())
                .then(data => alert(data.message))
                .then(document.getElementById("item").className="d-none")
                break;
        }
    }

    return (

            <ListGroup.Item
                id="item"
                as="li"
                className="d-flex justify-content-between align-items-center"
            >
                <div className="fw-bold ms-2 me-auto">{title}</div>
                {/* <span className="fw-bold text-primary me-3">Scrivi all'autore</span> */}
                <ListGroup className="me-3" horizontal>
                    <ListGroup.Item>Segnalazioni ricevute: {reportedTimes}</ListGroup.Item>
                    <ListGroup.Item>13 commenti</ListGroup.Item>
                    <ListGroup.Item>129 valutazioni</ListGroup.Item>
                    <ListGroup.Item>Piace al 90%</ListGroup.Item>
                </ListGroup>
                <Link to={"/document/?id="+id}>
                    <Button variant="outline-primary">Visualizza</Button>
                </Link>
                <Form id="form" className="d-flex" onSubmit={handleSubmit}>
                    <Form.Select className='mx-3' id="macroarea" maxlength="160" onChange={(e) => setDecision(e.target.value)}>
                        <option disabled selected value>- seleziona un'azione</option>
                        <option value="rimuovi">Rimuovi segnalazione</option>
                        <option value="elimina">Elimina documento</option>
                    </Form.Select>
                    <Button type="submit" size="sm" variant="primary">Salva</Button>
                </Form>
                
            </ListGroup.Item>

    );
};

export default ModeratorFileItemReported;