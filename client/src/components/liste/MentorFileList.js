import React from 'react';
import { ListGroup } from 'react-bootstrap';
import MentorFileItem from './MentorFileItem';

const MentorFileList = ({docArray}) => {
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
                            comments={item.totalComments}
                        />
                    )
                    :
                    "no doc"
                }
            </ListGroup>

    );
};

export default MentorFileList;