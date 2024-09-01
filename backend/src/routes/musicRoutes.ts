import express from "express";


import { handleSpotifyPlaylistSearch, handleSpotifyPlaylists, handleSpotifyRefreshToken, handleSpotifySearch, getFavoritedPlaylistsByBook, createPlaylist, updateMyPlaylists} from '../controllers/musicController';  // Import the controller
// getMusicHome, loginWithSpotify, handleSpotifyCallback, getMusicRouteIndexPage

const router = express.Router();

// router.get('/', getMusicHome);
// router.get('/login', loginWithSpotify);
// router.get('/callback', handleSpotifyCallback);
// router.get('/index-page', getMusicRouteIndexPage);


// Spotify API Routes

router.get('/refresh-token', handleSpotifyRefreshToken);

router.get('/playlists', handleSpotifyPlaylists);
router.get('/search', handleSpotifySearch)
router.get('/playlist-search', handleSpotifyPlaylistSearch)

// Application Specific Routes
router.get('/my-playlists/favorites/:bookId', getFavoritedPlaylistsByBook);
router.post("/my-playlists", createPlaylist);
router.put("/my-playlists", updateMyPlaylists);


export default router;
