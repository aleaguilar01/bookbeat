
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
type FavouritePlaylistCardProps = {
  playlist: Playlist;
};


const FavouritePlaylistCard: React.FC<FavouritePlaylistCardProps> = ({ playlist }) => {
  return (
    <div >
      <Card
          className='playlist-card'
          hoverable
          cover={<img alt={playlist.title} src={playlist.imageUrl}/>}
          // actions={[
          //   <Button icon={<PlusOutlined />} type="primary" />,
          // ]}
        >
          <Card.Meta className='playlist-card-text' title={<div className='playlist-card-title-text'> {playlist.title}</div>} description={
          <div className='playlist-card-description-text'> {playlist.description } 
          </div>}
          />
        </Card>
    </div>
  )
};

export default FavouritePlaylistCard;

