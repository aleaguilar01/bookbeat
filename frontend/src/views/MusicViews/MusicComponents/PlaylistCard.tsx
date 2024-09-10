import { FC } from 'react';
import { Card, Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import '../MusicStyles/PlaylistCard.styles.css';
import { IPlaylist, usePlaylist } from '../../../context/playlists-context';

type PlaylistCardProps = {
  playlist: IPlaylist;
  choosePlaylist: (playlist: IPlaylist) => void;
};

const PlaylistCard: FC<PlaylistCardProps> = ({ playlist, choosePlaylist }) => {
  const { handleFavoriteToggle } = usePlaylist();
  const handlePlay = () => {
    choosePlaylist(playlist);
  };

  return (
    <div>
      <Card
        className="playlist-card"
        hoverable
        cover={
          <div className="image-container" onClick={handlePlay}>
            <img
              alt={playlist.playlist}
              src={playlist.image}
              className="card-image"
            />
            <Button
              className="card-button fav-icon"
              shape="circle"
              onClick={() =>
                handleFavoriteToggle(!playlist.isFavorite, playlist.id)
              }
            >
              {playlist.isFavorite ? (
                <HeartFilled className="heart-icon" />
              ) : (
                <HeartOutlined className="heart-icon" />
              )}
            </Button>
          </div>
        }
      >
        <Card.Meta
          className="playlist-card-text"
          title={
            <div className="playlist-card-title-text"> {playlist.playlist}</div>
          }
          description={
            <div className="playlist-card-description-text">
              {playlist.description}
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default PlaylistCard;
