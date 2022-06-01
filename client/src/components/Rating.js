import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Rating = ({like, dislike, id, rating, token, saved}) => {


    const handleLike = (e) => {
        fetch("../api/v2/documents/"+id+"/like?token="+token, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.rating === "liked"){
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up-fill mx-1"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down mx-1"
                }
                else{
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up mx-1"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down mx-1"
                }
                document.getElementById("like").innerHTML = "Piace a " + data.like + " utenti"
                document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike + " utenti"
            }
        })
    }

    const handleDislike = (e) => {
        fetch("../api/v2/documents/"+id+"/dislike?token="+token, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.rating === "disliked"){
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up mx-1"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down-fill mx-1"
                }
                else{
                    document.getElementById("t-u").className="bi bi-hand-thumbs-up mx-1"
                    document.getElementById("t-d").className="bi bi-hand-thumbs-down mx-1"
                }
                document.getElementById("like").innerHTML = "Piace a " + data.like + " utenti"
                document.getElementById("dislike").innerHTML = "Non piace a " + data.dislike + " utenti"
            }
        })
    }



    return (
        <>
            <Row>
                <Col xs="auto" className="pe-0">
                    {
                        rating === "liked" 
                        ?
                        <>
                            <i id="t-u" class="bi bi-hand-thumbs-up-fill mx-1" style={{fontSize: "2rem"}} onClick={handleLike}></i>
                            <i id="t-d" class="bi bi-hand-thumbs-down mx-1" style={{fontSize: "2rem"}} onClick={handleDislike}></i>
                        </>
                        :
                            rating === "disliked"
                            ?
                            <>
                                <i id="t-u" class="bi bi-hand-thumbs-up mx-1" style={{fontSize: "2rem"}} onClick={handleLike}></i>
                                <i id="t-d" class="bi bi-hand-thumbs-down-fill mx-1" style={{fontSize: "2rem"}} onClick={handleDislike}></i>
                            </>
                            :
                            <>
                                <i id="t-u" class="bi bi-hand-thumbs-up mx-1" style={{fontSize: "2rem"}} onClick={handleLike}></i>
                                <i id="t-d" class="bi bi-hand-thumbs-down mx-1" style={{fontSize: "2rem"}} onClick={handleDislike}></i>
                            </>
                    }
                </Col>
                <Col className="d-flex align-items-center">
                    <div>
                        <p id="like" className='my-0 doc-descrizione' style={{lineHeight:"15px"}}>Piace a {like} utenti</p>
                        <p id="dislike" className='my-0 doc-descrizione' style={{lineHeight:"15px"}}>Non piace a {dislike} utenti </p>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Rating;