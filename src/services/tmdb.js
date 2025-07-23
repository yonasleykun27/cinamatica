// src/services/tmdb.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

export const fetchMovies = async (query = '') => {
  try {
    const endpoint = query
      ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    
    const response = await axios.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw new Error('Failed to fetch movies. Please check your API key.');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
    return response.data;
  } catch (error) {
    console.error("TMDB Movie Details Error:", error);
    return null;
  }
};