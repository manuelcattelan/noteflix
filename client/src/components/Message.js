import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar'

//const config = genConfig(AvatarConfig);
    

const Message = ({username, avatar, body, date}) => {

    const data = new Date(date)

    return (
        <>
            <Row className='me-1 mb-2'>
                    <Col xs="auto" className='d-flex justify-content-center pt-1'>
                        <Avatar style={{ width: '3rem', height: '3rem' }} {...avatar} />
                    </Col> 
                    <Col className='pt-2' style={{border: "1px solid #EAD6FF", borderRadius: "13px", width:"fit-content"}}>
                        <p className="fw-bold mb-0">
                                {username}
                        </p>
                        <span className="fs-7 doc-descrizione">
                            
                            {body}
                            <br/>
                            <span className="text-secondary data">
                                { data.toLocaleString()}
                            </span>
                        </span>
                        
                    </Col>
            </Row> 
        </>
    );
};

export default Message;