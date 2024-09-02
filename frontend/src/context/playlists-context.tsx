import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useApi } from "../hooks/useApi";

// Define the Playlist interface
export interface IPlaylist {
  id: string;
  playlistId: string;
  playlist: string;
  image?: string;
  description?: string;
  uri: string;
  isFavorite: boolean;
}

// Define the context interface
interface IPlaylistContext {
  playlists: Array<IPlaylist>;
  isLoading: boolean;
  refetch: VoidFunction;
  currentBookPlaylists?: Array<IPlaylist>;
  selectCurrentBookPlaylists: (bookId?: string) => void;
}

const PlaylistContext = createContext<IPlaylistContext>({
  playlists: [],
  isLoading: false,
  refetch: () => {},
  currentBookPlaylists: undefined,
  selectCurrentBookPlaylists: () => {},
});

const PlaylistProvider = ({ children }) => {
    // State to hold the current book ID and playlists
  const [currentBookId, setCurrentBookId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);

  const api = useApi();

    // Function to fetch playlists based on the current book ID
  const fetchData = async () => {
    if (!currentBookId) return;
    
    setIsLoading(true);
    api
      .get(`/playlists/favorites/${currentBookId}`) // Fetch data from API
      .then((res) => {
        setPlaylists(res.data); // Update state with fetched playlist
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

    // Fetch data whenever the current book ID changes
  useEffect(() => {
    if (currentBookId) {
      fetchData();
    }
  }, [currentBookId]);

    // Function to refetch playlists data
  const refetch = () => {
    fetchData();
  };

    // Memoize current book playlists to avoid unnecessary recalculations
  const currentBookPlaylists = useMemo(() => {
    if (!currentBookId) return undefined;
    return playlists; // Assuming playlists are already filtered by bookId in API
  }, [currentBookId, playlists]);

  return (
    <PlaylistContext.Provider
      value={{
        isLoading,
        playlists,
        refetch,
        currentBookPlaylists,
        selectCurrentBookPlaylists: (bookId?: string) => setCurrentBookId(bookId),
      }}
    >
      {children} {/* Render children components with the context */}
    </PlaylistContext.Provider>
  );
};

// Custom hook to use PlaylistContext
export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export default PlaylistProvider;