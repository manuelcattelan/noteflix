import React from 'react';
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
import DocPage from './pages/DocPage';
import Document from './pages/Document';
import Homepage from './pages/Homepage';




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
  const [token, setToken] =  useLocalStorage('token', "")
    




  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Main theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/platform' exact element={<Platform theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/signlog' exact element={<SignLog theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/library' exact element={<Library theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/console' exact element={<Console theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/upload' exact element={<Upload theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/policy' exact element={<Policy theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/docpage' exact element={<DocPage theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/document' exact element={<Document theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          <Route path='/homepage' exact element={<Homepage theme={theme} setTheme={toggleTheme} token={token} setToken={setToken}/>} />
          {/* <Route render={() => <PageNotFound />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
