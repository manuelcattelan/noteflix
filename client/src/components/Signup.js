import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar'
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Platform from '../pages/Platform';

const Signup = (props) => {


    //handling avatar
    const [avatarConfig,setAvatarConfig] = useState(genConfig(AvatarConfig));
    const handleAvatarChange = () => setAvatarConfig(genConfig(AvatarConfig));

    //data form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")


    //navigate nel caso il form venga compilato correttamente
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        
        e.preventDefault()

        fetch('http://localhost:3001/api/v1/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password, avatar: avatarConfig, username: username } ),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                props.setToken(data.token)
                props.setNavbar("user")
                props.setPage(<Platform theme={props.theme} setTheme={props.toggleTheme} token={data.token} user={props.user} navbar="user"/>)
                navigate('/')
            }else{
                alert(data.message)
            }
        })
        .then(console.log(props.token))
    }


    const validatePassword = () => {
        var password = document.getElementById("password-label").value;
        var confirmPassword = document.getElementById("confirm-password-label").value;
        if (password != confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    }


    return (
        <>
            <Form className="my-5" onSubmit={handleSubmit}>
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
                    <Form.Text className="text-muted">
                        Non condivideremo la tua email con terze parti.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Scegli uno username</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci uno username" onChange={(e)=>setUsername(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password-label" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Conferma la Password</Form.Label>
                    <Form.Control id="confirm-password-label" type="password" placeholder="Ripeti la password" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" className="me-3" required/>
                    <Form.Label>
                        Registrandoti dichiari di aver letto ed accettato i <Link to="/policy"><span className='text-primary fw-bold'>termini del servizio</span></Link>.
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={validatePassword}>
                    Registrati
                </Button>
            </Form>
        </>
    );
};

export default Signup;