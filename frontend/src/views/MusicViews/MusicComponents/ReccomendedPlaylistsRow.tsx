import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReccomendedPlaylistCard from './FavouritePlaylistCard';

const { Title } = Typography;

const playlists = [
  {
    title: 'Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'path-to-image',
  },
  {
    title: 'Not Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'path-to-image',
  },
  {
    title: 'Not Chill Vibes',
    description: 'Relax and unwind with these chill tracks.',
    imageUrl: 'path-to-image',
  }
]


const ReccomendedPlayListRow: React.FC = () => {
  return (
  <div>

    {/* Title for the Favorite Playlists section */}
    <Row>
        <Col span={24}>
          <Title level={3} style={{ textAlign: 'left' }}>
            Reccomended Playlists for -BookTitle-
          </Title>
        </Col>
    </Row>
    {/* Playlists Row */}
    <Row gutter={16}>
    {playlists.map((playlist, index) => (
      <Col span={6} key={index}>
        <ReccomendedPlaylistCard playlist={playlist}/>
      </Col>
    ))}
    </Row>
  </div>
  );
};

export default ReccomendedPlayListRow;