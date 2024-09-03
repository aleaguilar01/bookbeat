
import { useCallback, useState } from "react";
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

export interface IPlaylist {
  id: string,
  playlistId: string,
  playlist: string, // Nested field
  description: string, // Nested field
  uri: string, // Nested field
  image: string, // Nested field
  createdAt: Date,
  updatedAt: Date,
  isFavorite: boolean
}
export const useHandlePlaylists = () => {

  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [fetchedFavoritePlaylists, setFetchedFavoritePlaylists] = useState([]);
  const api = useApi(); // Custom hook for API calls

  // Function to update the favorite status of a playlist
  const updatePlaylistIsFavorite = async (isFavorite: boolean, id: string, bookId: string) => {
    try {
      setIsLoading(true);
      await api.put("music/my-playlists", { id, isFavorite });
      fetchFavoritePlaylistsByBook(bookId)
    } catch (error) {
      console.error('Error updating playlist favorite status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new playlist
  const createPlaylist = async (args: CreatePlaylistArgs) => {
    setIsLoading(true);
    return await api
      .post("music/my-playlists", args) // API call to create a playlist
      .catch(() => {
        setIsLoading(false);
      });
  };

  // Function to fetch playlists by book
  const fetchPlaylistsByBook = async (bookId: string) : Promise<Array<IPlaylist>> => {
    setIsLoading(true);
    try {
      const response = await api.get(`/music/my-playlists/${bookId}`); // API call to get playlists by book
      return response.data; // Return the fetched playlists
    } catch (error) {
      console.error("Error fetching playlists by book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch playlists by book
  const fetchFavoritePlaylistsByBook = async (bookId: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/music/my-playlists/favorites/${bookId}`);
      setFetchedFavoritePlaylists(response.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching favorite playlists by book:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return {
    updatePlaylistIsFavorite,
    createPlaylist,
    fetchPlaylistsByBook,
    fetchFavoritePlaylistsByBook,
    isLoading,
    fetchedFavoritePlaylists
  };
}

// TODO: fetchPlaylistByBook