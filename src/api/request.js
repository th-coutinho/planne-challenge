import TMDBClient from "tmdb-js";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDBClient(apiKey);

/**
 * Fetches movies from the TMDB search API based on the query.
 *
 * @param {string} query - The search query (e.g., movie title).
 * @returns {Promise<{ results: Array<Object>, total_results: number, page: number }>} A promise that resolves with the search results from the TMDB API.
 *   - `results`: The list of movie objects matching the search query.
 *   - `total_results`: The total number of matching movies.
 *   - `page`: The current page number of the results.
 *
 */
export const fetchSearchMovies = async (query) => {
  return tmdb.search.getMovies({ query });
};

export const fetchMovieGenres = async () => {
  return tmdb.genre.getMovieGenres();
};
