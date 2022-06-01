import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../navbars/UserNav';
import ModeratorNav from '../navbars/ModeratorNav';
import MentorNav from '../navbars/MentorNav';
import VisitorNav from '../navbars/VisitorNav';

const Navigation = (props) => {

  
    const navigate = useNavigate(); //navigate nel caso di logout
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
        window.location.reload(false)
    }

    const userId = JSON.parse(window.localStorage.getItem("user"))
    const [persona, setPersona] = useState({})
    useEffect(()=>{
        fetch("http://localhost:3001/api/v1/users/"+userId+"?token="+props.token)
        .then(resp => resp.json())
        .then(data => setPersona(data))
        // .then(alert(JSON.stringify(persona)))
    }, [""])
       
    switch(props.navbar){
        case "user":       return (<UserNav       handleLogout={handleLogout} persona={persona}/>)        
        case "moderator":  return (<ModeratorNav  handleLogout={handleLogout} persona={persona}/>)   
        case "mentor":     return (<MentorNav     handleLogout={handleLogout} persona={persona}/>)    
        default:           return (<VisitorNav    handleLogout={handleLogout}/>) 
    }
  
};

export default Navigation;