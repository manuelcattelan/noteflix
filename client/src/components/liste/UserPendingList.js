import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userswaiting from '../../media/waiting-user.svg'
import UserPendingItem from './UserPendingItem';

const UserPendingList = (props) => {


    const navigate = useNavigate();

    const [pendingUsers, setPendingUsers] = useState()

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/users/pending?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setPendingUsers(data.users)
            }
        })
    }, []);


    return (
        <ListGroup as="ol" numbered>
            {
                pendingUsers
                ?
                pendingUsers.map((item) => 
                    <UserPendingItem
                        id={item.id}
                        email={item.email}
                        username={item.username}
                        avatar={item.avatar}
                        token={props.token}
                    />
                ) 
                :
                <p className='text-center'>
                    <img src={userswaiting} alt="users waiting to became mentor" style={{height:"10rem"}}/> <br/>
                    Nessun utente è in attesa di diventare Mentor.
                </p>
            }
        </ListGroup>
    );
};

export default UserPendingList;