import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MentorPendingItem from './MentorPendingItem';
import userswaiting from '../../media/waiting-user.svg'

const MentorPendingList = (props) => {


    const navigate = useNavigate();

    const [mentorList, setMentorList] = useState()

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/users/mentors?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setMentorList(data.users)
            }
        })
    }, []);


    return (
        <ListGroup as="ol" numbered>
            {
                mentorList
                ?
                mentorList.map((item) => 
                    <MentorPendingItem
                        username={item.username}
                        avatar={item.avatar}
                        id={item.id}
                        email={item.email}
                        token={props.token}
                    />
                ) 
                :
                <p className='text-center'>
                    <img src={userswaiting} style={{height:"10rem"}}/> <br/>
                    Nessun Mentor nella piattaforma.
                </p>
            }
        </ListGroup>
    );
};

export default MentorPendingList;