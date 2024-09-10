import { FC } from 'react';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import MusicContainer from './MusicComponents/MusicContainer';
import PlaylistSearchPage from './PlaylistSearchBar';
import { usePlaylistSearch } from '../../hooks/usePlaylistSearch';
import { useSongSearch } from '../../hooks/useSongSearch';
import { BBPlaylist } from './MusicComponents/ReccomendedPlaylistsCard';

interface MusicDashboardProps {
  bookId: string;
  title: string;
  author?: string;
  isBookPage?: boolean;
}

const MusicDashboard: FC<MusicDashboardProps> = ({
  bookId,
  title,
  author,
  isBookPage = false,
}) => {
  const [playingTrack, setPlayingTrack] = useState<any>();
  const { setSearch, search, searchResults } = useSongSearch();
  const {
    playlistSearch,
    setPlaylistSearch,
    playlistSearchResults,
    playlistSearchError,
  } = usePlaylistSearch();
  const [playingPlaylist, setPlayingPlaylist] = useState<BBPlaylist>();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
  }

  function choosePlaylist(playlist: BBPlaylist) {
    setPlayingPlaylist(playlist);
  }

  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ height: isBookPage ? 375 : '100vh' }}
    >
      {!isBookPage && (
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <div
        className="flex-grow-1"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            isBookPage={isBookPage}
          />
        ))}
        {searchResults.length === 0 && (
          <div>
            <PlaylistSearchPage
              setPlaylistSearch={setPlaylistSearch}
              playlistSearchError={playlistSearchError}
              playlistSearch={playlistSearch}
              title={title}
              author={author}
              isBookPage={isBookPage}
            />
            <MusicContainer
              playlistSearchResults={playlistSearchResults}
              setPlaylistSearch={setPlaylistSearch}
              choosePlaylist={choosePlaylist}
              bookId={bookId}
              title={title}
              isBookPage={isBookPage}
            />
          </div>
        )}
      </div>

      <div>
        <Player trackUri={playingTrack?.uri || playingPlaylist?.uri} />
      </div>
    </Container>
  );
};

export default MusicDashboard;
