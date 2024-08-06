import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../context/Store';
import { SET_CURRENT_EPISODE, SET_PLAYING } from '../context/actions';
import AudioPlayer from './AudioPlayer';
import '../index.css';

const EpisodeList = ({ episodes }) => {
  const { dispatch } = useContext(Store);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  useEffect(() => {
    if (episodes && episodes.length > 0) {
      playEpisode(0);
    }
  }, [episodes]);

  if (!episodes || episodes.length === 0) {
    return <div style={{ fontWeight: "bold", color: 'black', textShadow: '1px 1px 5px #000000' }}>No episodes available</div>;
  }

  const playEpisode = (index) => {
    setCurrentEpisodeIndex(index);
    dispatch({ type: SET_CURRENT_EPISODE, payload: episodes[index] });
    dispatch({ type: SET_PLAYING, payload: true });
  };

  const playNextEpisode = () => {
    const nextIndex = (currentEpisodeIndex + 1) % episodes.length;
    playEpisode(nextIndex);
  };

  return (
    <div className="episode-list">
      <h2>Episodes</h2>
      {episodes.map((episode, index) => (
        <div key={episode.id} className="episode-item">
          {episode.episode_image && <img src={episode.episode_image} alt={episode.name} className="episode-image" />}
          <h3>{episode.name || 'Untitled Episode'}</h3>
          {episode.description && <p dangerouslySetInnerHTML={{ __html: episode.description }}></p>}
          {episode.file && (
            <AudioPlayer 
              audioUrl={episode.file}
              onPlay={() => playEpisode(index)}
              onEnded={playNextEpisode}
              autoPlay={index === currentEpisodeIndex}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;