import React from 'react'
import { cursorTo } from 'readline'

export default function TrackSearchResult({track, chooseTrack}) {
  
  function handlePlay() {
    chooseTrack(track);
  }
  
  return (
    <div 
      className="d-flex m-2 align-items-center" 
      style={{cursor: 'pointer'}}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{height: '64px', width: '64px'}} alt="" />
      <div className='ml-3' style={{ flexGrow: 1, textAlign: 'left' }}>
        <div>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </div>
    </div>
  )
}
