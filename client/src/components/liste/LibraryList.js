import React, {useEffect, useState} from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import notfound from '../../media/not-found.svg'
import LibraryItem from './LibraryItem';

const LibraryList = ({documenti}) => {

    const token = JSON.parse(window.localStorage.getItem("token"))
    // const navigate = useNavigate();
    // useEffect(() => {
    //     fetch("http://localhost:3001/api/v1/documents/reported?token="+props.token)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         if(!data.success){
    //             navigate('/')
    //         }
    //         else{
    //             setReportedDoc(data.documents)
    //         }
    //     })
    // }, []);

    return (
        <ListGroup as="ol" numbered>
            {
                documenti
                ?
                <Accordion>
                {
                    documenti.map((item) => 
                        <LibraryItem
                            titolo={item.title}
                            descrizione={item.description}
                            url={item.url}
                            macroarea={item.area}
                            id={item._id}
                            approval={item.approval}
                        />
                    )
                }
                </Accordion>
                :
                ""
            }
        </ListGroup>
    );
};

export default LibraryList;