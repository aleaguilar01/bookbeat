import React, { FC } from "react";
import { Row, Col, Typography, Flex } from "antd";
import FavouritePlayListRow from "./FavouritePlaylistRow";
import ReccomendedPlayListRow from "./ReccomendedPlaylistsRow";
import "../MusicStyles/MusicContainer.styles.css";
import { useHandlePlaylists } from "../../../hooks/useHandlePlaylists";

const { Title } = Typography;

interface MusicContainerProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any;
  bookId: string;
  title: string;
  isBookPage: boolean;
}

const MusicContainer: FC<MusicContainerProps> = ({
  playlistSearchResults,
  setPlaylistSearch,
  choosePlaylist,
  bookId,
  title,
  isBookPage,
}) => {
  console.log(
    "playlist search results inside music container",
    playlistSearchResults
  );
  const {
    updatePlaylistIsFavorite,
    createPlaylist,
    fetchPlaylistsByBook,
    fetchFavoritePlaylistsByBook,
    fetchedFavoritePlaylists,
  } = useHandlePlaylists();
  return (
    <div className="music-container">
      {/* Title for the Favorite Playlists section */}
      {!isBookPage && (
        <Row>
          <Col span={24}>
            <Title level={2} className="music-container-title">
              Music
            </Title>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={12}>
          <Title
            level={3}
            className="playlist-row-title"
            style={{ marginTop: 0 }}
          >
            Favourite Playlists
          </Title>
        </Col>
        <Col span={12}>
          <Title
            level={3}
            className="playlist-row-title"
            style={{ marginTop: 0 }}
          >
            Reccomended Playlists{" "}
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FavouritePlayListRow
            choosePlaylist={choosePlaylist}
            fetchFavoritePlaylistsByBook={fetchFavoritePlaylistsByBook}
            updatePlaylistIsFavorite={updatePlaylistIsFavorite}
            fetchedFavoritePlaylists={fetchedFavoritePlaylists}
            bookId={bookId}
            title={title}
          />
        </Col>
        <Col span={12}>
          <ReccomendedPlayListRow
            playlistSearchResults={playlistSearchResults}
            setPlaylistSearch={setPlaylistSearch}
            choosePlaylist={choosePlaylist}
            createPlaylist={createPlaylist}
            fetchPlaylistsByBook={fetchPlaylistsByBook}
            updatePlaylistIsFavorite={updatePlaylistIsFavorite}
            bookId={bookId}
            title={title}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MusicContainer;
