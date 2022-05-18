import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e) => {
        
        e.preventDefault()

        fetch('http://localhost:3001/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password } ),
        })
        .then((resp) => resp.json()).then(result => console.log(result))
        .catch(error => console.log('error', error)); // Transform the data into json
        
    }



    return (
        <>
            <Form className="mt-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Indirizzo Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci la tua email" onChange={(e)=>setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        Non condivideremo la tua email con terze parti.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Accedi
                </Button>
            </Form>
        </>
    );
};

export default Login;