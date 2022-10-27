import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChallengeContextProvider} from './context/ChallengeContext';
import { AuthContextProvider } from './context/AuthContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthContextProvider>
    <ChallengeContextProvider> 
      <App />
    </ChallengeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


