import React, { createContext, useContext, useState } from 'react';
import AuthProvider from './context/auth-context'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Outlet, Navigate} from "react-router-dom";
import PrivateRoute from './views/AuthViews/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginScreen from './views/LoginScreen/LoginScreen';


function App() {
  //@ts-ignore
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
  return (
    <AuthProvider>
      <GoogleOAuthProvider 
      //@ts-ignore
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
        <Routes>
            <Route path='login' element={<LoginScreen /> } />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<HomeScreen /> } />
            </Route>
        </Routes>
      </Router>
      </GoogleOAuthProvider>;
      
      </AuthProvider>
  )
}

export default App



const HomeScreen = () => {
  return <>This is Home </>
}


