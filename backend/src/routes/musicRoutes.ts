import express, { Express, Request, Response } from "express";
import session from 'express-session';
import axios from 'axios';
// import { getBook } from "../controllers/booksController";
import dotenv from "dotenv";

dotenv.config();

/////////// Express Session
// types/express-session.d.ts
// import session from 'express-session';
declare module 'express-session' {
  interface SessionData {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}


///////////////

const router = express.Router();

const SESSION_SECRET: any = process.env.SESSION_SECRET || ''
// Initialize session middleware
router.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

router.get('/test', (req: Request, res: Response) => {
  res.send('Test route is working');
});


const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI: string = 'http://localhost:3000/callback';

const AUTH_URL: string = 'https://accounts.spotify.com/authorize';
const TOKEN_URL: string = 'https://accounts.spotify.com/api/token';
const API_BASE_URL: string = 'https://api.spotify.com/v1/';




router.get('/music', (req: Request, res: Response) => {
  console.log('Accessing /music route');

  res.send("Welcome to my Spotify App <a href='/login'>Login With Spotify</a>")
})

router.get('/music/login', (req: Request, res: Response) => {
  console.log('Accessing /music/login route');

  interface SpotifyAuthParams {
    client_id: string;
    response_type: string;
    scope: string;
    redirect_uri: string;
    show_dialog: boolean
  }
  const scope: string = "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private";

  const params: SpotifyAuthParams = {
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    scope: scope,
    redirect_uri: REDIRECT_URI,
    show_dialog: true // set to true for testing
  };

  // Create a URLSearchParams instance with the params object
  const urlParams = new URLSearchParams(params as any)
  // Construct the final auth_url
  const auth_url: string = `${AUTH_URL}?${urlParams.toString()}`;

  res.redirect(auth_url)
  
});

router.get('/music/callback')

// @app.route('/callback')
//   def callback()
//     if 'error' in request.args:
//       return jsonify({"error": request.args['error']})
    
//     if 'code' in request.args
//       req_body = {
//         'code': request.args['code'],
//         'grant_type': 'authorization_code',
//         'redirect_uri': REDIRECT_URI,
//         'client_id': SPOTIFY_CLIENT_ID,
//         'client_secret': SPOTIFY_CLIENT_SECRET
//       }

//       response = requests.post(TOKEN_URL, data=req_body)
//       token_info = response.json()


  router.get('/music/callback', async (req: Request, res: Response) => {
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
        const response = await axios.post(TOKEN_URL, new URLSearchParams(reqBody).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const tokenInfo = response.data;
        // return res.json(tokenInfo);

        // Save token info to session
        req.session.access_token = tokenInfo.access_token;
        req.session.refresh_token = tokenInfo.refresh_token;
        req.session.expires_at = Date.now() + (tokenInfo.expires_in * 1000); // Convert seconds to milliseconds

        return res.redirect('/playlists');

      } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve access token'});
      }
    }

    return res.status(400).json({ error: "No code provided" })
  })

  router.get('/music/playlists', async (req: Request, res: Response) => {
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
      const response = await axios.get(`${API_BASE_URL}/me/playlists`, { headers });
  
      const playlists = response.data;
  
      // Return playlists as JSON
      return res.json(playlists);
  
    } catch (error) {
      // Handle API request errors
      return res.status(500).json({ error: 'Failed to retrieve playlists' });
    }
  });

  router.get('/music/refresh-token', async (req: Request, res: Response) => {
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
  });

  
  // export default router;

// router.get("/:title", getBook);

export default router;

// @app.route('/playlists')
//   def get_playlists();
//     if 'access_token' not in session
//       return redirect('/login')

//     if datetime.now().timestamp > session['expires_at']:
//       return redirect('/refresh-token')

//     headers = {
//       'Authorization': f"Bearer {session['access_token']}"
//     }

//     response = requests.get(API_BASE_URL + '/me/playlists', headers=headers)
//     playlists = response.json()

//     return jsonify(playlists)



// @app.route('/refresh-token')
//     def refresh_token():
//       if 'refresh-token' not in session
//         return redirect('/login')
//       if datetime.now().timestamp > session['expires_at']:
//         req_body = {
//           'grant_type': 'refresh_token',
//           'refresh-token': session['refresh-token'],
//           'client_id': SPOTIFY_CLIENT_ID,
//           'client_secret': SPOTIFY_CLIENT_SECRET
//         }

//       response = request.post(TOKEN_URL, data=req_body)
//       new_token_info['expires_in']
//       new_token_info = response.json()

//       session['access_token'] = new_token_info['access_token']
//       session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

//       return redirect('/playlists')

// if __name__ = '__musicRoutes__'
//   app.run(host='0.0.0.0', debug=True)
