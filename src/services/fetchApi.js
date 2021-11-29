import axios from "axios";

const API_KEY = "74a210d9545ac2133ea9f3ec78679de8";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: API_KEY,
};

export const fetchTrendingMovies = async () => {
  const queryString = `trending/movie/day`;
  const movies = await axios.get(queryString);

  return movies.data;
};

export const searchMovies = async (stringToSearch) => {
  const queryString = `search/movie?language=en-US&page=1&include_adult=false&query=${stringToSearch}`;
  const movies = await axios.get(queryString);

  return movies.data;
};

export const getMovieDetails = async (movieId) => {
  const queryString = `movie/${movieId}?language=en-US`;
  const movie = await axios.get(queryString);

  return movie.data;
};

export const getMovieCast = async (movieId) => {
  const queryString = `movie/${movieId}/credits?language=en-US`;
  const data = await axios.get(queryString);

  return data.data;
};

export const getReviews = async (movieId) => {
  const queryString = `movie/${movieId}/reviews?language=en-US`;
  const data = await axios.get(queryString);

  return data.data;
};
