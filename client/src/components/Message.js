import React from 'react';
import { Toast } from 'react-bootstrap';
import Avatar from 'react-nice-avatar'

//const config = genConfig(AvatarConfig);
    

const Message = ({username, avatar, body, date}) => {

    const data = new Date(date)

    return (
        <>
            <Toast className="d-inline-block m-1" bg="light">
                <Toast.Header closeButton={false}>
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