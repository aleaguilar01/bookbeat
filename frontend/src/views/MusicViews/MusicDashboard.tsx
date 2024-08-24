import React, { useState, useEffect } from "react";

interface Playlist {
  id: string;   // or number, depending on your data
  name: string;
}

const MusicDashboard = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  </>
}

export default MusicDashboard;




// import React, { useState, useEffect } from 'react';

// const MusicDashboard = () => {
//   const [playlists, setPlaylists] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         // Make a request to your backend route that handles fetching playlists
//         const response = await fetch('http://localhost:3000/music/playlists', {
//           credentials: 'include', // Ensure that cookies (session data) are included in the request
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch playlists');
//         }
//         const data = await response.json();
//         setPlaylists(data.items); // Assuming the response structure has `items` for playlists
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     // Call the function to fetch playlists
//     fetchPlaylists();
//   }, []); // Empty array ensures this runs once on component mount

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Music Dashboard</h1>
//       <ul>
//         {playlists.map((playlist) => (
//           <li key={playlist.id}>{playlist.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MusicDashboard;