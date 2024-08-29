
import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import FavIcon from './FavIcon';

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
          className='playlist-card'
          hoverable
          cover={
            <div className='image-container'>
            <img alt={playlist.title} src={playlist.imageUrl} className='card-image' />
            <Button className='card-button fav-icon' icon={<FavIcon />} type="primary" shape='circle'/>
            <Button className='card-button-delete' icon={<CloseCircleOutlined className='delete-icon'/>} type="primary" shape='circle'/>

            </div>
            }
          actions={[
            // <Button icon={<PlusOutlined />} type="primary" />,
          ]}
        >
          <Card.Meta className='playlist-card-text' title={<div className='playlist-card-title-text'> {playlist.title}</div>} description={
            <div className='playlist-card-description-text'> {playlist.description } 
            </div>}
          />
      </Card>
    </div>
  )
};

export default CustomPlaylistCard;

