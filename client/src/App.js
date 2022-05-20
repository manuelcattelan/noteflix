import React, { useState, useEffect} from 'react';
import {Route, BrowserRouter as Router, Routes } from "react-router-dom" //router
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import "./style/App.scss" //style
import "./style/Text.scss" //style for texts
import './style/theme.scss';  //light and dark theme for the app
import useLocalStorage from "./hooks/useLocalStorage";//hooks
import useThemeDetector from "./hooks/useThemeDetector";//hooks
import Console from './pages/Console';
import Library from './pages/Library';
import Main from './pages/Main';
import Platform from './pages/Platform';
import SignLog from './pages/SignLog';
import Upload from './pages/Upload';
import Policy from './pages/Policy';
import Document from './pages/Document';




function App() {

  //#############################
  //      Theme of the app           
  //#############################

  //setting as a default the one user have in system preferences
  const isDarkTheme = useThemeDetector();
  var defaultTheme;
  isDarkTheme ? defaultTheme="dark": defaultTheme="light"

  //setting theme as saved in local storage or default
  const [theme, setTheme] = useLocalStorage('theme', defaultTheme)
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }


  //#############################
  //      Auth Token           
  //#############################

  //controllo di avere un token salvato nel local storage
  const [token, setToken] =  useLocalStorage('token', "")
  //creo uno stato per conservare l'oggetto utente
  const [user, setUser] = useState()
 
  //creo uno stato per la pagina
  const [page, setPage] = useState(<Main theme={theme} setTheme={toggleTheme} token={token} user={user}/>)

  //manda il token all'api per verificarne la validità e ottenere un oggetto user con informazioni utili
  const fetchToken = () => {
      const url = "http://localhost:3001/api/v1/token/?token="+token
      fetch(url)
      .then(resp => resp.json())
      .then(data => {
          setUser(data)
          if(data.success === true){
              setPage(<Platform theme={theme} setTheme={toggleTheme} token={token} user={user}/>)
          }
      })
  }

  //esegue il fetch al caricamento dell'app e al cambiamento di token
  useEffect(() => fetchToken, [token]);




  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>

          {/* carica una pagina a "/" a seconda se l'utente è loggato o meno */}
          <Route path='/' exact element={page} />

          {/* pagine accessibili da tutti (anche non loggati) */}
          <Route path='/signlog' exact element={<SignLog theme={theme} setTheme={toggleTheme} token={token} setToken={setToken} setPage={setPage}/>} />
          <Route path='/policy'  exact element={<Policy  theme={theme} setTheme={toggleTheme}/>} />
          
          {/* pagine accessibili solo sotto verifica utente loggato (hanno la props user) */}
          <Route path='/library'  exact element={<Library  user={user} token={token} theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/console'  exact element={<Console  user={user} token={token} theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/upload'   exact element={<Upload   user={user} token={token} theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/document' exact element={<Document user={user} token={token} theme={theme} setTheme={toggleTheme}/>} />


          {/* <Route render={() => <PageNotFound />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
