import { useState, useEffect } from "react";
import { useApi } from "./useApi";
import { AxiosResponse } from "axios";

interface PlaylistImage {
  url: string;
  height: number;
}

export interface SPPlaylist {
  playlist: string;
  description: string;
  image: PlaylistImage[];
  uri: string;
  spotifyId: string;
  isFavorite?: boolean
}

interface PlaylistSearchResponse {
  playlists: {
    items: SPPlaylist[];
  };
}

export const usePlaylistSearch = () => {
  const [playlistSearch, setPlaylistSearch] = useState("");
  const [playlistSearchResults, setPlaylistSearchResults] = useState<
  SPPlaylist[]
  >([]);
  const [playlistSearchError, setError] = useState<string | null>(null);
  const api = useApi();

  const fetchPlaylistSearchResults = async () => {
      api.get<any, AxiosResponse<PlaylistSearchResponse>>(`music/playlist-search?search=${encodeURIComponent(
          playlistSearch
        )}`).then(response => {
          if(response.status !== 200){
            throw new Error("Failed to fetch search results");
          }
          if(response.data){
            const mappedData = response.data.playlists.items.map((playlist: any) => {
              return {
                spotifyId: playlist.id,
                playlist: playlist.name,
                description: playlist.description,
                uri: playlist.uri,
                image: playlist.images[0]?.url,
              };
            });
            setPlaylistSearchResults(mappedData);
          }
        }).catch(playlistSearchError => {
          setError((playlistSearchError as Error).message);
        });
   
  };

  useEffect(() => {
    if (!playlistSearch) return setPlaylistSearchResults([]);
    fetchPlaylistSearchResults();
  }, [playlistSearch]);

  return {
    playlistSearch,
    setPlaylistSearch,
    playlistSearchResults,
    playlistSearchError,
  };
};
