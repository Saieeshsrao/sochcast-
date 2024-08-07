import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../context/Store';
import { SET_CURRENT_EPISODE, SET_PLAYING } from '../context/actions';
import '../index.css';

const EpisodeList = ({ episodes }) => {
  const { state, dispatch } = useContext(Store);
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

  console.log("1234567890",episodes[0].shows[0].hosts[0].first_name);
  return (
    <div className="episode-list">
      <h2>All Episodes</h2>
      {episodes.map((episode, index) => (
        <div key={episode.id} className="episode-item" onClick={() => playEpisode(index)}>
          <span>{index + 1}. </span>
          {episode.episode_image && <img src={episode.episode_image} alt={episode.name} className="episode-image" />}
          <div className="episode-details">
            <h3>{episode.name || 'Untitled Episode'}</h3>
            <p>By {episode.shows[0].hosts[0].first_name} {episode.shows[0].hosts[0].last_name}</p>
            <p>Published on <b>{episode.publish_date}</b></p>
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;