import React, {useEffect, useState} from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import swal from 'sweetalert';
import img from '../media/mentorwannabe.svg'



const MentorWannaBe = (props) => {

    const navigate = useNavigate();
    const token = JSON.parse(window.localStorage.getItem("token"))

    const[userType, setUserType] = useState()
    const [show, setShow] = useState(true);

    useEffect(() => {
        fetch("../api/v2/token/?token="+token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }else{
               setUserType(data.tokenData.type)
            }
        })
    }, []);

    const handleRequest = () => {
        fetch("../api/v2/users/userToMentor?token="+token, { method: 'PATCH'} )
        .then(res => res.json())
        .then( data => swal(data.message))
        .then(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("persona")
            window.location.reload(false)
        })
    }


    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container style={{minHeight:"40vh"}} className='d-flex align-items-center'>
                <Row>
                    <Col xs="auto">
                        <img src={img} alt="floating papers" style={{height:"15rem"}}/>
                    </Col>
                    <Col className='d-flex align-items-center'>
                        <p className='titolo'><span className='text-primary'>Guadagnare</span> vendendo <span className='text-primary'>appunti</span> di <br/> qualità sulla nostra piattafroma.</p>
                    </Col>
                </Row>
            </Container>
            <Container className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"30vh"}}>
                    {/* <img src={img} alt="diventa mentor" style={{width:"20rem"}}/> */}
                    {
                        userType
                        ?
                            userType === "pending"
                            ?
                            <p className='special mb-4 mt-3 text-center'>La tua richiesta è in attesa di essere approvata.</p>
                            :
                                userType === "user"
                                ?
                                <div className="d-flex flex-column align-items-center">
                                    <p className='special mb-3 mt-3 text-center'>Effettua la richiesta e <span>diventa mentore</span>.</p>
                                    <Alert variant="danger" show={show} onClose={()=>setShow(false)} dismissible style={{width:"40vw"}}>
                                        <small>
                                            Mentre attendi che la tua richiesta venga accettata potrai continuare ad usare 
                                            il tuo account ma verrai considerato come utente in attesa di promozione e dovrai 
                                            <span className="fw-bold"> effettuare nuovamente il login</span>.
                                        </small>
                                    </Alert>
                                </div>
                                :
                                ""
                        :
                        ""
                    }
                    
                {
                    userType === "user"
                    ?
                    <Button className="text-center" onClick={handleRequest}>Richiedi</Button>
                    :
                    <Button className="text-center" disabled>Richiedi</Button>
                }
                
            </Container>
            <Footer/>
        </>
    );
};

export default MentorWannaBe;