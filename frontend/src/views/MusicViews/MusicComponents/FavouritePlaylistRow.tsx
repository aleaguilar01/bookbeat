import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FavouritePlaylistCard from './FavouritePlaylistCard';

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
]



const MAX_PLAYLISTS = 4;

const FavouritePlayListRow: React.FC = () => {
  return (
  <div>

    {/* Title for the Favorite Playlists section */}
    <Row>
        <Col span={24}>
          <Title level={3} style={{ textAlign: 'left' }}>
            Favourite Playlists for -BookTitle-
          </Title>
        </Col>
    </Row>
    {/* Playlists Row */}
    <Row gutter={16}>
    {playlists.map((playlist, index) => (
      <Col span={6} key={index}>
        <FavouritePlaylistCard playlist={playlist}/>
      </Col>
    ))}

    {/* Render a single + button in the next available slot if there's space */}
    {playlists.length < MAX_PLAYLISTS && (
      <Col span={6}>
        <Card
          hoverable
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Button
            icon={<PlusOutlined />}
            type="primary"
            shape="circle"
            size="large"
          />
        </Card>
      </Col>
    )}
    </Row>
  </div>
  );
};

export default FavouritePlayListRow;