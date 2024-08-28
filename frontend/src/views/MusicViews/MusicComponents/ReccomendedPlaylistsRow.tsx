import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReccomendedPlaylistCard from './ReccomendedPlaylistsCard';
import '../MusicStyles/PlaylistRow.styles.css'

const { Title } = Typography;

const playlists = [
  {
    title: 'Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'https://i.scdn.co/image/ab67616d00004851de3c04b5fc750b68899b20a9',
  },
  {
    title: 'Not Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'https://i.scdn.co/image/ab67616d00004851de3c04b5fc750b68899b20a9',
  },
  {
    title: 'Not Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'https://i.scdn.co/image/ab67616d00004851de3c04b5fc750b68899b20a9',
  }
]


const ReccomendedPlayListRow: React.FC = () => {
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
    {playlists.map((playlist, index) => (
      <Col span={4} key={index} > 
        <ReccomendedPlaylistCard playlist={playlist} />
      </Col>
    ))}
    </Row>
  </div>
  );
};

export default ReccomendedPlayListRow;