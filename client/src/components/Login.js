import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useLocalStorage from "../hooks/useLocalStorage";//hooks
import { HashLink as Link } from 'react-router-hash-link';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Platform from '../pages/Platform';


const Login = (props) => {

    
    //stato per il form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //navigate nel caso il form venga compilato correttamente
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        
        e.preventDefault()

        fetch('http://localhost:3001/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password } ),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                props.setToken(data.token)
                props.setPage(<Platform theme={props.theme} setTheme={props.toggleTheme} token={props.token} user={props.user}/>)
                navigate('/')
            }else{
                alert(data.message)
            }
        })
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