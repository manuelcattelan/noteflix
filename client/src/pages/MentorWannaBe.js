import React, {useEffect, useState} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

import img from '../media/mentorwannabe.svg'



const MentorWannaBe = (props) => {

    const navigate = useNavigate();
    const token = JSON.parse(window.localStorage.getItem("token"))

    const[userType, setUserType] = useState()

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
        
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("persona")
        window.location.reload(false)
    }


    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container className='d-flex flex-column justify-content-center align-items-center' style={{height:"90vh"}}>
                <div>
                    <p className='titolo text-center'><span className='text-primary'>Guadagnare</span> vendendo <span className='text-primary'>appunti</span> di <br/> qualità sulla nostra piattafroma.</p>
                    <p className='testo text-center'>Prima di cominciare permetti al nostro team di valutare il tuo profilo.</p>
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
                                <>
                                    <p className='special mb-1 mt-3 text-center'>Effettua la richiesta e <span>diventa mentore</span>.</p>
                                    <p className="small text-center">Verrai disconnesso dal tuo attuale account per rendere definitiva la richiesta</p>
                                </>
                                :
                                ""
                        :
                        ""
                    }
                    
                </div>
                {
                    userType === "user"
                    ?
                    <Button className="text-center" onClick={handleRequest}>Richiedi</Button>
                    :
                    <Button className="text-center" disabled>Richiedi</Button>
                }
                
            </Container>
            
        </>
    );
};

export default MentorWannaBe;