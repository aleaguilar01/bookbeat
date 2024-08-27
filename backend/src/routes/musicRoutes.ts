import express from "express";


import { handleSpotifyPlaylists, handleSpotifyRefreshToken, handleSpotifySearch } from '../controllers/musicController';  // Import the controller
// getMusicHome, loginWithSpotify, handleSpotifyCallback, getMusicRouteIndexPage

const router = express.Router();

// router.get('/', getMusicHome);
// router.get('/login', loginWithSpotify);
// router.get('/callback', handleSpotifyCallback);
router.get('/refresh-token', handleSpotifyRefreshToken);
// router.get('/index-page', getMusicRouteIndexPage);

router.get('/playlists', handleSpotifyPlaylists);
router.get('/search', handleSpotifySearch)

export default router;
