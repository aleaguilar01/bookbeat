import { Card, Row, Col, Button, Typography } from 'antd';
import ReccomendedPlaylistCard from './ReccomendedPlaylistsCard';
import '../MusicStyles/PlaylistRow.styles.css'
import { useState, useEffect } from 'react';
import { useHandlePlaylists } from '../../../hooks/useHandlePlaylists';

const { Title } = Typography;


interface ReccomendedPlaylistRowProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any;
  // onFavoriteChange: any;
  bookId?: string,
  createPlaylist: Function,
  fetchPlaylistsByBook: Function
  updatePlaylistIsFavorite: Function
}


const ReccomendedPlayListRow: React.FC<ReccomendedPlaylistRowProps> = ({updatePlaylistIsFavorite, createPlaylist, fetchPlaylistsByBook, playlistSearchResults, choosePlaylist, bookId = "6059c1ea-815f-4181-9a06-81a17e465776"}) => {
  const [reccomendedCardData, setReccomendedCardData] = useState([])
  const [fetchedPlaylists, setFetchedPlaylists] = useState([]);


  /// Fecth Playlist By Book
  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlists = await fetchPlaylistsByBook(bookId);
        // Transform the data to include only required fields
      

        console.log("Transformed playlists:", playlists);
        setFetchedPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Consolidate both fetchedPlaylists and playlistSearchResults
    if(fetchedPlaylists){const allPlaylists = [
      ...fetchedPlaylists,
      ...playlistSearchResults
    ];

    // Remove duplicates based on 'uri'
    const uniquePlaylists = Array.from(new Map(
      allPlaylists.map(playlist => [playlist.uri, playlist])
    ).values());

    setReccomendedCardData(uniquePlaylists);}
  }, [fetchedPlaylists, playlistSearchResults]);

    

  useEffect(() => {
    addPlaylistsToDB(reccomendedCardData)
  }, [reccomendedCardData])

  const addPlaylistsToDB = async (reccomendedCardData) => {
    for (const playlist of reccomendedCardData) {
      // Call createPlaylist to add the playlist to the database
      try {
        console.log("Creating playlist with data:", playlist); // Add this line
        await createPlaylist({
          id: playlist.id,
          playlist: playlist.playlist,
          description: playlist.description,
          uri: playlist.uri,
          image: playlist.image,
          userBookId: bookId
        });
        console.log("createPlaylist called with this data", playlist); // Update this line
        //console.log('fetchPlaylistsByBook function',fetchPlaylistsByBook("6059c1ea-815f-4181-9a06-81a17e465776"));

      } catch (error) {
        console.error("Error adding playlist to database:", error); 
      }
    }
  };

  const handleFavoriteChange = (playlistId: string, isFavorite: boolean) => {
    setReccomendedCardData(prevData => 
      prevData.map(playlist => 
        playlist.id === playlistId ? { ...playlist, isFavorite } : playlist
      )
    );
  };

  console.log('This is the reccomended card data', reccomendedCardData);
  
  // Limit the number of playlists rendered to MAX_PLAYLISTS
  const MAX_PLAYLISTS = 4;

  const displayedPlaylists = reccomendedCardData.slice(0, MAX_PLAYLISTS);
  return (
  <div>

    {/* Title for the Favorite Playlists section */}
    <Row>
        <Col span={24}>
          <Title level={3}  className='playlist-row-title'>
            Reccomended Playlists for -BookTitle-
          </Title>
        </Col>
    </Row>
    {/* Playlists Row */}
    <Row gutter={[16, 16]} justify="start" >
    {displayedPlaylists.map((playlist: any, index) => (
      <Col span={4} key={index} > 
        <ReccomendedPlaylistCard updatePlaylistIsFavorite={updatePlaylistIsFavorite} playlist={playlist} choosePlaylist={choosePlaylist} onFavoriteChange={handleFavoriteChange} bookId={bookId} />
      </Col>
    ))}
    </Row>
  </div>
  );
};

export default ReccomendedPlayListRow;