import React from "react";

export default function TrackSearchResult({ track, chooseTrack, isBookPage }) {
  function handlePlay() {
    chooseTrack(track);
  }
  console.log(track);

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer", ...(isBookPage ? { display: "none" } : {}) }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt=""
      />
      <div className="ml-3" style={{ flexGrow: 1, textAlign: "left" }}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
