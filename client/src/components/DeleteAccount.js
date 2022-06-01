import React, {useState, useEffect} from 'react';
import { Button, Form, Modal, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = JSON.parse(window.localStorage.getItem("user"))
    const token = JSON.parse(window.localStorage.getItem("token"))
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        const typedUsername = document.getElementById("typed-username").value
        if(persona.username === typedUsername){
            fetch("api/v1/users/"+id+"?token="+token, {method: 'DELETE'})
            .then(res => res.json())
            .then(e.target.className="d-none")
            //logout
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/")
            window.location.reload(false)
        }        
    }

    
    const [persona, setPersona] = useState({})
    useEffect(()=>{
        fetch("http://localhost:3001/api/v1/users/"+id+"?token="+token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(alert(JSON.stringify(persona)))
    }, [])

    return (
        <>
            <NavDropdown.Item href="#" onClick={handleShow}>
                Elimina l'account
            </NavDropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Elimina il tuo account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Stai per eliminare il tuo account <span className='text-danger'>{persona.username}</span> perdendo tutti i documenti salvati nella tua libreria personale e tutti
                    i tuoi progressi nella piattaforma. 
                    <Form.Group className="my-4">
                        <Form.Control id="typed-username" type="email" placeholder="Username" required/>
                        <Form.Text className="text-danger">
                            Inserisci il tuo username {persona.username} per confermare.
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Sono sicuro di voler eliminare il mio account
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteAccount;