import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import { AxiosResponse } from 'axios';

interface AlbumImage {
  url: string;
  height: number;
}

interface SearchResponse {
  tracks: {
    items: Track[];
  };
}

interface Track {
  artists: { name: string }[];
  name: string;
  uri: string;
  album: {
    images: { url: string }[];
  };
}

export const useSongSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  /// SEARCHING FOR TRACKS
  useEffect(() => {
    if (!search) return setSearchResults([]);
    fetchSearchResults();
  }, [search]);

  const fetchSearchResults = async () => {
    try {
      api
        .get<any, AxiosResponse<SearchResponse>>('music/search', {
          params: { search: encodeURIComponent(search) },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Failed to fetch search results');
          }
          if (res.data) {
            const mappedData = res.data.tracks.items.map((track: any) => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest: any, image: any) => {
                  if (
                    smallest.height === undefined ||
                    image.height < smallest.height
                  )
                    return image;
                  return smallest;
                },
                { height: undefined, url: '' } as AlbumImage
              );
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            });
            setSearchResults(mappedData);
          }
        });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    searchResults,
    search,
    setSearch,
  };
};
