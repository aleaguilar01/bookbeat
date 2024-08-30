import { Card, Row, Col, Button, Typography } from 'antd';
import ReccomendedPlaylistCard from './ReccomendedPlaylistsCard';
import '../MusicStyles/PlaylistRow.styles.css'
import { useState, useEffect } from 'react';

const { Title } = Typography;


interface ReccomendedPlaylistRowProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any
}


const ReccomendedPlayListRow: React.FC<ReccomendedPlaylistRowProps> = ({playlistSearchResults, choosePlaylist}) => {
  const [reccomendedCardData, setReccomendedCardData] = useState([])
  
  /// Adding playlistSearchResults to reccomendedCardData array
  useEffect(() => {
    // Update the state with new search results while maintaining previous entries
    setReccomendedCardData(prevResults => [
      ...prevResults,
      ...playlistSearchResults.filter(result => 
        !prevResults.some(existing => existing.uri === result.uri) // Avoid duplicates
      )
    ]);
    
  }, [playlistSearchResults]);


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