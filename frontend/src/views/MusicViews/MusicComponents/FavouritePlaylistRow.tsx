import { Card, Row, Col, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FavouritePlaylistCard from "./FavouritePlaylistCard";
import {
  IPlaylist,
  useHandlePlaylists,
} from "../../../hooks/useHandlePlaylists";
import { useState, useEffect } from "react";

const { Title } = Typography;

interface FavoritePlaylistRowProps {
  bookId?: string;
  title: string;
  choosePlaylist: any;
  fetchFavoritePlaylistsByBook: Function;
  updatePlaylistIsFavorite: Function;
  fetchedFavoritePlaylists: Array<IPlaylist>;
}

const MAX_PLAYLISTS = 4;

const FavouritePlayListRow: React.FC<FavoritePlaylistRowProps> = ({
  updatePlaylistIsFavorite,
  bookId,
  choosePlaylist,
  fetchedFavoritePlaylists,
  fetchFavoritePlaylistsByBook,
  title
}) => {
  // const [fetchedFavoritePlaylists, setFetchedFavoritePlaylists] = useState([]);
  // const [favoriteCardData, setFavoriteCardData] = useState([])

  useEffect(() => {
    if (bookId) {
      fetchFavoritePlaylistsByBook(bookId);
    }
  }, []);

  // useEffect(() => {
  //   if(bookId){
  //     fetchFavoritePlaylistsByBook(bookId)
  //   }
  // const fetchData = async () => {
  //   try {
  //     const playlists = await fetchFavoritePlaylistsByBook();
  //     // Transform the data to include only required fields
  //     const transformedPlaylists = playlists.map(playlist => ({
  //       id: playlist.id,
  //       playlistId: playlist.playlistId,
  //       playlist: playlist.playlist.playlist, // Nested field
  //       description: playlist.playlist.description, // Nested field
  //       uri: playlist.playlist.uri, // Nested field
  //       image: playlist.playlist.image, // Nested field
  //       createdAt: playlist.createdAt,
  //       updatedAt: playlist.updatedAt,
  //       isFavorite: playlist.isFavorite
  //     }));

  //     console.log("Transformed favorite playlists:", transformedPlaylists);
  //     setFetchedFavoritePlaylists(transformedPlaylists);
  //   } catch (error) {
  //     console.error("Error fetching favorite playlists:", error);
  //   }
  // };

  // fetchData();
  // }, []);

  // useEffect(() => {
  //   // Consolidate both fetchedPlaylists and playlistSearchResults
  //   const allPlaylists = [
  //     ...fetchedFavoritePlaylists
  //   ];

  //   // Remove duplicates based on 'uri'
  //   const uniquePlaylists = Array.from(new Map(
  //     allPlaylists.map(playlist => [playlist.uri, playlist])
  //   ).values()).slice(0, MAX_PLAYLISTS);
  //   console.log(uniquePlaylists, "uniquePlaylist")
  //   setFavoriteCardData(uniquePlaylists);
  // }, [fetchedFavoritePlaylists]);

  // const handleFavoriteChange = (playlistId: string, isFavorite: boolean) => {
  //   setFavoriteCardData(prevData =>
  //     prevData.map(playlist =>
  //       playlist.id === playlistId ? { ...playlist, isFavorite } : playlist
  //     )
  //   );
  // };

  // Limit the number of playlists rendered to MAX_PLAYLISTS

  return (
    <div>
      {/* Title for the Favorite Playlists section */}
      <Row>
        <Col span={24}>
          <Title level={3} className="playlist-row-title">
            Favourite Playlists for -{title}-
          </Title>
        </Col>
      </Row>
      {/* Playlists Row */}
      <Row gutter={[16, 16]} justify="start">
        {fetchedFavoritePlaylists.map((playlist: any, index) => (
          <Col span={4} key={playlist.id}>
            <FavouritePlaylistCard
              updatePlaylistIsFavorite={updatePlaylistIsFavorite}
              playlist={playlist}
              choosePlaylist={choosePlaylist}
              bookId={bookId} /*onFavoriteChange={handleFavoriteChange}*/
            />
          </Col>
        ))}

        {/* Render a single + button in the next available slot if there's space */}
        {/* {playlists.length < MAX_PLAYLISTS && (
      <Col span={4}>
        <Card
          hoverable
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Button
            icon={<PlusOutlined />}
            type="primary"
            shape="circle"
            size="large"
          />
        </Card>
      </Col>
    )} */}
      </Row>
    </div>
  );
};

export default FavouritePlayListRow;
