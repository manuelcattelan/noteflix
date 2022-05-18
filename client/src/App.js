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






  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Main theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/platform' exact element={<Platform theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/signlog' exact element={<SignLog theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/library' exact element={<Library theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/console' exact element={<Console theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/upload' exact element={<Upload theme={theme} setTheme={toggleTheme}/>} />
          <Route path='/policy' exact element={<Policy theme={theme} setTheme={toggleTheme}/>} />
          {/* <Route render={() => <PageNotFound />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
