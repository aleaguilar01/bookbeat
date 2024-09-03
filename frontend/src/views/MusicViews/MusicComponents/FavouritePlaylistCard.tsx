
import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useHandlePlaylists } from '../../../hooks/useHandlePlaylists';


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
  id: string;
  playlist: string;
  description: string;
  image: string;
  uri: string;
  isFavorite: boolean
};

// Define the prop types for the FavouritePlaylistCard component
type FavouritePlaylistCardProps = {
  playlist: Playlist;
  choosePlaylist: any;
  bookId: string;
  updatePlaylistIsFavorite: Function
};


const FavouritePlaylistCard: React.FC<FavouritePlaylistCardProps> = ({ playlist, choosePlaylist, updatePlaylistIsFavorite, bookId }) => {
  // console.log(playlist, 'playlist log')

  const handleFavoriteToggle = async () => {
    try {
      updatePlaylistIsFavorite(!playlist.isFavorite, playlist.id, bookId);
      // onFavoriteChange(playlist.id, !playlist.isFavorite); // Notify parent component about the change
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handlePlay = () => {
    choosePlaylist(playlist);
  };

  return (
    <div >
      <Card
          className='playlist-card'
          hoverable
          cover={
            <div className='image-container' onClick={handlePlay}>
          <img alt={playlist.playlist} src={playlist.image} className='card-image'/>

          
            {/* <Button className='card-button fav-icon' icon={<FavIcon />} type="primary" shape='circle'/> */}
            <Button 
              className='card-button-delete'
              icon={<CloseCircleOutlined className='delete-icon'/>} 
              type="primary" 
              shape='circle'
              onClick={handleFavoriteToggle}
              />
            </div>
          
        }
          // actions={[
          //   <Button icon={<PlusOutlined />} type="primary" />,
          // ]}
        >
          <Card.Meta className='playlist-card-text' title={<div className='playlist-card-title-text'> {playlist.playlist}</div>} description={
          <div className='playlist-card-description-text'> {playlist.description } 
          </div>}
          />
        </Card>
    </div>
  )
};

export default FavouritePlaylistCard;

