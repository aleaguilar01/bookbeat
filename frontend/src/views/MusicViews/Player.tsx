import { useState, useEffect, FC } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useAuth } from '../../context/auth-context';

interface PlayerProps {
  trackUri: string;
}

const Player: FC<PlayerProps> = ({ trackUri }) => {
  //// Getting Spotify Auth Token
  const { user } = useAuth();

  const [play, setPlay] = useState<any>(false);

  useEffect(() => setPlay(true), [trackUri]);
  if (!user.spotifyToken.access_token) return null;

  return (
    <div>
      <SpotifyPlayer
        token={user.spotifyToken.access_token}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}

export default Player
