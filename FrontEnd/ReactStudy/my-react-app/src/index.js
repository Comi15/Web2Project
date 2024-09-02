import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Routes,Route,createBrowserRouter,
  createRoutesFromElements,RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(createRoutesFromElements(<Route path='*' element={<App />} />));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="139978929335-8cgbgav1hp23639k8p984kh6h64mm01d.apps.googleusercontent.com">
    <AuthProvider>
    <RouterProvider router={router} />
      </AuthProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

