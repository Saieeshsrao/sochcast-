import axios from 'axios';

const API_URL = 'https://beta.sochcast.com/api/v1/listener/sochcast-originals';

export const fetchShows = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
};

export const fetchShowDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("Show details API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching show details:", error);
    throw error;
  }
};