import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/Custom.scss' //customization of bootstrap colors
import logolight from "./media/logolight.svg"

/*// CUSTOM ALERTS
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ToastContainer, Toast } from 'react-bootstrap';
const options = {
  position: positions.TOP_CENTER,
  timeout: 2500,
  offset: '30px',
  transition: transitions.SCALE
}
const Notifica = ({ message, close }) => {
  return (
    <ToastContainer className="p-3" style={{zIndex:"200"}}>
        <Toast onClose={close} variant="light">
            <Toast.Header>
                <img
                    src={logolight}
                    style={{height:"1rem"}}
                    className="me-auto"
                    alt=""
                />
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    </ToastContainer>
  );
};*/



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
