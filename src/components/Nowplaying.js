import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../context/Store';
import { SET_CURRENT_EPISODE, SET_PLAYING } from '../context/actions';
import '../index.css';

const NowPlayingBar = ({ episodes }) => {
  const { state, dispatch } = useContext(Store);
  const [progress, setProgress] = useState(0);
  const currentEpisode = state.currentEpisode;

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      const updateProgress = () => {
        const value = (audio.currentTime / audio.duration) * 100;
        setProgress(value);
      };
      audio.addEventListener('timeupdate', updateProgress);
      return () => audio.removeEventListener('timeupdate', updateProgress);
    }
  }, [currentEpisode]);

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

  console.log("1234567890",currentEpisode);
  return (
    <div className="now-playing-bar">
      <div className="now-playing-info">

        <img src={currentEpisode.episode_image} alt={currentEpisode.name} className="now-playing-image" />
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
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <audio 
        src={currentEpisode.file} 
        // autoPlay={state.playing}
        // onEnded={playNext}
      />
    </div>
  );
};

export default NowPlayingBar;