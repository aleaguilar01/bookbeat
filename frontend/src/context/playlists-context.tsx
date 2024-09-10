import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useApi } from "../hooks/useApi";

// Define the Playlist interface
export interface IPlaylist {
  id: string;
  playlistId: string;
  playlist: string;
  image?: string;
  description?: string;
  uri: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

// Define the context interface
interface IPlaylistContext {
  favoritePlaylists: Array<IPlaylist>;
  recommendedPlaylists: Array<IPlaylist>;
  isLoading: boolean;
  refetch: VoidFunction;
  handleFavoriteToggle: (isFavorite: boolean, id: string) => void;
}

const PlaylistContext = createContext<IPlaylistContext>({
  favoritePlaylists: [],
  recommendedPlaylists: [],
  isLoading: false,
  refetch: () => {},
  handleFavoriteToggle: () => {},
});

const PlaylistProvider: FC<PropsWithChildren<{ bookId: string }>> = ({
  bookId,
  children,
}) => {
    // State to hold the current book ID and playlists
  const [isLoading, setIsLoading] = useState(false);
  const [favoritePlaylists, setFavoritePlaylists] = useState<Array<IPlaylist>>(
    []
  );
  const [recommendedPlaylists, setRecommendedPlaylists] = useState<
    Array<IPlaylist>
  >([]);
  const api = useApi();

    // Function to fetch playlists based on the current book ID
  const fetchBookPlaylists = async () => {
    setIsLoading(true);
    api.get(`/music/my-playlists/${bookId}`)
    .then((res)=>{
      setFavoritePlaylists(res.data.filter((p: IPlaylist) => p.isFavorite))
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const fetchRecommendedPlaylist = async () => {
    setIsLoading(true);
    api
      .get(`/music/recommended-playlists/${bookId}`)
      .then((res) => {
        setRecommendedPlaylists(res.data); // Update state with fetched playlist
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

    // Fetch data whenever the current book ID changes
  useEffect(() => {
    if (bookId) {
      fetchRecommendedPlaylist();
      fetchBookPlaylists();
    }
  }, [bookId]);

  const handleFavoriteToggle = async (isFavorite: boolean, id: string) => {
    try {
      setIsLoading(true);
      await api.put('music/my-playlists', { id, isFavorite, bookId });
      fetchBookPlaylists();
    } catch (error) {
      console.error('Error updating favorite status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        isLoading,
        favoritePlaylists,
        refetch: fetchBookPlaylists,
        recommendedPlaylists,
        handleFavoriteToggle,
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

export const withPlaylistProvider = <T extends { bookId: string }>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    const { bookId } = props;
    return (
      <PlaylistProvider bookId={bookId}>
        <Component {...props} />
      </PlaylistProvider>
    );
  };
};
export default PlaylistProvider;