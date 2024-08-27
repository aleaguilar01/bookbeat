import React, { FC } from 'react';
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import MusicContainer from './MusicComponents/MusicContainer';


const TestPage: FC = () =>  {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState<any>()
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

interface AlbumImage {
  url: string;
  height: number;
}

interface Track {
  artists: { name: string }[];
  name: string;
  uri: string;
  album: {
    images: { url: string }[];
  };
}

interface SearchResponse {
  tracks: {
    items: Track[];
  };
}

function chooseTrack(track) {
  setPlayingTrack(track)
  setSearch('')
}


  // useEffect(() => {
    
  //   if (!search) return setSearchResults([])

  //   const fetchSearchResults = async() =>{
  //     // setLoading(true);
  //     // setError(null);
  //     try {
  //       const response = await fetch(`http://localhost:3000/music/search?search=${encodeURIComponent(search)}`, {
  //         credentials: 'include', // Ensure credentials are sent if needed
  //       });
  //       // console.log(response.body.tracks.items);
        

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch search results');
  //       }

  //       const data: SearchResponse = await response.json();
        
  //       setSearchResults(
  //         data.tracks.items.map((track) => {
  //           const smallestAlbumImage = track.album.images.reduce<AlbumImage>((smallest, image) => {
  //             if (smallest.height === undefined || image.height < smallest.height) return image;
  //             return smallest;
  //           }, { height: undefined, url: '' });

  //           return {
  //             artist: track.artists[0].name,
  //             title: track.name,
  //             uri: track.uri,
  //             albumUrl: smallestAlbumImage.url,
  //           };
  //         })
  //       );
  //       console.log(data);
        
  //     } catch( error ) {
  //       // setError((error as Error).message);
  //     }
  //   }
  //   fetchSearchResults();  
  // }, [search]);
  
  //// Getting Spotify Auth Token
  const {user} = useAuth()
  user.spotifyToken
  // console.log('this is the spotify token', user.spotifyToken);
  useEffect(() => {
    if (!search) return setSearchResults([]);
  
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/music/search?search=${encodeURIComponent(search)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.spotifyToken.access_token}`, // Include the token here
            'Content-Type': 'application/json', // Optional: Ensure JSON format
          },
          credentials: 'include', // If you need to send cookies or other credentials
        });
        // console.log(response);
        
  
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
  
        const data: SearchResponse = await response.json();
        // console.log('this is the data',data);
        
        
        setSearchResults(
          data.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce<AlbumImage>((smallest: any, image: any) => {
              if (smallest.height === undefined || image.height < smallest.height) return image;
              return smallest;
            }, { height: undefined, url: '' });
  
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
        // console.log(data);
        
      } catch (error) {
        setError((error as Error).message);
      }
    };
  
    fetchSearchResults();
  }, [search, user.spotifyToken]);

  return (
    

    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        {/* <MusicContainer/> */}

        <Form.Control 
          type="search" 
          placeholder="Search Songs/Artists" 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          />
          <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
          {searchResults.map(track => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 &&(
            <div >
              <MusicContainer />
            </div>
          )}
          </div>

          <div><Player accessToken={user.spotifyToken.access_token} trackUri={playingTrack?.uri}/></div>
    </Container>
  );
}

export default TestPage;