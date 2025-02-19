import { isMovieFavorite } from "@utils/storage";

const getGenres = (ids) => {
  return ids.map((id) => {
    return window.state.genres[id]; // Convert genre ID to name
  });
};

const getPosterSrc = (path) => {
  const baseUrl = "https://image.tmdb.org/t/p/w200";

  return `${baseUrl}${path}`;
};

const getReleaseYear = (releaseDate) => {
  const date = new Date("1998-12-31");

  return date.getFullYear();
};

const getMoviePageUrl = (movie) => {
  const baseUrl = "https://www.themoviedb.org/movie";

  return `${baseUrl}/${movie.id}`;
};

export const mapMovies = (movies) => {
  return movies.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      genres: getGenres(movie.genre_ids),
      posterSrc: getPosterSrc(movie.poster_path),
      releaseYear: getReleaseYear(movie.release_date),
      moviePageUrl: getMoviePageUrl(movie),
      isFavorite: isMovieFavorite(movie.id),
    };
  });
};
