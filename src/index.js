import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import b2cauth from 'react-azure-adb2c';

b2cauth.initialize({
  instance: 'https://login.microsoftonline.com/tfp/', 
  tenant: 'lyricdev.onmicrosoft.com',
  signInPolicy: 'B2C_1_signinandsignup_Example',
  applicationId: 'ca3c2646-c780-426a-ab58-240676751bd4',
  cacheLocation: 'sessionStorage',
  scopes: ['https://lyricdev.onmicrosoft.com/api/user_impersonation'],
  redirectUri: 'https://reactclientlms.azurewebsites.net/',
  //redirectUri: 'http://localhost:3000/',
  postLogoutRedirectUri: window.location.origin,
});

b2cauth.run(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
