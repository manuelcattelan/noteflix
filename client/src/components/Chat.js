import { Offcanvas, Button } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Message from './Message';


const Chat = (props) => {

  

    return (
        <>
            <Offcanvas show={props.chatShow} onHide={props.handleChatClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Commenti</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
            
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
            </Offcanvas>
        </>
    );
};

export default Chat;