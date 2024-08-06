import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../context/Store';
import { SET_CURRENT_SHOW } from '../context/actions';
import EpisodeList from './EpisodeList';
import Player from './Player';
import { fetchShowDetails } from '../services/api';
import   '../index.css';

const PodcastDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShowDetails = async () => {
      setLoading(true);
      let show = state.shows.find(show => show.id === id);
      if (!show) {
        try {
          show = await fetchShowDetails(id);
        } catch (error) {
          console.error("Error fetching show details:", error);
          setLoading(false);
          return;
        }
      }
      dispatch({ type: SET_CURRENT_SHOW, payload: show });
      setLoading(false);
    };

    getShowDetails();
  }, [id, state.shows, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!state.currentShow) {
    return <div>Show not found</div>;
  }

  return (
    <div className="podcast-details">
      <img src={state.currentShow.show_image} alt={state.currentShow.name} />
      <h1>{state.currentShow.name}</h1>
      <p>{state.currentShow.description}</p>
      <EpisodeList episodes={state.currentShow.episodes} />
      <Player />
    </div>
  );
};

export default PodcastDetails;