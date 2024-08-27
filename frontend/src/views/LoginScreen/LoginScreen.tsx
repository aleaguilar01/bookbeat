import { Button, Image } from "antd";
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const logoUrl = new URL("../../../logo.jpeg", import.meta.url).href;

const SPOTIFY_CLIENT_ID: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
const REDIRECT_URI: string = "http://localhost:5173/login";
const AUTH_URL: string = "https://accounts.spotify.com/authorize";
const SCOPE: string =
  "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-library-modify user-library-read";

const LoginScreen = () => {
  const { login } = useAuth();

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Retrieving code from search params
    setSearchParams(window.location.hash);
  }, []);

  useEffect(() => {
    if (searchParams.get("code")) {
      login(searchParams.get("code"));
    }
  }, [searchParams]);

  const params = {
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    show_dialog: true, // set to true for testing
  };

  const urlParams = new URLSearchParams(params as any);

  const auth_url: string = `${AUTH_URL}?${urlParams.toString()}`;

  // Redirect the user to Spotify's authentication page

  return (
    <div>
      <Image src={logoUrl} alt="logo" style={{ height: 300 }} />
      <Button
        style={{ backgroundColor: "purple", color: "white" }}
        href={auth_url}
        shape="round"
        size="large"
      >
        Login With Spotify
      </Button>
    </div>
  );
};

export default LoginScreen;
