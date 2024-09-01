import { Card, Row, Col, Button, Typography } from 'antd';
import ReccomendedPlaylistCard from './ReccomendedPlaylistsCard';
import '../MusicStyles/PlaylistRow.styles.css'
import { useState, useEffect } from 'react';
import { useHandlePlaylists } from '../../../hooks/useHandlePlaylists';

const { Title } = Typography;


interface ReccomendedPlaylistRowProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any
}


const ReccomendedPlayListRow: React.FC<ReccomendedPlaylistRowProps> = ({playlistSearchResults, choosePlaylist}) => {
  const [reccomendedCardData, setReccomendedCardData] = useState([])
  const { createPlaylist } = useHandlePlaylists();
  
  
  /// Adding playlistSearchResults to reccomendedCardData array
  useEffect(() => {


    // Update the state with new search results while maintaining previous entries
    setReccomendedCardData(prevResults => [
      ...prevResults,
      ...playlistSearchResults.filter(result => 
        !prevResults.some(existing => existing.uri === result.uri) // Avoid duplicates
      )
    ]);

    
    addPlaylistsToDB(reccomendedCardData);
    
  }, [playlistSearchResults]);

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
          userBookId: "9781933372600"
        });
        console.log("createPlaylist called with this data", playlist); // Update this line
        
      } catch (error) {
        console.error("Error adding playlist to database:", error);
      }
    }
  };

  console.log('This is the reccomended card data', reccomendedCardData);
  

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
    {reccomendedCardData.map((playlist: any, index) => (
      <Col span={4} key={index} > 
        <ReccomendedPlaylistCard playlist={playlist} choosePlaylist={choosePlaylist} />
      </Col>
    ))}
    </Row>
  </div>
  );
};

export default ReccomendedPlayListRow;