import { Row, Col, Typography } from "antd";
import ReccomendedPlaylistCard, { BBPlaylist } from "./ReccomendedPlaylistsCard";
import "../MusicStyles/PlaylistRow.styles.css";
import { useState, useEffect } from "react";
import { SPPlaylist } from "../../../hooks/usePlaylistSearch";


interface ReccomendedPlaylistRowProps {
  playlistSearchResults: any;
  setPlaylistSearch: any;
  choosePlaylist: any;
  // onFavoriteChange: any;
  bookId?: string;
  createPlaylist: Function;
  fetchPlaylistsByBook: Function;
  updatePlaylistIsFavorite: Function;
  title: string;
}

const ReccomendedPlayListRow: React.FC<ReccomendedPlaylistRowProps> = ({
  updatePlaylistIsFavorite,
  createPlaylist,
  fetchPlaylistsByBook,
  playlistSearchResults,
  choosePlaylist,
  bookId,
}) => {

  const [fetchedPlaylists, setFetchedPlaylists] = useState<Array<BBPlaylist>>([]);

  const fetchData = async () => {
    try {
      const playlists = await fetchPlaylistsByBook(bookId);
      // Transform the data to include only required fields

      console.log("Transformed playlists:", playlists);
      setFetchedPlaylists(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  /// Fecth Playlist By Book
  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if(playlistSearchResults && playlistSearchResults.length >0){
      addPlaylistsToDB(playlistSearchResults);
    }
   
  }, [playlistSearchResults]);

  const addPlaylistsToDB = async (reccomendedCardData: Array<SPPlaylist>) => {

    for (const playlist of reccomendedCardData) {
      // Call createPlaylist to add the playlist to the database
      try {
        console.log("Creating playlist with data:", playlist); // Add this line
        await createPlaylist({
          id: playlist.spotifyId,
          playlist: playlist.playlist,
          description: playlist.description,
          uri: playlist.uri,
          image: playlist.image,
          userBookId: bookId,
        }).then(()=> fetchData());
      } catch (error) {
        console.error("Error adding playlist to database:", error);
      }
    }
  };

  // Limit the number of playlists rendered to MAX_PLAYLISTS
  const MAX_PLAYLISTS = 3;

  const displayedPlaylists = fetchedPlaylists.slice(0, MAX_PLAYLISTS);
  return (
    <Row gutter={[16, 16]} justify="start">
      {displayedPlaylists.map((playlist) => (
        <Col span={8} key={playlist.id}>
          <ReccomendedPlaylistCard
            updatePlaylistIsFavorite={updatePlaylistIsFavorite}
            playlist={playlist}
            choosePlaylist={choosePlaylist}
            bookId={bookId}
            refetch={fetchData}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ReccomendedPlayListRow;
