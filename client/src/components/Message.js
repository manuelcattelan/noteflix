import React from 'react';
import { Toast } from 'react-bootstrap';
import Avatar from 'react-nice-avatar'
import swal from 'sweetalert';
    

const Message = ({username, avatar, body, date, id}) => {

    const data = new Date(date)

    const idDoc = window.location.href.split("?id=")[1] //ottengo l'id del doc
    const token = JSON.parse(window.localStorage.getItem("token"))
    
    const deleteComment = () => {

        fetch("../api/v2/documents/"+idDoc+"/comment/"+id+"?token="+token, {method:"DELETE"})
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                document.getElementById(id).className="d-none"
            }else{
                swal(data.message)
            }
        })
    }

    return (
        <>
            <Toast id={id} className="d-inline-block m-1" bg="light" onClose={deleteComment}>
                <Toast.Header closeButton={true}>
                    <Avatar className='me-2' style={{ width: '2rem', height: '2rem' }} {...avatar} />
                    <strong className="me-auto">{username}</strong>
                    <small>{data.toLocaleString()}</small>
                </Toast.Header>
                <Toast.Body>
                    {body}
                </Toast.Body>
            </Toast>
        </>
    );
};

export default Message;