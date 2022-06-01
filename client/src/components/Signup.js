import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar'
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Platform from '../pages/Platform';
import macroaree from '../data/macroaree.json'
    

const Signup = ({setPage, setNavbar, setUser, user, setToken}) => {


    //handling avatar
    const [avatarConfig,setAvatarConfig] = useState(genConfig(AvatarConfig));
    const handleAvatarChange = () => setAvatarConfig(genConfig(AvatarConfig));

    //data form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [subplan, setSubplan] = useState("matricole")
    const [macroarea, setMacroarea] = useState("")


    //navigate nel caso il form venga compilato correttamente
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        
        e.preventDefault()

        if (!validatePassword()){
            return;
        }

        fetch('../api/v2/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password, avatar: avatarConfig, username: username, subscriptionType: subplan, subscriptionArea: macroarea } ),
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
                    switch(data.tokenData.type) {
                        case "mentor":
                          setNavbar("mentor")
                          setPage(<Platform token={provToken} user={user} navbar="mentor"/>)
                          navigate('/')
                          break;
                        case "moderator":
                          setNavbar("moderator")
                          setPage(<Platform token={provToken} user={user} navbar="moderator"/>)
                          navigate('/')
                          break;
                        case "user":
                          setNavbar("user")
                          setPage(<Platform token={provToken} user={user} navbar="user"/>)
                          navigate('/')
                          break;
                        default:
                          setNavbar("user")
                          setPage(<Platform token={data.token} user={user} navbar="user"/>)
                          navigate('/')
                    }
                })
                
            }else{
                alert(data.message)
            }
        })
    }


    const validatePassword = () => {
        var password = document.getElementById("password-label").value;
        var confirmPassword = document.getElementById("confirm-password-label").value;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    }

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

    return (
        <>
            <Form className="my-5 mx-5" onSubmit={handleSubmit}>
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
                    <Form.Control maxlength="30" type="text" placeholder="Inserisci uno username" onChange={(e)=>setUsername(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password-label" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Conferma la Password</Form.Label>
                    <Form.Control id="confirm-password-label" type="password" placeholder="Ripeti la password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Scegli un piano di abbonamento</Form.Label>
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
                <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" className="me-3" required/>
                    <Form.Label>
                        Registrandoti dichiari di aver letto ed accettato i <Link to="/policy"><span className='text-primary fw-bold'>termini del servizio</span></Link>.
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Registrati
                </Button>
            </Form>
        </>
    );
};

export default Signup;
