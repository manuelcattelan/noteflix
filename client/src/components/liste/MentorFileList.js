import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MentorFileItem from './MentorFileItem';

const MentorFileList = ({docArray, token}) => {
    return (

            <ListGroup as="ol" numbered>
                {
                    docArray
                    ?
                    docArray.map((item) =>
                        <MentorFileItem
                            id={item._id}
                            title={item.title}
                            status={item.status}
                            like={item.approval}
                            votes={item.totalVotes}
                            comments={item.totalComments}
                            token={token}
                        />
                    )
                    :
                    <Container className="mt-5">
                        <p className='text-center h1 fw-bold'>
                            Nessun documento caricato, <br/> 
                            <Link to="/upload">
                                <span className='text-primary'> caricane uno.</span>
                            </Link>
                        </p>

                    </Container>
                    
                }
            </ListGroup>

    );
};

export default MentorFileList;