import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../navbars/UserNav';
import ModeratorNav from '../navbars/ModeratorNav';
import MentorNav from '../navbars/MentorNav';
import VisitorNav from '../navbars/VisitorNav';

const Navigation = (props) => {

    //Gestione del logout dalla navbar
    const navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("persona")
        navigate("/")
        window.location.reload(false)
    }

    //scelta della navbar a seconda dell'utente
    switch(props.navbar){
        case "user":       return (<UserNav       handleLogout={handleLogout}/>)        
        case "moderator":  return (<ModeratorNav  handleLogout={handleLogout}/>)   
        case "mentor":     return (<MentorNav     handleLogout={handleLogout}/>)    
        default:           return (<VisitorNav    handleLogout={handleLogout}/>) 
    }
  
};

export default Navigation;