import express from "express";


import { getMusicHome, loginWithSpotify, handleSpotifyCallback, handleSpotifyPlaylists, handleSpotifyRefreshToken, getMusicRouteIndexPage } from '../controllers/musicController';  // Import the controller


const router = express.Router();

router.get('/', getMusicHome);
router.get('/login', loginWithSpotify);
router.get('/callback', handleSpotifyCallback);
router.get('/refresh-token', handleSpotifyRefreshToken);
router.get('/index-page', getMusicRouteIndexPage);

router.get('/playlists', handleSpotifyPlaylists);



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
