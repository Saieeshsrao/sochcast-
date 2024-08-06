import React, { useContext } from 'react';
import { Store } from '../context/Store';
import { SET_CURRENT_EPISODE, SET_PLAYING } from '../context/actions';
import '../index.css';

const NowPlayingBar = ({ episodes }) => {
  const { state, dispatch } = useContext(Store);
  const currentEpisode = state.currentEpisode;

  if (!currentEpisode) return null;

  const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);

  const playPrevious = () => {
    const prevIndex = (currentIndex - 1 + episodes.length) % episodes.length;
    dispatch({ type: SET_CURRENT_EPISODE, payload: episodes[prevIndex] });
    dispatch({ type: SET_PLAYING, payload: true });
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % episodes.length;
    dispatch({ type: SET_CURRENT_EPISODE, payload: episodes[nextIndex] });
    dispatch({ type: SET_PLAYING, payload: true });
  };

  const togglePlay = () => {
    dispatch({ type: SET_PLAYING, payload: !state.playing });
  };

  return (
    <div className="now-playing-bar">
      <div className="now-playing-info">
        <img src={currentEpisode.image} alt={currentEpisode.name} className="now-playing-image" />
        <div className="now-playing-details">
          <h3>{currentEpisode.name}</h3>
          <p>{currentEpisode.show_name}</p>
        </div>
      </div>
      <div className="now-playing-controls">
        <button onClick={playPrevious}>Previous</button>
        <button onClick={togglePlay}>{state.playing ? 'Pause' : 'Play'}</button>
        <button onClick={playNext}>Next</button>
      </div>
      <audio 
        src={currentEpisode.audio_url} 
        autoPlay={state.playing}
        onEnded={playNext}
      />
    </div>
  );
};

export default NowPlayingBar;