import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../context/Store';
import { SET_CURRENT_SHOW } from '../context/actions';
import EpisodeList from './EpisodeList';
import CustomAudioPlayer from './AudioPlayer';
import { fetchShowDetails } from '../services/api';
import '../index.css';

const PodcastDetails = () => {
  const { slug } = useParams();
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShowDetails = async () => {
      setLoading(true);
      try {
        const showData = await fetchShowDetails(slug);
        dispatch({ type: SET_CURRENT_SHOW, payload: showData });
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setLoading(false);
      }
    };

    getShowDetails();
  }, [slug, dispatch]);

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
      <p dangerouslySetInnerHTML={{ __html: state.currentShow.description }}></p>
      <EpisodeList episodes={state.currentShow.results || []} />
      <CustomAudioPlayer />
    </div>
  );
};

export default PodcastDetails;