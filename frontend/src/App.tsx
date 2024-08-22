import AuthProvider from "./context/auth-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./views/AuthViews/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginScreen from "./views/LoginScreen/LoginScreen";
import HomeScreen from "./views/AuthViews/HomeScreen";

function App() {
  //@ts-ignore
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  return (
    <Router>
      <AuthProvider>
        <GoogleOAuthProvider
          //@ts-ignore
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        >
          <Routes>
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
