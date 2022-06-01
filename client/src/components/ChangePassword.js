import React, {useState, useEffect} from 'react';
import { Button, Form, Modal, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = JSON.parse(window.localStorage.getItem("user"))
    const token = JSON.parse(window.localStorage.getItem("token"))
    const navigate = useNavigate()
    

    const handlePwdChange = (e) => {
        e.preventDefault()
        var oldPwd = document.getElementById("old-password").value
        var newPwd = document.getElementById("new-password").value
        var newPwdConfirm = document.getElementById("new-password-confirm").value

        if (newPwd !== newPwdConfirm) {
            alert("Passwords do not match.");
            return false;
        }

        fetch("../api/v2/users/changePassword?token="+token, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { oldPassword: oldPwd, newPassword: newPwd } ),

        })
        .then(res => res.json())
        .then(data => alert(data.message))
    }        

    
    const [persona, setPersona] = useState({})
    useEffect(()=>{
        fetch("../api/v2/users/"+id+"?token="+token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(alert(JSON.stringify(persona)))
    }, [])

    return (
        <>
            <NavDropdown.Item href="#" onClick={handleShow}>
                Cambia password
            </NavDropdown.Item>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Modifica la tua password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    E' necessario verificare la tua identità inserendo la password attuale, seguita
                    dalla nuova password che hai scelto per questo profilo e confermata.
                    <Form.Group className="my-4">
                        <Form.Control id="old-password" type="password" placeholder="Password" required/>
                        <Form.Text className="text-secondary">
                            Conferma di essere {persona.username} inserendo la password attuale.
                        </Form.Text>
                    </Form.Group>
                    Inserisci ora le <span className="fw-bold">nuove credenziali</span>.
                    <Form.Group className="my-2">
                        <Form.Control id="new-password" type="password" placeholder="Nuova Password" required/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control id="new-password-confirm" type="password" placeholder="Conferma Nuova Password" required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handlePwdChange}>
                    Salva la nuova password
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangePassword;