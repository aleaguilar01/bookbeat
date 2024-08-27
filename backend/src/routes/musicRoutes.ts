import express from "express";


import { getMusicHome, handleSpotifyPlaylists, handleSpotifyRefreshToken, getMusicRouteIndexPage, handleSpotifySearch } from '../controllers/musicController';  // Import the controller


const router = express.Router();

router.get('/', getMusicHome);
router.get('/refresh-token', handleSpotifyRefreshToken);
router.get('/index-page', getMusicRouteIndexPage);

router.get('/playlists', handleSpotifyPlaylists);
router.get('/search', handleSpotifySearch)

export default router;
