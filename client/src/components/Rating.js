import React, {useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const Rating = ({like, dislike, id, liked, token}) => {


    const handleLike = (e) => {
        
        fetch("http://localhost:3001/api/v1/documents/"+id+"/like?token="+token, {method: 'POST'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                
            }
        })
    }



    return (
        <>
            <Row>
                <Col xs="auto">
                    <Button size="sm" className='me-1' variant="outline-primary">Salva</Button>
                    {
                        liked
                        ?
                        <Button size="sm" variant="outline-primary" onClick={handleLike}>Unlike</Button>
                        :
                        <Button size="sm" variant="outline-primary" onClick={handleLike}>Like</Button>
                    }
                    
                </Col>
                <Col className="p-0">
                    <p className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Piace a {like} utenti</p>
                    <p className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Non piace a {dislike} utenti</p>
                </Col>
            </Row>
            
        </>
    );
};

export default Rating;