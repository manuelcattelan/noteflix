import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeratorReportedItem from './ModeratorReportedItem';
import notfound from '../../media/not-found.svg'

const ModeratorReportedList = (props) => {

    const navigate = useNavigate();

    const [reportedDoc, setReportedDoc] = useState()

    useEffect(() => {
        fetch("../api/v2/documents/reported?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setReportedDoc(data.documents)
            }
        })
    }, []);

    return (
        <ListGroup as="ol" numbered>
            {
                reportedDoc
                ?
                reportedDoc.map((item) => 
                    <ModeratorReportedItem
                        title={item.title}
                        id={item._id}
                        reportedTimes={item.reportedTimes}
                        token={props.token}
                    />
                ) 
                :
                <p className='text-center'>
                    <img src={notfound} alt="no document reported" style={{height:"10rem"}}/> <br/>
                    Al momento nessun documento è segnalato.
                </p>
            }
        </ListGroup>
    );
};

export default ModeratorReportedList;