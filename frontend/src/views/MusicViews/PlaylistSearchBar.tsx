import React, { FC } from 'react';
import { useEffect } from "react";
import { useMusicRecommendation } from '../../hooks/useMusicReccomendation';

interface PlaylistSearchPageProps {
  playlistSearch: string;
  setPlaylistSearch: React.Dispatch<React.SetStateAction<string>>;
  playlistSearchError: string;
}

const PlaylistSearchPage: FC<PlaylistSearchPageProps> = ( {playlistSearch, setPlaylistSearch, playlistSearchError} ) =>  {
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

  return (
    <div>
      {playlistSearchError && <div>Error: {playlistSearchError}</div>}
      <input
        type="text"
        value={playlistSearch}
        onChange={(e) => setPlaylistSearch(e.target.value)}
        placeholder="Search for playlists (to be an AI search value)"
      />
    </div>

  );
}

export default PlaylistSearchPage;


