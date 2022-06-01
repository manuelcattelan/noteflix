import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userswaiting from '../../media/waiting-user.svg'
import AllUsersItem from './AllUsersItem';

const AllUsersList = (props) => {


    const navigate = useNavigate();

    const [userList, setUserList] = useState()

    useEffect(() => {
        fetch("../api/v2/users?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setUserList(data.users)
            }
        })
    }, []);


    return (
        <ListGroup as="ol" numbered>
            {
                userList
                ?
                userList.map((item) => 
                    <AllUsersItem
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
                    Nessun Utente nella piattaforma.
                </p>
            }
        </ListGroup>
    );
};

export default AllUsersList;