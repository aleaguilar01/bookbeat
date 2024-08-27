 import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams()

  
// Handle the login route. 
// Redirects the user to Spotify's authorization page with required scopes.
// const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_ID: string = "b6ffe68f5c8649f38b7a7da32c0fb225" || '';

// const REDIRECT_URI: string = 'http://localhost:3000/music/callback';
const REDIRECT_URI: string = 'http://localhost:5173/login';

const AUTH_URL: string = 'https://accounts.spotify.com/authorize';


useEffect(() => {
  // Retrieving code from search params
  setSearchParams(window.location.hash);
  

  // http://localhost:5173/login?code=AQBUaxGMNC2ajp2OS9FN7La0Ji3oPeKQEMlWvQr4ZMz02X44Hj0QIbNpr0VMcVVKEnYQkDkFlOJNSInpWYPrNKX8NfIoXvB-ecxeOymG-sy6DBxiZNBp-VlxvDzowkFb5zddNzsZmqKo7P5Rx4z87ZFtWPeHMiwowZjnZ9kAF-imMUPKl71tWCMuW8Heg1C4vOk3rpHAh92cM5d9FzSv9rwB9ojH_N99XaPxP4a3RyKPzY1aKiFSmHtfrW9RggZJ6sxLZher8Gqrl4rKcFrMRWo99T_1m8btD2l7s5GrNl-WDAm_NtG-YtpinQ
  
}, []);

useEffect(() => {
  if (searchParams.get('code')) {
    login(searchParams.get('code'));
  }
}, [searchParams]);
    

    const scope: string = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-library-modify user-library-read";

    const params = {
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      scope: scope,
      redirect_uri: REDIRECT_URI,
      show_dialog: true // set to true for testing
    };

    const urlParams = new URLSearchParams(params as any);
    
    const auth_url: string = `${AUTH_URL}?${urlParams.toString()}`;

    // Redirect the user to Spotify's authentication page
    
  

  return (
    <div>
     <a href={auth_url} >Login With Spotify</a>
      
    </div>
  );
};

export default LoginScreen;
