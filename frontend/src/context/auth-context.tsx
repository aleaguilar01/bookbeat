import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IUser {
  name?: string,
  email: string,
  profile_picture?: string,
  provider_id?: string,
  token?: string
}
interface IAuth {
  user?: IUser,
  login: (user?:IUser) => void,
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
  const login = async (userData) => {
    setLoading(true)
    try {
      const response = await axios.post('user-auth', userData, { baseURL: 'http://localhost:3000/' });
      const userComplete = { ...userData, token: response.data.token };
      setUser(userComplete);
      localStorage.setItem("user", JSON.stringify(userComplete));
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