import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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
  logout: () => void
}

const AuthContext = createContext<IAuth>({user: undefined, login: ()=>{}, logout: ()=>{}})

const AuthProvider = ({children}) => {
  const [user, setUser] = useState <IUser | undefined>()
  const login = async (userData) => {
    await axios.post('user-auth', userData, {baseURL: 'http://localhost:3000/',})
      .then(res => {
        console.log(res)
        Promise.all([
          setUser({...userData, token: res.data.token}),
          localStorage.setItem("token", res.data.token)
        ])
      })
    
  }
  const logout = () => {
    setUser(undefined);
    localStorage.clear()
  }
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider;