import React, { FC } from 'react';
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";

const TestPage: FC = () =>  {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

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


  useEffect(() => {
    
    if (!search) return setSearchResults([])

    const fetchSearchResults = async() =>{
      // setLoading(true);
      // setError(null);
      try {
        const response = await fetch(`http://localhost:3000/music/search?search=${encodeURIComponent(search)}`, {
          credentials: 'include', // Ensure credentials are sent if needed
        });
        // console.log(response.body.tracks.items);
        

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data: SearchResponse = await response.json();
        
        setSearchResults(
          data.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce<AlbumImage>((smallest, image) => {
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
        console.log(data);
        
      } catch( error ) {
        // setError((error as Error).message);
      }
    }
    fetchSearchResults();  
  }, [search]);
  
  return (
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        <Form.Control 
          type="search" 
          placeholder="Search Songs/Artists" 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          />
          <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>Songs</div>
          <div>Bottom</div>
    </Container>
  );
}

export default TestPage;