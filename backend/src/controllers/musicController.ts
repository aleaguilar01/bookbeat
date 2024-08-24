
import { Request, Response } from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();



const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI: string = 'http://localhost:3000/music/callback';

const AUTH_URL: string = 'https://accounts.spotify.com/authorize';
const TOKEN_URL: string = 'https://accounts.spotify.com/api/token';
const API_BASE_URL: string = 'https://api.spotify.com/v1/';



///////// 
// Express Session: Tried and failed to move to utils/express-session.d.ts
// Extends express-session's SessionData interface to include custom properties
declare module 'express-session' {
  interface SessionData {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

// Extends Express's Request interface to include the session with custom properties
declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
/////


///// Music Controllers /////


// Handle the root path of /music.
// Renders the home page with a login link.
export const getMusicHome = (req: Request, res: Response) => {
  console.log('Accessing /music route');  

  res.send("Welcome to my Spotify App <a href='/music/login'>Login With Spotify</a>");
};


// Handle the login route. 
// Redirects the user to Spotify's authorization page with required scopes.
export const loginWithSpotify = (req: Request, res: Response) => {
  console.log('Accessing /music/login route');  // Log when the route is accessed

  const scope: string = "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private";

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
  res.redirect(auth_url);
};


// Handle Callback route
// Exchanges the authorization code for tokens, and saves them in the session.

export const handleSpotifyCallback = async (req: Request, res: Response) => {
  const { error, code } = req.query;

  if (error) {
    return res.json({ error });
  }

  if (code) {
    const reqBody = {
      code: code as string,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    };

    try {
      // Make a POST request to the Spotify token endpoint to exchange the authorization code for an access token
      const response = await axios.post(TOKEN_URL, new URLSearchParams(reqBody).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Extract token information from the response
      const tokenInfo = response.data;
      

      // Save token info to session
      req.session.access_token = tokenInfo.access_token;
      req.session.refresh_token = tokenInfo.refresh_token;
      req.session.expires_at = Date.now() + (tokenInfo.expires_in * 1000); // Convert seconds to milliseconds

      // Redirect the user to the playlists page to display their Spotify playlists
      return res.redirect('/music/playlists');

    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve access token'});
    }
  }

  return res.status(400).json({ error: "No code provided" })
}


// Handle request for Spotify Playlists
// Checks if the access token is valid and retrieves the user's playlists from Spotify.

export const handleSpotifyPlaylists = async (req: Request, res: Response) => {
  // Check if access_token is in session
  if (!req.session.access_token) {
    return res.redirect('/login');
  }

  // Check if the access token is expired or if expires_at is undefined
if (!req.session.expires_at || Date.now() > req.session.expires_at) {
  return res.redirect('/refresh-token');
}

  try {
    // Set up headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${req.session.access_token}`
    };

    // Make the API call to get playlists
    const response = await axios.get(`${API_BASE_URL}me/playlists`, { headers });

    const playlists = response.data;

    // Return playlists as JSON
    return res.json(playlists);

  } catch (error: unknown) {
    
      // Narrow down the error type
  if (axios.isAxiosError(error)) {
    // Axios-specific error handling
    console.error('Axios error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ 
      error: 'Failed to retrieve playlists', 
      details: error.response ? error.response.data : error.message 
    });
  } else if (error instanceof Error) {
    // General error handling
    console.error('General error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to retrieve playlists', 
      details: error.message 
    });
  } else {
    // Unknown error type
    console.error('Unknown error:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve playlists', 
      details: 'An unknown error occurred' 
    });
  }

    
  }
};


// Handle Spotify Refresh Token
// Refreshes the access token using the refresh token if the current token has expired.
export const handleSpotifyRefreshToken = async (req: Request, res: Response) => {
  // Check if refresh_token is in session
  if (!req.session.refresh_token) {
    return res.redirect('/login');
  }

  // Check if the token is expired
  if (!req.session.expires_at || Date.now() > req.session.expires_at) {
    const reqBody = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: req.session.refresh_token,
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
    });

    try {
      const response = await axios.post(TOKEN_URL, reqBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const newTokenInfo = response.data;

      // Update session with new token and expiry time
      req.session.access_token = newTokenInfo.access_token;
      req.session.expires_at = Date.now() + newTokenInfo.expires_in * 1000; // Convert expires_in to milliseconds

      return res.redirect('/playlists');
    } catch (error) {
      return res.status(500).json({ error: 'Failed to refresh token' });
    }
  } else {
    return res.redirect('/playlists');
  }
};