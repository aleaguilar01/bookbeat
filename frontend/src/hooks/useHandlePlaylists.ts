
import { useState } from "react";
import { usePlaylist } from "../context/playlists-context";
import { useApi } from "./useApi";

interface CreatePlaylistArgs {
  id: string;
  playlist: string;
  description: string;
  uri: string;
  image: string;
  userBookId: string;
}
export const useHandlePlaylists = () => {

  const { refetch } = usePlaylist(); // Hook to access Playlist context
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const api = useApi(); // Custom hook for API calls

  // Function to update the favorite status of a playlist
  const updatePlaylistIsFavorite = (isFavorite: boolean, id: string) => {
    setIsLoading(true);
    api
      .put("/my-playlists", { id, isFavorite }) // API call to update favorite status
      .then(() => refetch()) // Refetch data after update
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  // Function to create a new playlist
  const createPlaylist = async (args: CreatePlaylistArgs) => {
    setIsLoading(true);
    api
      .post("music/my-playlists", args) // API call to create a playlist
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      });
  };

  return {
    updatePlaylistIsFavorite,
    createPlaylist,
    isLoading
  };
}

// TODO: fetchPlaylistByBook