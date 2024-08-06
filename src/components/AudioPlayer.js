import React, { useRef } from 'react';
import '../index.css';
const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} controls />
      <button onClick={playAudio}>Play</button>
    </div>
  );
};

export default AudioPlayer;