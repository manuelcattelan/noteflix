import React, {useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const Rating = ({like, dislike, id, rating, token, saved}) => {


    const handleLike = (e) => {
        fetch("http://localhost:3001/api/v1/documents/"+id+"/like?token="+token, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.rating === "liked"){
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up-fill"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down"
                    document.getElementById("like").innerHTML = "Piace a " + data.like +" utenti"
                    document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike +" utenti"
                }
                else{
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down"
                    document.getElementById("like").innerHTML = "Piace a " + data.like +" utenti"
                    document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike +" utenti"
                }
            }
        })
    }

    const handleDislike = (e) => {
        fetch("http://localhost:3001/api/v1/documents/"+id+"/dislike?token="+token, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.rating === "disliked"){
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down-fill"
                    document.getElementById("like").innerHTML = "Piace a " + data.like +" utenti"
                    document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike +" utenti"
                }
                else{
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down"
                    document.getElementById("like").innerHTML = "Piace a " + data.like +" utenti"
                    document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike +" utenti"
                }
            }
        })
    }



    return (
        <>
            <Row>
                <Col xs="auto">

                    {
                        rating === "liked" 
                        ?
                        <>
                            <i id="t-d" class="bi bi-hand-thumbs-down" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                            <i id="t-u" class="bi bi-hand-thumbs-up-fill" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                        </>
                        :
                            rating === "disliked"
                            ?
                            <>
                                <i id="t-d" class="bi bi-hand-thumbs-down-fill" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                                <i id="t-u" class="bi bi-hand-thumbs-up" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                            </>
                            :
                            <>
                                <i id="t-d" class="bi bi-hand-thumbs-down" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                                <i id="t-u" class="bi bi-hand-thumbs-up" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                            </>
                    }
                    
                    
                </Col>
                <Col className="mt-2 p-0">
                    <p id="like" className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Piace a {like} utenti</p>
                    <p id="dislike" className='my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>Non piace a {dislike} utenti</p>
                </Col>
            </Row>
            
        </>
    );
};

export default Rating;