import React, {useEffect} from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Avatar, { AvatarConfig } from 'react-nice-avatar'
import { useNavigate } from 'react-router-dom';
import ModeratorReportedList from '../components/liste/ModeratorReportedList';
import ModeratorPendingList from '../components/liste/ModeratorPendingList';



const ModeratorConsole = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/token/?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
        })
    }, [""]);




    return (
        <>
            <Navigation theme={props.theme} setTheme={props.setTheme} user={props.user} setUser={props.setUser} navbar={props.navbar}/>
            <Container className='my-5'>
                <Tabs defaultActiveKey="pending" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="pending" title="File in attesa di approvazione">
                        <ModeratorPendingList/>
                    </Tab>
                    <Tab eventKey="reported" title="File segnalati dagli utenti">
                        <ModeratorReportedList/>
                    </Tab>
                </Tabs>
            </Container>
            
        </>
    );
};

export default ModeratorConsole;