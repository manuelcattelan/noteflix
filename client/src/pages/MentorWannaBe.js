import React, {useEffect} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAlert } from 'react-alert'
import img from '../media/mentorwannabe.svg'



const MentorWannaBe = (props) => {

    const navigate = useNavigate();
    const alert = useAlert()

    const token = JSON.parse(window.localStorage.getItem("token"))

    useEffect(() => {
        fetch("../api/v2/token/?token="+token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
        })
    }, []);

    const handleRequest = () => {
        // fetch("api/v2/users/changeSubscription?token="+token, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify( { subscriptionType: subplan, subscriptionArea: macroarea } ),

        // })
        // .then(res => res.json())
        // .then(data => alert.show(data.message))
    }


    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container className='d-flex flex-column justify-content-center align-items-center' style={{height:"90vh"}}>
                <div>
                    <p className='titolo text-center'><span className='text-primary'>Guadagnare</span> vendendo <span className='text-primary'>appunti</span> di <br/> qualità sulla nostra piattafroma.</p>
                    <p className='testo text-center'>Prima di cominciare permetti al nostro team di valutare il tuo profilo.</p>
                    {/* <img src={img} alt="diventa mentor" style={{width:"20rem"}}/> */}
                    <p className='special mb-4 mt-3 text-center'>Effettua la rischiesta e <span>diventa mentore</span>.</p>
                </div>
                <Button className="text-center" onClick={handleRequest}>Richiedi</Button>
            </Container>
            
        </>
    );
};

export default MentorWannaBe;