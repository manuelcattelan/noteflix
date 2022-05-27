import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ModeratorReportedItem from './ModeratorReportedItem';

const ModeratorReportedList = () => {
    return (
        <ListGroup as="ol" numbered>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
            <ModeratorReportedItem/>
        </ListGroup>
    );
};

export default ModeratorReportedList;