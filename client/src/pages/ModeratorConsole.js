import React, {useEffect} from 'react';
import { Container, Tabs, Tab, Nav, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Avatar, { AvatarConfig } from 'react-nice-avatar'
import { useNavigate } from 'react-router-dom';
import ModeratorReportedList from '../components/liste/ModeratorReportedList';
import ModeratorPendingList from '../components/liste/ModeratorPendingList';
import UserPendingList from '../components/liste/UserPendingList';
import MentorPendingList from '../components/liste/MentorPendingList';



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
            <Navigation navbar={props.navbar} token={props.token}/>
            {/* <Container className='my-5'>
                <Tabs defaultActiveKey="pending" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="pending" title="File in attesa di approvazione">
                        <ModeratorPendingList token={props.token}/>
                    </Tab>
                    <Tab eventKey="reported" title="File segnalati dagli utenti">
                        <ModeratorReportedList token={props.token}/>
                    </Tab>
                    <Tab eventKey="user-pending" title="Richieste di upgrade a Mentor">
                        
                    </Tab>
                    <Tab eventKey="mentor-list" title="Mentor del sito">
                        
                    </Tab>
                </Tabs>
            </Container> */}
            <Tab.Container defaultActiveKey="pending">
                <Row className="mx-5 mt-5" style={{height:"80vh"}}>
                    <Col xs="auto">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="pending">File in attesa di approvazione</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reported">File segnalati dagli utenti</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="user-pending">Richieste di upgrade a Mentor</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="mentor-list">Mentor del sito</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col id="console-panes" sm={9}>
                        <Tab.Content className='mt-3'>
                            <Tab.Pane eventKey="pending">
                                <ModeratorPendingList token={props.token}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="reported">
                                <ModeratorReportedList token={props.token}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="user-pending">
                                <UserPendingList token={props.token}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="mentor-list">
                                <MentorPendingList token={props.token}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default ModeratorConsole;