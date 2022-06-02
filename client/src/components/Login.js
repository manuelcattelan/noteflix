import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Platform from '../pages/Platform';


const Login = ({setToken, token, setUser, setPersona, user, setPage, setNavbar}) => {

    
    //stato per il form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //navigate nel caso il form venga compilato correttamente
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        
        e.preventDefault()

        fetch('../api/v2/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password } ),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                setToken(data.token)
                
                const provToken = data.token

                fetch("../api/v2/token/?token="+provToken)
                .then(resp => resp.json())
                .then(data => {
                    setUser(data.tokenData.id)

                    //fetch per ottenere username e avatar utente
                    fetch("../api/v2/users/"+data.tokenData.id+"?token="+provToken)
                    .then(resp => resp.json())
                    .then(data => setPersona(data))

                    switch(data.tokenData.type) {
                        case "mentor":
                          setNavbar("mentor")
                          setPage(<Platform token={provToken} navbar="mentor"/>)
                          navigate('/')
                          break;
                        case "moderator":
                          setNavbar("moderator")
                          setPage(<Platform token={provToken} navbar="moderator"/>)
                          navigate('/')
                          break;
                        case "user":
                          setNavbar("user")
                          setPage(<Platform token={provToken} navbar="user"/>)
                          navigate('/')
                          break;
                        default:
                          setNavbar("user")
                          setPage(<Platform token={data.token} navbar="user"/>)
                          navigate('/')
                    }
                })
                
            }else{
                alert(data.message)
            }
        })
    }



    return (
        <>
            <Form className="mt-5 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Indirizzo Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci la tua email" onChange={(e)=>setEmail(e.target.value)} required/>
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