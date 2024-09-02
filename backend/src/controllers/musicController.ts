
import { Request, Response } from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from "dotenv";
import { redisClient } from "../lib/redisClient";
import { prisma } from "../lib/prismaClient";

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

///// Authentication ///////////

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


///// Music Controllers /////


// Handle the root path of /music.
// Renders the home page with a login link.
// export const getMusicHome = (req: Request, res: Response) => {
//   console.log('Accessing /music route');  

//   res.send("Welcome to my Spotify App <a href='/music/login'>Login With Spotify</a>");
// };


// export const getMusicRouteIndexPage = (req: Request, res: Response) => {
//   console.log('Accessing /music/index-page route');  

//   res.send(
//     `BookBeat's Available Spotify Routes <br>
//     <a href='http://localhost:3000/music/playlists'>Get User's Playlists</a> <br>
//     <a href=''>Music Player N/A</a> <br>
//     <a href=''>Reccomended Playlist N/A</a> <br>
//     <a href=''>Your Playlists (for book) N/A</a> <br>
//     <a href=''>Create Playlist N/A</a> <br>
//     <a href=''>Adding Tracks to Playlist N/A</a>
//     `
//     );
// };




// Handle request for Spotify Playlists
// Checks if the access token is valid and retrieves the user's playlists from Spotify.


export const handleSpotifyPlaylists = async (req: Request, res: Response) => {
  
  //Testing to see if access token is in headers
  // console.log('new console log req.headers',req.headers);

  // Extracts the access token from the 'Authorization' header of the request, providing space between Bearer and token
  const accessToken = req.headers.authorization?.split(' ')[1];
  // console.log('access token', accessToken);
  
  

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  try {
    // Set up headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make the API call to get playlists
    const response = await axios.get(`${API_BASE_URL}me/playlists`, { headers });
    const playlists = response.data;

    // Return playlists as JSON
    return res.json(playlists);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response ? error.response.data : error.message);
      return res.status(500).json({
        error: 'Failed to retrieve playlists',
        details: error.response ? error.response.data : error.message,
      });
    } else if (error instanceof Error) {
      console.error('General error:', error.message);
      return res.status(500).json({
        error: 'Failed to retrieve playlists',
        details: error.message,
      });
    } else {
      console.error('Unknown error:', error);
      return res.status(500).json({
        error: 'Failed to retrieve playlists',
        details: 'An unknown error occurred',
      });
    }
  }
};



// Handle Spotify Track Search
// http://localhost:3000/music/search?search=Adele for testing
export const handleSpotifySearch = async (req: Request, res: Response) => {
  // Extract the access token from the Authorization header
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(' ')[1]; // 'Bearer token' => 'token'

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  // Extract search query from request
  const { search } = req.query;

  if (!search || typeof search !== 'string') {
    return res.status(400).json({ error: 'Search query is required and must be a string' });
  }

  try {
    // Set up headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    // Make the API call to search tracks
    const response = await axios.get(`${API_BASE_URL}search`, {
      headers,
      params: {
        q: search,
        type: 'track', // change to playlist to search playlists
        limit: 10 // You can adjust this limit as needed
      }
    });

    const searchResults = response.data;
    // console.log(searchResults);
    
    // Return search results as JSON
    return res.json(searchResults);

  } catch (error: unknown) {
    // Narrow down the error type
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error('Axios error:', error.response ? error.response.data : error.message);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: error.response ? error.response.data : error.message
      });
    } else if (error instanceof Error) {
      // General error handling
      console.error('General error:', error.message);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: error.message
      });
    } else {
      // Unknown error type
      console.error('Unknown error:', error);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: 'An unknown error occurred'
      });
    }
  }
};


// Handle Spotify Playlist Search

export const handleSpotifyPlaylistSearch = async (req: Request, res: Response) => {
  // Extract the access token from the Authorization header
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(' ')[1]; 

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  // Extract search query from request
  const { search } = req.query;

  if (!search || typeof search !== 'string') {
    return res.status(400).json({ error: 'Search query is required and must be a string' });
  }

  try {
    // Set up headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    // Make the API call to search tracks
    const response = await axios.get(`${API_BASE_URL}search`, {
      headers,
      params: {
        q: search,
        type: 'playlist', // change to playlist to search playlists
        limit: 1 // You can adjust this limit as needed
      }
    });

    const searchResults = response.data;
    console.log('Response from searching playlists', searchResults);
    
    // Return search results as JSON
    return res.json(searchResults);

  } catch (error: unknown) {
    // Narrow down the error type
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error('Axios error:', error.response ? error.response.data : error.message);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: error.response ? error.response.data : error.message
      });
    } else if (error instanceof Error) {
      // General error handling
      console.error('General error:', error.message);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: error.message
      });
    } else {
      // Unknown error type
      console.error('Unknown error:', error);
      return res.status(500).json({
        error: 'Failed to search tracks',
        details: 'An unknown error occurred'
      });
    }
  }
};



///// DB Playlist Handlers

export const createPlaylist = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("Received request data in createPlaylist:", data);

  let playlist = await prisma.playlist.findUnique({ where: { playlistId: data.id } });
  console.log("(createPlaylist) Found playlist in database:", playlist);

  if (!playlist) { 
    try {
      console.log("Playlist not found, creating a new one...");
      playlist = await prisma.playlist.create({
        data: {
          playlistId: data.id,
          playlist: data.playlist,
          image: data.image,
          description: data.description,
          uri: data.uri,
        },
      });
      console.log("Created new playlist:", playlist);
    } catch (error) {
      console.error("Error while creating the playlist:", error);
      return res.status(500).send("Error occurred while creating the playlist.");
    }
  } else {
    console.log("(createPlaylist) Using existing playlist:", playlist);
  }

  try {

    let userPlaylist = await prisma.userBookPlaylist.findUnique({ where: { userBookPlaylistIdentifier: {playlistId: data.id, userBookId: data.userBookId} } });

    console.log("Creating UserBookPlaylist...");
    if (userPlaylist) return res.send(userPlaylist)

    const userBookPlaylist = await prisma.userBookPlaylist.create({
      data: {
        userBook: {
          connect: {
            id: data.userBookId,
          },
        },
        playlist: {
          connect: {
            id: playlist.id,
          },
        },
        isFavorite: false,
      },
    });
    console.log("Successfully created UserBookPlaylist:", userBookPlaylist);
    res.send(userBookPlaylist);
  } catch (error) {
    console.error("Error while creating UserBookPlaylist:", error);
    return res.status(500).send("(createPlaylist) Error occurred while linking the playlist.");
  }
};


export const updateMyPlaylists = async (req: Request, res: Response) => {
  const data = req.body;

  // Log the incoming request data
  console.log("Request Data in updateMyPlaylists:", data);

  // Validate that "isFavorite" exists in the request body
  if (!Object(data).hasOwnProperty("isFavorite")) {
    return res.status(400).send("No valid data to update");
  }

  try {
    // Log that you're about to find the userBookPlaylist
    console.log("(updateMyPlaylists) Finding UserBookPlaylist with id:", data.id, "and userId:", req.user?.userId);

    // Validate that the playlist belongs to the user and exists
    const userBookPlaylist = await prisma.userBookPlaylist.findFirstOrThrow({
      where: {
        id: data.id,
        userBook: {
          userId: req.user?.userId, // Ensures it belongs to the logged-in user
        },
      },
    });

    // Log that the playlist was found
    console.log("(updateMyPlaylists) Found UserBookPlaylist:", userBookPlaylist);

    // Update the favorite status of the playlist
    const updatedUserBookPlaylist = await prisma.userBookPlaylist.update({
      where: {
        id: userBookPlaylist.id,
      },
      data: {
        isFavorite: data.isFavorite,
      },
    });

    // Log the successful update
    console.log("Updated UserBookPlaylist:", updatedUserBookPlaylist);

    // Send a response with the updated record
    return res.send({ updatedUserBookPlaylist });
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error updating playlist favorite status:", error);
    return res.status(500).send("Error occurred while updating the playlist.");
  }
};


export const getFavoritedPlaylistsByBook = async (req: Request, res: Response) => {
  const { bookId } = req.params; // Assuming the bookId is passed as a URL parameter

  // Log the received bookId
  console.log("Fetching favorited playlists for bookId:", bookId);

  try {
    // Fetch the favorited playlists associated with the specified book
    const favoritedPlaylists = await prisma.userBookPlaylist.findMany({
      where: {
        userBookId: bookId, // Ensure this matches the field name and value
        isFavorite: true,
      },
      include: {
        playlist: true, // Include playlist details in the result
      },
    });

    // Log the fetched playlists
    console.log("Fetched favorited playlists:", favoritedPlaylists);

    // Send the fetched playlists as the response
    return res.json(favoritedPlaylists.map(({playlist, ...rest}) => ({...playlist, ...rest})));
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error fetching favorited playlists:", error);
    return res.status(500).send("Error occurred while fetching favorited playlists.");
  }
};


export const getPlaylistsByBook = async (req: Request, res: Response) => {
  const { bookId } = req.params; // Assuming the bookId is passed as a URL parameter

  // Log the received bookId
  console.log("MusicController- Fetching playlists for bookId:", bookId);

  try {
    // Fetch the playlists associated with the specified book without filtering by favorite status
    const playlists = await prisma.userBookPlaylist.findMany({
      
      where: {
        userBookId: bookId, // Ensure this matches the field name and value
      },
      include: {
        playlist: true, // Include playlist details in the result
      },
    });

    // Log the fetched playlists
    console.log("MusicController- Fetched playlists:", playlists);


    /*
    const transformedPlaylists = playlists.map(playlist => ({
    //       id: playlist.id,
    //       playlistId: playlist.playlistId,
    //       playlist: playlist.playlist.playlist, // Nested field
    //       description: playlist.playlist.description, // Nested field
    //       uri: playlist.playlist.uri, // Nested field
    //       image: playlist.playlist.image, // Nested field
    //       createdAt: playlist.createdAt,
    //       updatedAt: playlist.updatedAt,
    //       isFavorite: playlist.isFavorite
    //     })); 
    */

    // Send the fetched playlists as the response
    return res.json(playlists.map(({playlist, ...rest}) => ({...playlist, ...rest})));
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error fetching playlists:", error);
    return res.status(500).send("Error occurred while fetching playlists.");
  }
};