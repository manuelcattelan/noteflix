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
                    {
                        liked
                        ?
                        <i class="bi bi-hand-thumbs-down-fill" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                        :
                        <i class="bi bi-hand-thumbs-down" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                    }
                    {
                        liked
                        ?
                        <i class="bi bi-hand-thumbs-up-fill" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                        :
                        <i class="bi bi-hand-thumbs-up" style={{fontSize: "2rem", color: "#623FF0"}}  onClick={handleLike}></i>
                    }
                    
                </Col>
                <Col className="mt-2 p-0">
                    <p className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Piace a {like} utenti</p>
                    <p className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Non piace a {dislike} utenti</p>
                </Col>
            </Row>
            
        </>
    );
};

export default Rating;