import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({trackUri}) {
  return (
    <div>
      <SpotifyPlayer
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  )
}
