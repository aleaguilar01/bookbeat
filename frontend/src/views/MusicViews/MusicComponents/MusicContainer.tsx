
import React, { FC } from 'react';
import { Row, Col, Typography } from 'antd';
import FavouritePlayListRow from './FavouritePlaylistRow';
import ReccomendedPlayListRow from './ReccomendedPlaylistsRow';
import CustomPlayListRow from './CustomPlaylistRow';
import '../MusicStyles/MusicContainer.styles.css'
import { useHandlePlaylists } from '../../../hooks/useHandlePlaylists';

const { Title } = Typography;

interface MusicContainerProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any
}

const MusicContainer: FC<MusicContainerProps> = ({playlistSearchResults, setPlaylistSearch, choosePlaylist}) => {
  console.log("playlist search results inside music container", playlistSearchResults);
  const { updatePlaylistIsFavorite,
    createPlaylist,
    fetchPlaylistsByBook,
    fetchFavoritePlaylistsByBook,
    isLoading,
    fetchedFavoritePlaylists } = useHandlePlaylists();
  return (
    <div className="music-container">
      {/* Title for the Favorite Playlists section */}
      <Row>
          <Col span={24}>
            <Title level={2} className='music-container-title'>
              Music
            </Title>
          </Col>
      </Row>

      <FavouritePlayListRow 
        choosePlaylist={choosePlaylist} 
        fetchFavoritePlaylistsByBook={fetchFavoritePlaylistsByBook} 
        updatePlaylistIsFavorite={updatePlaylistIsFavorite} 
        fetchedFavoritePlaylists={fetchedFavoritePlaylists}
      />
      <ReccomendedPlayListRow 
        playlistSearchResults={playlistSearchResults} 
        setPlaylistSearch={setPlaylistSearch} 
        choosePlaylist={choosePlaylist} 
        createPlaylist={createPlaylist} 
        fetchPlaylistsByBook={fetchPlaylistsByBook} 
        updatePlaylistIsFavorite={updatePlaylistIsFavorite}
      />
      {/* <CustomPlayListRow /> */}
    </div>
  );
};

export default MusicContainer;