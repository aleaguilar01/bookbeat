import React, { createContext, useContext, useState } from 'react';

interface IUser {
  name?: string,
  email: string,
  profile_picture?: string,
}
interface IAuth {
  user?: IUser,
  setUser: (user?:IUser) => void
}

const AuthContext = createContext<IAuth>({user: undefined, setUser: ()=>{}})

const AuthProvider = ({children}) => {
  const [user, setUser] = useState <IUser | undefined>()
  return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider;