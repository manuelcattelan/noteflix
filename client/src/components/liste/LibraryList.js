import React, {useEffect, useState} from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import nolib from '../../media/empty-library.svg'
import LibraryItem from './LibraryItem';

const LibraryList = ({documenti}) => {

    const token = JSON.parse(window.localStorage.getItem("token"))
    // const navigate = useNavigate();
    // useEffect(() => {
    //     fetch("../api/v2/documents/reported?token="+props.token)
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
                <p className='text-center'>
                    <img src={nolib} alt="no document reported" style={{height:"20rem"}}/> <br/>
                    Seleziona un file della piattaforma e salvalo per aggiungerlo alla libreria.
                </p>
            }
        </ListGroup>
    );
};

export default LibraryList;