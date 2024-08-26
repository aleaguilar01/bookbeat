import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IUser {
  name?: string,
  email: string,
  profile_picture?: string,
  provider_id?: string,
  token?: string
  spotifyToken: any
}
interface IAuth {
  user?: IUser,
  login: (code?: string) => void,
  logout: () => void,
  loading: boolean
}

const AuthContext = createContext<IAuth>({user: undefined, login: ()=>{}, logout: ()=>{}, loading: true})

const AuthProvider = ({children}) => {
  const [user, setUser] = useState <IUser | undefined>()
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getSavedUser = async () =>{
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate("/")
    }
  }
  useEffect(()=>{
    getSavedUser().then(()=>{
      setLoading(false)
    })
  },[])
  const login = async (code) => {
    setLoading(true)
    try {
      const response = await axios.get('/user-auth', { baseURL: 'http://localhost:3000/', params: {code} });
      
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate('/'); // Redirect to homepage or desired route after login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
    
  }
  const logout = () => {
    setUser(undefined);
    localStorage.clear()
    navigate('/login'); 
  }
  return <AuthContext.Provider value={{user, login, logout, loading}}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider;