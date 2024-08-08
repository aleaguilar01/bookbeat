import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { Outlet, Navigate} from "react-router-dom";


const PrivateRoute = () =>{
  const { user } = useAuth()
  return(
        user ? <Outlet /> : <Navigate to="login" />
      )
}

export default PrivateRoute;