import React from 'react';

const Save = ({id, saved}) => {

    const token = JSON.parse(window.localStorage.getItem("token"))

    const handleSave = () => {
        fetch("http://localhost:3001/api/v1/documents/"+id+"/save?token="+token, {method: 'POST'})
        .then(res => res.json())
        .then(data => {
            if(data.success){
                if(data.saved) document.getElementById("bookmark").className="bi bi-bookmark-fill pe-2"
                else           document.getElementById("bookmark").className="bi bi-bookmark pe-2"
            }
        })   
    }

    return (
        <>
            {
                saved
                ?
                <i id="bookmark" className="bi bi-bookmark-fill pe-2" style={{fontSize: "2rem"}} onClick={handleSave}></i>
                :
                <i id="bookmark" className="bi bi-bookmark pe-2" style={{fontSize: "2rem"}} onClick={handleSave}></i>
            }
        </>
    );
};

export default Save;