import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReccomendedPlaylistCard from './ReccomendedPlaylistsCard';
import '../MusicStyles/PlaylistRow.styles.css'
import { usePlaylistSearch } from '../../../hooks/usePlaylistSearch';
import { useState, useEffect } from 'react';
import { useMusicRecommendation } from '../../../hooks/useMusicReccomendation';

const { Title } = Typography;

const playlists = [
  {
    description: "Dark Folk music picked just for you",
    image: "https://seed-mix-image.spotifycdn.com/v6/img/desc/Dark%20Folk/en/large",
    playlist: "Dark Folk Mix",
    uri: "spotify:playlist:37i9dQZF1EIdRftFUlAaFK"
  }
  // {
  //   title: 'Not Chill Vibes',
  //   description: 'Relax and unwind with these chill tracks.',
  //   imageUrl: 'path-to-image',
  // }
]

interface ReccomendedPlaylistRowProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any
}




const ReccomendedPlayListRow: React.FC<ReccomendedPlaylistRowProps> = ({playlistSearchResults, choosePlaylist}) => {

  const [reccomendedCardData, setReccomendedCardData] = useState([])
  // console.log('testing playlist search results from reccomendations', playlistSearchResults);





  /// Adding playlist search results to reccomendedCardData array
  useEffect(() => {

    // Update the state with new search results while maintaining previous entries
    setReccomendedCardData(prevResults => [
      ...prevResults,
      ...playlistSearchResults.filter(result => 
        !prevResults.some(existing => existing.uri === result.uri) // Avoid duplicates
      )
    ]);
    
  }, [playlistSearchResults]);

  console.log('Rendered reccomendedCardData:', reccomendedCardData);

  
  // console.log('Reccomended card data from row',reccomendedCardData);
  
  

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