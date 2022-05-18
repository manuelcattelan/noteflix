import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar'
import { Link } from 'react-router-dom';

const Signup = () => {



    const [avatarConfig,setAvatarConfig] = useState(genConfig(AvatarConfig));
    const handleAvatarChange = () => setAvatarConfig(genConfig(AvatarConfig));


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e) => {
        
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "email": email,
            "password": password,
            "avatar": avatarConfig
        });

        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/v1/auth/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }


    return (
        <>
            <Form className="mt-5" on Submit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <span onClick={handleAvatarChange} style={{ cursor:"pointer" }}>
                        <Avatar style={{ width: '7rem', height: '7rem' }} {...avatarConfig}/>
                    </span>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="fs-8 ms-3 my-4 text-center" >
                        Clicca sul doodle per generare un nuovo avatar. <br/>
                        Questo sarà associato al tuo profilo.
                    </span>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Indirizzo Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci la tua email" onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Conferma la Password</Form.Label>
                    <Form.Control type="password" placeholder="Ripeti la password" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" className="me-3"/>
                    <Form.Label required>
                        Registrandoti dichiari di aver letto ed accettato i <Link to="/policy"><span className='text-primary fw-bold'>termini del servizio</span></Link>.
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrati
                </Button>
            </Form>
        </>
    );
};

export default Signup;