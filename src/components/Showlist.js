import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../context/Store';
import { fetchShows } from '../services/api';
import { SET_SHOWS } from '../context/actions';
import '../index.css';
const ShowList = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    const getShows = async () => {
      if (state.shows.length === 0) { 
      try {
        const showsData = await fetchShows();
        console.log("Fetched shows data:", showsData);
        const sortedShows = showsData.results.sort((a, b) => a.id - b.id);
        dispatch({ type: SET_SHOWS, payload: sortedShows });
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    }
    };

    getShows();
  }, [dispatch]);

  console.log("ShowList render - state.shows:", state.shows);

  if (!Array.isArray(state.shows) || state.shows.length === 0) {
    return <div>Loading shows...</div>;
  }

  return (
    <div>
      <h1 style={{textAlign: 'center' }}>Shows List</h1>
      <div className="show-list">
        {state.shows.map(show => (
          <Link key={show.id} to={`/podcast/${show.id}`} className="show-card">
            <img src={show.show_image} alt={show.name} />
            <h2>{show.name}</h2>
            <h3>By {show.hosts[0].first_name} {show.hosts[0].last_name}</h3>
          </Link>
          
        )
        )}
        
      </div>
    </div>
  );
};

export default ShowList;