import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeratorReportedItem from './ModeratorReportedItem';

const ModeratorReportedList = (props) => {

    const navigate = useNavigate();

    const [reportedDoc, setReportedDoc] = useState()

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/documents/reported?token="+props.token)
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                navigate('/')
            }
            else{
                setReportedDoc(data.documents)
            }
        })
    }, [""]);

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
                ""
            }
        </ListGroup>
    );
};

export default ModeratorReportedList;