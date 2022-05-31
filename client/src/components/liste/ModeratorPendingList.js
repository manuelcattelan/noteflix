import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeratorPendingItem from './ModeratorPendingItem';
import notfound from '../../media/not-found.svg'

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
    }, []);


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
                <p className='text-center'>
                    <img src={notfound} alt="no file found" style={{height:"10rem"}}/> <br/>
                    Nessun documento in attesa di essere approvato.
                </p>
            }
        </ListGroup>
    );
};

export default ModeratorPendingList;