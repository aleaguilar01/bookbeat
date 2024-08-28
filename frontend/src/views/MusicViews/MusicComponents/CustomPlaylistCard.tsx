
import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

// Define the type for the playlist object
type Playlist = {
  title: string;
  description: string;
  imageUrl: string;
};

// Define the prop types for the FavouritePlaylistCard component
type CustomPlaylistCardProps = {
  playlist: Playlist;
};


const CustomPlaylistCard: React.FC<CustomPlaylistCardProps> = ({ playlist }) => {
  return (
    <div>
      <Card
          hoverable
          cover={<img alt={playlist.title} src={playlist.imageUrl} />}
          actions={[
            <Button icon={<PlusOutlined />} type="primary" />,
          ]}
        >
          <Card.Meta title={playlist.title} description={playlist.description} style={{ textAlign: 'left' }} />
        </Card>
    </div>
  )
};

export default CustomPlaylistCard;

