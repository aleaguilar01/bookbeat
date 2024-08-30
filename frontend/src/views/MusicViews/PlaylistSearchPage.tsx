import React, { FC } from 'react';
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import MusicContainer from './MusicComponents/MusicContainer';
import { usePlaylistSearch } from '../../hooks/usePlaylistSearch';
import { useMusicRecommendation } from '../../hooks/useMusicReccomendation';

interface PlaylistSearchPageProps {
  playlistSearch: string;
  setPlaylistSearch: React.Dispatch<React.SetStateAction<string>>;
  playlistSearchError: string;
}

const PlaylistSearchPage: FC<PlaylistSearchPageProps> = ( {playlistSearch, setPlaylistSearch, playlistSearchError} ) =>  {
  // const { playlistSearch, setPlaylistSearch, playlistSearchResults, error } = usePlaylistSearch();
  const {recommendations, getRecommendations } = useMusicRecommendation();

  useEffect(() => {
    getRecommendations("The Elegance of the Hedgehog by Muriel Barbery");
  }, []); 

  console.log('testing reccomendations response', recommendations);
  
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      recommendations.map((recommendation) => {
        // Append each new recommendation to the state
        setPlaylistSearch(recommendation);
      });
    }
  }, [recommendations]);

  // useEffect(() => {
  //   console.log('Current playlistSearch state:', playlistSearch);
  // }, [playlistSearch]);

  // useEffect(() => {
  //   console.log('Playlist Search Results:', playlistSearchResults);
  // }, [playlistSearchResults]);
  
  
  
  // useEffect(() => {
  //   if (recommendations) {
  //     console.log("PlaylistSearchPage Recommendations:", recommendations);
  //   }
  // }, [recommendations]); // Log the recommendations when they change

  return (
    <div>
      {playlistSearchError && <div>Error: {playlistSearchError}</div>}
      <input
        type="text"
        value={playlistSearch}
        onChange={(e) => setPlaylistSearch(e.target.value)}
        placeholder="Search for playlists (to be an AI search value)"
      />
      {/* <div>
        {playlistSearchResults.map((playlist: any) => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
          </div>
        ))}
      </div> */}
    </div>

  );
}

export default PlaylistSearchPage;


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