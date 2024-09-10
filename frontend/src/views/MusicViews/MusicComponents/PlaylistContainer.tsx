import { FC, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import '../MusicStyles/MusicContainer.styles.css';
import { IPlaylist, usePlaylist, withPlaylistProvider } from '../../../context/playlists-context';
import PlaylistCard from './PlaylistCard';
import Player from '../Player';

const { Title } = Typography;

interface PlaylistContainerProps {
  bookId: string;
}

const PlaylistContainer: FC<PlaylistContainerProps> = () => {
  const { recommendedPlaylists, favoritePlaylists } = usePlaylist();
  const [playingPlaylist, setPlayingPlaylist] = useState<IPlaylist>();
  function choosePlaylist(playlist: IPlaylist) {
    setPlayingPlaylist(playlist);
  }
  return (
    <div className="music-container">
      <Row>
        <Col span={12}>
          <Title
            level={4}
            className="playlist-row-title"
            style={{ marginTop: 0 }}
          >
            Favorite Playlists
          </Title>
        </Col>
        <Col span={12}>
          <Title
            level={4}
            className="playlist-row-title"
            style={{ marginTop: 0 }}
          >
            Reccomended Playlists
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]} justify="start">
            {favoritePlaylists.map((playlist) => (
              <Col span={8} key={playlist.id}>
                <PlaylistCard
                  playlist={playlist}
                  choosePlaylist={choosePlaylist}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]} justify="start">
            {recommendedPlaylists.map((playlist) => (
              <Col span={8} key={playlist.id}>
                <PlaylistCard
                  playlist={playlist}
                  choosePlaylist={choosePlaylist}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <div>
        <Player trackUri={playingPlaylist?.uri} />
      </div>
    </div>
  );
};

export default withPlaylistProvider(PlaylistContainer);
