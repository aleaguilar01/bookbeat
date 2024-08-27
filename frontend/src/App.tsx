import AuthProvider from './context/auth-context'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './views/AuthViews/PrivateRoute';
import LoginScreen from './views/LoginScreen/LoginScreen';
import MusicDashboard from './views/MusicViews/MusicDashboard';
import HomeScreen from "./views/AuthViews/HomeScreen";

function App() {
  return (

    <Router>
      <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginScreen />} />
            <Route element={<PrivateRoute />}>
              <Route path='/music-dashboard' element={<MusicDashboard /> } />
              <Route path="/" element={<HomeScreen />} />
            </Route>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
