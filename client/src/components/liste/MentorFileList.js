import React from 'react';
import { ListGroup } from 'react-bootstrap';
import MentorFileItem from './MentorFileItem';

const MentorFileList = () => {
    return (

            <ListGroup as="ol" numbered>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
                <MentorFileItem/>
            </ListGroup>

    );
};

export default MentorFileList;