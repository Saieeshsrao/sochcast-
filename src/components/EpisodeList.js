import React, { useContext } from 'react';
import { Store } from '../context/Store';
import { SET_CURRENT_EPISODE, SET_PLAYING } from '../context/actions';
import '../index.css';
const EpisodeList = ({ episodes }) => {
  const { dispatch } = useContext(Store);

  if (!episodes || episodes.length === 0) {
    return <div style={{ fontWeight: "bold", color: 'black',textShadow: '1px 1px 5px #000000' }}>No episodes available</div>;
  }

  return (
    <div className="episode-list">
      <h2>Episodes</h2>
      {episodes.map(episode => (
        <div key={episode.id} className="episode-item">
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          <button onClick={() => {
            dispatch({ type: SET_CURRENT_EPISODE, payload: episode });
            dispatch({ type: SET_PLAYING, payload: true });
          }}>
            Play Episode
          </button>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;

