import { Offcanvas, Button, Form, FloatingLabel } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Message from './Message';


const Chat = (props) => {

  

    return (
        <>
            <Offcanvas show={props.chatShow} onHide={props.handleChatClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Commenti</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ overflowY:"scroll", backgroundColor:"#f6f0fa"}}>
            
                    {
                        props.comments.map((item)=>
                            <Message 
                                username={item.author.username}
                                avatar={item.author.avatar}
                                body={item.body}
                                date={item.date}
                            />
                        )
                    }
            
                    
                </Offcanvas.Body>
                <Form className="m-2" >
                    <FloatingLabel controlId="floatingTextarea2" label="Lascia un commento">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <Button className="my-2" variant="primary" type="submit">
                        Pubblica il commento
                    </Button>
                </Form>
            </Offcanvas>
        </>
    );
};

export default Chat;