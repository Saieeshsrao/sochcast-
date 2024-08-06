import React, { useContext, useEffect, useRef } from 'react';
import { Store } from '../context/Store';
import { SET_PLAYING } from '../context/actions';

const Player = () => {
  const { state, dispatch } = useContext(Store);
  const audioRef = useRef(null);

  useEffect(() => {
    if (state.playing && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [state.playing, state.currentEpisode]);

  if (!state.currentEpisode) {
    return null;
  }

  return (
    <div className="player">
      <h3>Now Playing: {state.currentEpisode.name}</h3>
      <audio
      
        ref={audioRef}
        src={state.currentEpisode.file}
        controls
        onPlay={() => dispatch({ type: SET_PLAYING, payload: true })}
        onPause={() => dispatch({ type: SET_PLAYING, payload: false })}
      />
    </div>
  );
};

export default Player;