const FAVORITES_KEY = "favoriteMovies";

export const toggleFavorite = (movieId) => {
  const favoriteMovies = window.localStorage.getItem(FAVORITES_KEY);
  let favoriteMoviesList = favoriteMovies ? JSON.parse(favoriteMovies) : [];

  if (!isMovieFavorite(movieId)) {
    favoriteMoviesList.push(movieId);
  } else {
    favoriteMoviesList = favoriteMoviesList.filter((id) => id !== movieId);
  }

  window.localStorage.setItem(
    "favoriteMovies",
    JSON.stringify(favoriteMoviesList)
  );
};

export const isMovieFavorite = (movieId) => {
  const favoriteMovies = window.localStorage.getItem(FAVORITES_KEY);
  return favoriteMovies && favoriteMovies.includes(movieId);
};
