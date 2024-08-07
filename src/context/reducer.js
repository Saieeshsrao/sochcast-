import { SET_SHOWS, SET_CURRENT_SHOW, SET_CURRENT_EPISODE, SET_PLAYING } from './actions';

const initialState = {
  shows: [],
  episodes: [], // Ensure episodes are part of the initial state

};

const reducer = (state = initialState, action) => {
  console.log("Reducer called with action:", action.type, "and payload:", action.payload);
  switch (action.type) {
    case SET_SHOWS:
      return { ...state, shows: Array.isArray(action.payload) ? action.payload : [] };
    case SET_CURRENT_SHOW:
      console.log("Setting current show:", action.payload);
      return { ...state, currentShow: action.payload, episodes: action.payload.results || [] }; // Set episodes
    case SET_CURRENT_EPISODE:
      return { ...state, currentEpisode: action.payload };
    case SET_PLAYING:
      return { ...state, playing: action.payload };
    default:
      return state;
  }
};

export default reducer;