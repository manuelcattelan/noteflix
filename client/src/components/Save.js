import React from 'react';

const Save = ({id, saved}) => {

    const token = JSON.parse(window.localStorage.getItem("token"))

    const handleSave = () => {
        fetch("../api/v2/documents/"+id+"/save?token="+token, {method: 'POST'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.saved){
                    document.getElementById("bookmark").className="bi bi-bookmark-fill pe-2"
                    document.getElementById("bookmark-text").innerHTML="<span id='bookmark-text'>Già aggiunto alla tua libreria</span>"
                }else{
                    document.getElementById("bookmark").className="bi bi-bookmark pe-2"
                    document.getElementById("bookmark-text").innerHTML="<span id='bookmark-text'>Salva nella libreria personale</span>"
                }
            }
        })   
    }

    return (
        <>
            {
                saved
                ?
                <div onClick={handleSave}>
                    <i id="bookmark" className="bi bi-bookmark-fill pe-2" style={{fontSize: "1rem"}}></i>
                    <span id="bookmark-text">Già aggiunto alla tua libreria</span>
                </div>
                :
                <div onClick={handleSave}>
                    <i id="bookmark" className="bi bi-bookmark pe-2" style={{fontSize: "1rem"}}></i>
                    <span id="bookmark-text">Salva nella libreria personale</span>
                </div>
            }
        </>
    );
};

export default Save;