
import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd';
import { CloseCircleOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import '../MusicStyles/PlaylistCard.styles.css'
import FavIcon from './FavIcon';
import { useHandlePlaylists } from '../../../hooks/useHandlePlaylists';



type Playlist = {
  id: string;
  playlist: string;
  description: string;
  image: string;
  uri: string;
  isFavorite: boolean
};

type ReccomendedPlaylistCardProps = {
  playlist: Playlist;
  choosePlaylist: any
  onFavoriteChange: (playlistId: string, isFavorite: boolean) => void;
  bookId: string
  updatePlaylistIsFavorite: Function
};


const ReccomendedPlaylistCard: React.FC<ReccomendedPlaylistCardProps> = ({ playlist, choosePlaylist, onFavoriteChange, updatePlaylistIsFavorite, bookId }) => {
  

  const handleFavoriteToggle = async () => {
    try {
      await updatePlaylistIsFavorite(!playlist.isFavorite, playlist.id, bookId);
      // onFavoriteChange(playlist.id, !playlist.isFavorite); // Notify parent component about the change
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };
  const handlePlay = () => {
    choosePlaylist(playlist);
  };
  // console.log('handle play playlist',playlist);

  return (
    <div>
      <Card
          className='playlist-card'
          hoverable
          cover={
            <div className='image-container' onClick={handlePlay}>
            <img alt={playlist.playlist} src={playlist.image} className='card-image' />
            <Button 
              className='card-button fav-icon' 
              // icon={<FavIcon />} 
              shape='circle'
              onClick={handleFavoriteToggle}>
                {playlist.isFavorite ? (
                      <HeartFilled className='heart-icon' />
                    ) : (
                      <HeartOutlined className='heart-icon' />
                    )}
              </Button>
            {/* <Button className='card-button-delete' icon={<CloseCircleOutlined className='delete-icon'/>} type="primary" shape='circle'/> */}
            </div>
            }
          actions={[
            
          ]}
        >
          <Card.Meta className='playlist-card-text' title={<div className='playlist-card-title-text'> {playlist.playlist}</div>} description={
            <div className='playlist-card-description-text'> {playlist.description } 
            </div>}
          />
        </Card>
    </div> 

  )
};

export default ReccomendedPlaylistCard;

