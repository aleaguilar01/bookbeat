import { useState } from "react";
import { useApi } from "./useApi";
import { usePlaylistSearch } from "./usePlaylistSearch";

export const useMusicRecommendation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
    // const { playlistSearch, setPlaylistSearch, playlistSearchResults, error } = usePlaylistSearch();

    /// Hardcode book to search
    // set up setPlaylistSearch to respond to music reccomendations coming back from AI
    // For each Ai suggestion, search retrieve and map one playlist to a card

  const api = useApi();

  const getRecommendations = async (book: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("ai/music-reccomendations", { book });
      if (response.data) {
        console.log("getRecommendations response ", response);
        
        // the response is an array of playlist names
        setRecommendations(response.data.playlist);
      }
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  return { recommendations, getRecommendations, isLoading, error };
};
