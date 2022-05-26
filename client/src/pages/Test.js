import React from 'react';
import MentorNav from '../navbars/MentorNav';
import ModeratorNav from '../navbars/ModeratorNav';
import UserNav from '../navbars/UserNav';
import VisitorNav from '../navbars/VisitorNav';

const Test = () => {
    return (
        <>
            <UserNav/>
            <MentorNav/>
            <ModeratorNav/>
            <VisitorNav/>
        </>
    );
};

export default Test;