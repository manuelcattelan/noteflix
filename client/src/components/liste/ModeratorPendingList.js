import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ModeratorPendingItem from './ModeratorPendingItem';

const ModeratorPendingList = () => {
    return (
        <ListGroup as="ol" numbered>
            <ModeratorPendingItem/>
            <ModeratorPendingItem/>
            <ModeratorPendingItem/>
            <ModeratorPendingItem/>
        </ListGroup>
    );
};

export default ModeratorPendingList;