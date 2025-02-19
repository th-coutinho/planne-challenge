/*
  {
    "adult": false,
    "backdrop_path": null,
    "genre_ids": [],
    "id": 555879,
    "original_language": "en",
    "original_title": "Matrix",
    "overview": "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
    "popularity": 4.841,
    "poster_path": "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
    "release_date": "1998-12-31",
    "title": "Matrix",
    "video": false,
    "vote_average": 7.083,
    "vote_count": 48
  }
*/

import { fetchMovieGenres } from "@api/request";

const getGenres = (ids) => {
  return ids.map((id) => {
    return window.state.genres[id]; // Convert genre ID to name
  });
};

const getPosterSrc = (path) => {
  const baseUrl = "https://image.tmdb.org/t/p/w300";

  return `${baseUrl}${path}`;
};

const getReleaseYear = (releaseDate) => {
  const date = new Date("1998-12-31");

  return date.getFullYear();
};

const getMoviePageUrl = (title) => {
  return `https://www.imdb.com/title/${title}`;
};

export const mapMovies = (movies) => {
  return movies.map((movie) => {
    return {
      title: movie.title,
      originalTitle: movie.original_title,
      genres: getGenres(movie.genre_ids),
      posterSrc: getPosterSrc(movie.poster_path),
      releaseYear: getReleaseYear(movie.release_date),
      moviePageUrl: getMoviePageUrl(movie.title),
    };
  });
};
