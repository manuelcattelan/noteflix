import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeratorPendingItem from './ModeratorPendingItem';

const ModeratorPendingList = (props) => {


    const navigate = useNavigate();

    const [pendingDoc, setPendingDoc] = useState()

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/documents/pending?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setPendingDoc(data.documents)
            }
        })
    }, [""]);


    return (
        <ListGroup as="ol" numbered>
            {
                pendingDoc
                ?
                pendingDoc.map((item) => 
                    <ModeratorPendingItem
                        title={item.title}
                        id={item._id}
                        email={item.authorEmail}
                        token={props.token}
                    />
                ) 
                :
                ""
            }
        </ListGroup>
    );
};

export default ModeratorPendingList;