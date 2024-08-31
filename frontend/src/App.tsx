import AuthProvider from "./context/auth-context";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./views/AuthViews/PrivateRoute";
import LoginScreen from "./views/LoginScreen/LoginScreen";
import MusicDashboard from "./views/MusicViews/MusicDashboard";
import HomeScreen from "./views/AuthViews/HomeScreen";
import MyBooksScreen from "./views/AuthViews/MyBooksScreen";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Slminoel",
          fontSize: 18,
          colorPrimary: "#FF8343",
          colorFillSecondary: "#179BAE",
          colorPrimaryBg: "#4158A6",
          
        },
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginScreen />} />
            <Route element={<PrivateRoute />}>
              <Route path="/music-dashboard" element={<MusicDashboard />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/books" element={<MyBooksScreen />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
