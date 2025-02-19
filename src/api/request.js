import TMDBClient from "tmdb-js";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDBClient(apiKey);

export const fetchSearchMovies = async (query) => {
  return tmdb.search.getMovies({ query });
};
