import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomPlaylistCard from './CustomPlaylistCard';

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
]



const MAX_PLAYLISTS = 4;

const CustomPlayListRow: React.FC = () => {
  return (
  <div>

    {/* Title for the Favorite Playlists section */}
    <Row>
        <Col span={24}>
          <Title level={3} className='playlist-row-title'>
            Custom Playlists for -BookTitle-
          </Title>
        </Col>
    </Row>
    {/* Playlists Row */}
    <Row gutter={[16, 16]} justify="start">
    {playlists.map((playlist, index) => (
      <Col span={4} key={index}>
        <CustomPlaylistCard playlist={playlist}/>
      </Col>
    ))}

    {/* Render a single + button in the next available slot if there's space */}
    {playlists.length < MAX_PLAYLISTS && (
      <Col span={4}>
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

export default CustomPlayListRow;