import React, { createContext, useContext, useState } from 'react';
import AuthProvider from './context/auth-context'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Outlet, Navigate} from "react-router-dom";
import PrivateRoute from './views/AuthViews/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginScreen from './views/LoginScreen/LoginScreen';
import MusicDashboard from './views/MusicViews/MusicDashboard';
import HomeScreen from "./views/AuthViews/HomeScreen";

function App() {
  return (

    <Router>
      <AuthProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        >
          <Routes>
          <Route path='/music-dashboard' element={<MusicDashboard /> } />
            <Route path="login" element={<LoginScreen />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomeScreen />} />
            </Route>
          </Routes>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
