import React, { FC } from 'react';
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import MusicContainer from './MusicComponents/MusicContainer';
import PlaylistSearchPage from './PlaylistSearchBar';
import { usePlaylistSearch } from '../../hooks/usePlaylistSearch';

interface TestPageProps{
  bookId: string, 
  title: string, 
  author?: string
}

const TestPage: FC<TestPageProps> = ({bookId, title, author}) =>  {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState<any>()
  const [error, setError] = useState<string | null>(null);
  const { playlistSearch, setPlaylistSearch, playlistSearchResults, playlistSearchError } = usePlaylistSearch();
  const [playingPlaylist, setPlayingPlaylist] = useState<any>()



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

  function choosePlaylist(playlist) {
    setPlayingPlaylist(playlist)
  }

  
  //// Getting Spotify Auth Token
  const { user } = useAuth()


  /// SEARCHING FOR TRACKS
  useEffect(() => {
    if (!search) return setSearchResults([]);
  
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/music/search?search=${encodeURIComponent(search)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`, // Include the token here
            'Content-Type': 'application/json', // Optional: Ensure JSON format
          },
          credentials: 'include', 
        });
        
  
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
  
        const data: SearchResponse = await response.json();
        
        console.log(data);
        
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
        
      } catch (error) {
        setError((error as Error).message);
      }
    };
  
    fetchSearchResults();
  }, [search, user.spotifyToken]);


  return (
    

    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        
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
              <PlaylistSearchPage 
                setPlaylistSearch={setPlaylistSearch}
                playlistSearchError={playlistSearchError}
                playlistSearch={playlistSearch}
                title={title}
                author={author}
                />
              <MusicContainer playlistSearchResults={playlistSearchResults} setPlaylistSearch={setPlaylistSearch} choosePlaylist={choosePlaylist} bookId={bookId} title={title}/>
            </div>
          )}
          </div>

          <div><Player accessToken={user.spotifyToken.access_token} trackUri={playingTrack?.uri || playingPlaylist?.uri}/></div>
    </Container>
  );
}

export default TestPage;

