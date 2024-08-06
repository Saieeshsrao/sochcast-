import React, { useRef } from 'react';
import '../index.css';
import { useEffect } from 'react';
const AudioPlayer = ({ audioUrl, onPlay, onEnded, autoPlay }) => {
  const audioRef = useRef(null);

    useEffect(() => {
    if (autoPlay) {
      audioRef.current.play();
    }
  }, [autoPlay]);

  const handlePlay = () => {
    audioRef.current.play();
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} controls onEnded={onEnded}
        onPlay={handlePlay}   />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default AudioPlayer;