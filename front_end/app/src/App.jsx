import { createContext, useContext, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Outlet, Navigate} from "react-router-dom";


// other file
const AuthContext = createContext()



function App() {
  const [user, setUser] = useState()
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
            <Route path='login' element={<LoginScreen /> } />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<HomeScreen /> } />
              <Route path='contact' element={<ContactScreen />} />
              <Route path='other/:id' element={<OtherScreen /> } />
            </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App



const PrivateRoute = () =>{
  const { user } = useContext(AuthContext)
  return(
        user ? <Outlet /> : <Navigate to="login" />
      )
}

const LoginScreen = () =>{
  const { setUser } = useContext(AuthContext)
  const [loginName, setLoginName] = useState("")
  const navigate = useNavigate()

  const handleOnClick = ()=>{ 
    setUser(loginName)
    navigate("/")
  }  
  return <div>Login Page <input onChange={(event) => {setLoginName(event.target.value)}} value={loginName}></input><button onClick={handleOnClick}>Sign In</button></div>
}


// file 

const HomeScreen = () => {
  return <>This is Home <HomeChild /></>
}

// other file as well
const HomeChild = () =>{
  const {user} = useContext(AuthContext);
  return <>{user}</>
}


const ContactScreen = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleOnClick = () =>{
    setUser("Monica")
    navigate("/ ")
  }
  return <>This is Contact: {user} <button onClick={handleOnClick}>Click me to change name</button></>
}

const OtherScreen = () => {
  const {id} = useParams()

  const navigate = useNavigate();
  
  
  const goToHomePage = () =>{
    navigate("/")
  }
  return <>This is Other: {id} <button onClick={goToHomePage}>Home Page</button></>
}

