import { Offcanvas, Button, Form, FloatingLabel } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Message from './Message';
import swal from 'sweetalert';


const Chat = (props) => {
    
    const token = JSON.parse(window.localStorage.getItem("token"))

    const [comment, setComment] = useState("")
    const [commentArray, setCommentArray] = useState()

    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(comment === "") return;

        fetch('../api/v2/documents/'+props.id+'/comment?token='+token, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { commentText: comment } ),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                document.getElementById("textarea").value=""
                setComment("")
                setCommentArray(
                    <>
                        {commentArray}
                        <Message 
                            username={persona.username}
                            avatar={persona.avatar}
                            body={data.commentBody}
                            date={data.commentDate}
                            id={data.id}
                        />
                    </>
                )
                document.getElementById("bottom-of-comment-section").scrollIntoView();
            }
        })
    }

    const userId = JSON.parse(window.localStorage.getItem("user"))
    const [persona, setPersona] = useState({})

    
    useEffect(()=>{
        fetch("../api/v2/users/"+userId+"?token="+token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(swal(JSON.stringify(persona)))
    }, [])
    
    const label = "Lascia un commento come "+persona.username

    return (
        <>
            <Offcanvas show={props.chatShow} onHide={props.handleChatClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Commenti</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ overflowY:"scroll", overflowX:"hidden"}}>
            
                    {
                        props.comments.map((item)=>
                            <Message 
                                username={item.author.username}
                                avatar={item.author.avatar}
                                body={item.body}
                                date={item.date}
                                id={item.id}
                            />
                        )
                    }
                    {
                        commentArray
                    }
                    <span id="bottom-of-comment-section"></span>
                </Offcanvas.Body>
                <Form className="m-2" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingTextarea2" label={label}>
                        <Form.Control
                            id="textarea"
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            onChange={(e)=>setComment(e.target.value)}
                        />
                    </FloatingLabel>
                    <Button className="my-2" variant="primary" type="submit">
                        Pubblica
                    </Button>
                </Form>
            </Offcanvas>
        </>
    );
};

export default Chat;