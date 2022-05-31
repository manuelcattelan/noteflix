import React, { useState, useEffect} from 'react';
import {Route, BrowserRouter as Router, Routes } from "react-router-dom" //router
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import "./style/App.scss" //style
import "./style/Text.scss" //style for texts
import useLocalStorage from "./hooks/useLocalStorage";//hooks
import MentorConsole from './pages/MentorConsole';
import Library from './pages/Library';
import Main from './pages/Main';
import Platform from './pages/Platform';
import SignLog from './pages/SignLog';
import Upload from './pages/Upload';
import Policy from './pages/Policy';
import Document from './pages/Document';
import MentorWannaBe from './pages/MentorWannaBe';
import Test from './pages/Test';
import ModeratorConsole from './pages/ModeratorConsole';



function App() {

  const [navbar, setNavbar] = useState("visitor")                                           // la navbar potrà essere visitatore, user, moderator, mentor
  const [token, setToken] =  useLocalStorage('token', "")                                   //controllo di avere un token salvato nel local storage
  const [user, setUser] = useLocalStorage('user', "")                                       //creo uno stato per conservare l'oggetto utente
  const [page, setPage] = useState(<Main token={token}   navbar="visitatore"/>)             //creo uno stato per la pagina principale


  useEffect(() => {
    fetch("http://localhost:3001/api/v1/token/?token="+token)
    .then(resp => resp.json())
    .then(data => {
      setUser(data.tokenData.id)
      if(data.success === true){

        switch(data.tokenData.type) {
          case "mentor":
            setNavbar("mentor")
            setPage(<Platform token={token}   navbar="mentor"/>)
            break;
          case "moderator":
            setNavbar("moderator")
            setPage(<Platform token={token}   navbar="moderator"/>)
            break;
          case "user":
            setNavbar("user")
            setPage(<Platform token={token}   navbar="user"/>)
            break;
          default:
            setNavbar("user")
            setPage(<Platform token={token}   navbar="user"/>)
        }
        
      }
    })
  }, [""]);

  return (
    <div  className="App">
      <Router>
        <Routes>

          
          
          {/* carica una pagina a "/" a seconda se l'utente è loggato o meno */}
          <Route path='/' exact element={page} />


          <Route path='/test' exact element={<Test/>} />


          {/* pagine accessibili da tutti (anche non loggati) */}
          <Route path='/signlog'        exact element={<SignLog token={token} setToken={setToken} setPage={setPage}  setUser={setUser} /*qui il set user è necessario*/ navbar={navbar} setNavbar={setNavbar}/>} />
          <Route path='/policy'         exact element={<Policy  navbar={navbar}/>} />
          <Route path='/mentorwannabe'  exact element={<MentorWannaBe token={token} navbar={navbar}/>} />
          
          {/* pagine accessibili solo sotto verifica utente loggato (hanno la props user) */}
          <Route path='/library'           exact element={<Library           token={token} navbar={navbar}/>} />
          <Route path='/mentorconsole'     exact element={<MentorConsole     token={token} navbar={navbar}/>} />
          <Route path='/moderatorconsole'  exact element={<ModeratorConsole  token={token} navbar={navbar}/>} />
          <Route path='/upload'            exact element={<Upload            token={token} navbar={navbar}/>} />
          <Route path='/document'          exact element={<Document          token={token} navbar={navbar}/>} />

          {/* <Route render={() => <PageNotFound />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
