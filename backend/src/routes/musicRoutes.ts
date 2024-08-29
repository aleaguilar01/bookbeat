import express from "express";


import { handleSpotifyPlaylistSearch, handleSpotifyPlaylists, handleSpotifyRefreshToken, handleSpotifySearch } from '../controllers/musicController';  // Import the controller
// getMusicHome, loginWithSpotify, handleSpotifyCallback, getMusicRouteIndexPage

const router = express.Router();

// router.get('/', getMusicHome);
// router.get('/login', loginWithSpotify);
// router.get('/callback', handleSpotifyCallback);
router.get('/refresh-token', handleSpotifyRefreshToken);
// router.get('/index-page', getMusicRouteIndexPage);

router.get('/playlists', handleSpotifyPlaylists);
router.get('/search', handleSpotifySearch)
router.get('/playlist-search', handleSpotifyPlaylistSearch)

export default router;
