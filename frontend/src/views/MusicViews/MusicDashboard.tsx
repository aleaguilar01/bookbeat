import React, { useState, useEffect, FC } from "react";
import TestPage from "./TestPage";
import { useAuth } from "../../context/auth-context";
import { FrownOutlined } from "@ant-design/icons";

interface Playlist {
  id: string; // or number, depending on your data
  name: string;
}

interface MusicDashboardProps {
  bookId?: string; // is actually the userBookId = 
  title: string;
  author?: string;
}

const MusicDashboard: FC<MusicDashboardProps> = ({ bookId = "1ea7e9b0-a5e2-4e00-b6b1-aeab35178921", title, author }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  //// Getting Spotify Auth Token
  const { user } = useAuth();
  user.spotifyToken;
  // console.log('this is the spotify token', user.spotifyToken);

  /// GET User's Playlists. Used to initially check that Spotify was connected. Not in use now.
  useEffect(() => {
    if (!user.spotifyToken.access_token) {
      setError("Spotify token is missing");
      return;
    }
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/music/playlists", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token here
            "Content-Type": "application/json", // Optional: Ensure JSON format
          },
          credentials: "include", // If you need to send cookies or other credentials
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Playlists");
        }
        const data = await response.json();
        // console.log('data from fetch playlists', data);

        setPlaylists(data.items);
        // console.log('playlists state', playlists);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPlaylists();
  }, [user]); // Add user.spotifyToken as a dependency

  return (
    <>
      <TestPage bookId={bookId} title={title} author={author}/>
    </>
  );
};

export default MusicDashboard;
