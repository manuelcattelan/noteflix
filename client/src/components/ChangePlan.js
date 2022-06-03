import React, {useState, useEffect} from 'react';
import { Button, Form, Modal, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import macroaree from '../data/macroaree.json'
    

const ChangePlan = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = JSON.parse(window.localStorage.getItem("user"))
    const token = JSON.parse(window.localStorage.getItem("token"))
    const navigate = useNavigate()
    

    const [subplan, setSubplan] = useState("matricole")
    const [macroarea, setMacroarea] = useState("")
    const handleAbbonamento = (valore) => {
        setSubplan(valore)
        switch(valore){
            case "matricole":
                document.getElementById("info-abbonamento").innerHTML="Non sono previsti costi per il piano selezionato"
                document.getElementById("macroarea").className="d-none"
                break;
            case "studenti":
                document.getElementById("info-abbonamento").innerHTML="Il piano solezionato prevede un costo mensile di $4.99"
                document.getElementById("macroarea").className="d-block mb-3"
                break;
            case "nerd":
                document.getElementById("info-abbonamento").innerHTML="Il piano seleizonato prevede un costo mensile di $8.99"
                document.getElementById("macroarea").className="d-none"
                break;
            default:
                document.getElementById("info-abbonamento").innerHTML="Seleziona un piano"
                document.getElementById("macroarea").className="d-none"
        }
    }   

    const handlePlanChange = () => {
        fetch("../api/v2/users/changeSubscription?token="+token, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { subscriptionType: subplan, subscriptionArea: macroarea } ),

        })
        .then(res => res.json())
        .then(data => swal(data.message))
        .then(()=>{
            //logout
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/")
            window.location.reload(false)
        })
        

    }
    
    const [piano, setPiano] = useState("")
    const [area, setArea] = useState("")
    useEffect(()=>{
        fetch("../api/v2/token/?token="+token)
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                setPiano(data.tokenData.subscription.type)
                setArea(data.tokenData.subscription.area)
            }
        })
    }, [])

    return (
        <>
            <NavDropdown.Item href="#" onClick={handleShow}>
                Modifica piano
            </NavDropdown.Item>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Modifica il tuo Abbonamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Il tuo abbonamento attuale rientra nel piano <span className="fw-bold">{piano}</span>
                    {
                        area !== ""
                        ?
                        <span>, con accesso alla macroarea  <span className="fw-bold">{area}</span>.</span>
                        :
                        ""
                    }
                    <br/>
                    Se desideri modificare il piano seleziona la tua nuova scelta e conferma.

                    <Form.Group className="my-3" controlId="formBasicPassword">
                        <Form.Select onChange={(e)=>handleAbbonamento(e.target.value)} required>
                            <option value="matricole">Matricole</option>
                            <option value="studenti">Studenti</option>
                            <option value="nerd">Nerd</option>
                        </Form.Select>
                        <Form.Text id="info-abbonamento" className="text-muted">
                            Non sono previsti costi per il piano selezionato
                        </Form.Text>
                    </Form.Group>
                    <Form.Group id="macroarea" className="d-none">
                        <Form.Label>Scegli una macroarea</Form.Label>
                        <Form.Select id="macroarea"  onChange={(e)=>{setMacroarea(e.target.value)}} maxlength="160" required>
                            <option disabled selected value>-</option>
                            {
                                macroaree.map((item) => 
                                    <option value={item.nome}>{item.nome}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer className="d-flex">
                    <span className="small me-auto">Dovrai effettuare nuovamente il login</span>
                    <Button variant="primary" onClick={handlePlanChange}>
                        Aggiorna il mio piano
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangePlan;