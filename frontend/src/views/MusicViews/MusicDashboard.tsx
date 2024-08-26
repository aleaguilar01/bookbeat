import React, { useState, useEffect } from "react";
import TestPage from "./MediaPlayer";
import { useAuth } from "../../context/auth-context";
import { FrownOutlined } from "@ant-design/icons";

interface Playlist {
  id: string;   // or number, depending on your data
  name: string;
}

const MusicDashboard = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

const {user} = useAuth()
user.spotifyToken

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:3000/music/playlists', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Playlists");
        }
        const data = await response.json();
        setPlaylists(data.items)
      } catch(err){
        setError(err.message);
      }
    }
    fetchPlaylists();
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }
  
  return <>
  This is the Music Dashboard <br />
  BookBeat's Available Spotify Routes <br />
  {/* Change these urls to Link or useNavigate*/}
    <a href='http://localhost:3000/music/playlists'>Get User's Playlists</a> <br />
    <a href=''>Music Player N/A</a> <br />
    <a href=''>Reccomended Playlist N/A</a> <br />
    <a href=''>Your Playlists (for book) N/A</a> <br />
    <a href=''>Create Playlist N/A</a> <br />
    <a href=''>Adding Tracks to Playlist N/A</a>
  
  {/* <div>
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}> {playlist.id}</li>
      ))}
    </ul>
  </div> */}
   <TestPage></TestPage>

  </>
}

export default MusicDashboard;





