import React, {useEffect, useState} from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Avatar from 'react-nice-avatar'
import { useNavigate } from 'react-router-dom';
import MentorFileList from '../components/liste/MentorFileList';
import Footer from '../components/Footer';



const MentorConsole = (props) => {

    const navigate = useNavigate();
    const [docArray, setDocArray] = useState()
    const userId = JSON.parse(window.localStorage.getItem("user"))
    const [persona, setPersona] = useState({})

    useEffect(() => {
        fetch("../api/v2/documents/uploaded?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setDocArray(data.documents)
            }
        })

        fetch("../api/v2/users/"+userId+"?token="+props.token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(alert(JSON.stringify(persona)))


    }, []);

    



    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <div  style={{minHeight:"65vh"}}>
                <Container className='my-5'>
                    <Row>
                        <Col md="3" className='d-flex justify-content-center align-items-center'>
                            <Avatar className="" style={{ width: '10rem', height: '10rem' }} {...persona.avatar}/>
                        </Col>
                        <Col className='d-flex align-items-center'>
                            <p className='h1 fw-bold'>Benvenuto <span className='text-primary'>{persona.username}</span> nella tua pagina <br/> da mentore, gestisci da qui i tuoi file.</p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <MentorFileList docArray={docArray} token={props.token}/>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default MentorConsole;