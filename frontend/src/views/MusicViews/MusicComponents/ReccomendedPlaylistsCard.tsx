
import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import '../MusicStyles/PlaylistCard.styles.css'
import FavIcon from './FavIcon';



type Playlist = {
  playlist: string;
  description: string;
  image: string;
  uri: string
};

type ReccomendedPlaylistCardProps = {
  playlist: Playlist;
  choosePlaylist: any
};


const ReccomendedPlaylistCard: React.FC<ReccomendedPlaylistCardProps> = ({ playlist, choosePlaylist }) => {
  
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
            <Button className='card-button fav-icon' icon={<FavIcon />} type="primary" shape='circle'/>
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

