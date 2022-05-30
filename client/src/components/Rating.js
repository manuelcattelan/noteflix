import React, {useState} from 'react';
import { Button, Col, Row, ProgressBar } from 'react-bootstrap';

const Rating = ({like, dislike, id, rating, token, saved, approval}) => {

    const percent = (nlike, ndislike) =>{
        if(nlike + ndislike == 0) return 0;
        else return (nlike*100)/(nlike+ndislike)
    }

    const [progress, setProgress] = useState()

    const handleLike = (e) => {
        fetch("http://localhost:3001/api/v1/documents/"+id+"/like?token="+token, {method: 'PATCH'})
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
                document.getElementById("like").innerHTML = data.like
                document.getElementById("dislike").innerHTML = data.dislike
                setProgress(percent(data.like, data.dislike))
            }
        })
    }

    const handleDislike = (e) => {
        fetch("http://localhost:3001/api/v1/documents/"+id+"/dislike?token="+token, {method: 'PATCH'})
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
                document.getElementById("like").innerHTML = data.like
                document.getElementById("dislike").innerHTML = data.dislike
                setProgress(percent(data.like, data.dislike))
            }
        })
    }



    return (
        <>
            <div className="d-flex align-items-center justify-content-center w-50">
                <p id="like" className='mx-3 my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>{like}</p>
                    {
                        rating === "liked" 
                        ?
                        <>
                            <i id="t-u" class="bi bi-hand-thumbs-up-fill mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                            <i id="t-d" class="bi bi-hand-thumbs-down mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                        </>
                        :
                            rating === "disliked"
                            ?
                            <>
                                <i id="t-u" class="bi bi-hand-thumbs-up mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                                <i id="t-d" class="bi bi-hand-thumbs-down-fill mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                            </>
                            :
                            <>
                                <i id="t-u" class="bi bi-hand-thumbs-up mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleLike}></i>
                                <i id="t-d" class="bi bi-hand-thumbs-down mx-1" style={{fontSize: "2rem", color: "#623FF0"}} onClick={handleDislike}></i>
                            </>
                    }
                    <p id="dislike" className='mx-3 my-0 text-primary doc-descrizione' style={{lineHeight:"15px"}}>{dislike}</p>
            </div>
            <ProgressBar className="mx-1 w-50" now={progress?progress:approval} style={{height:"3px"}}/>
        </>
    );
};

export default Rating;