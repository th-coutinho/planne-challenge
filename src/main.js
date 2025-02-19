import "./style.css";
import "./styles/main.scss";

import { fetchSearchMovies } from "@api/request";
import { mapByOriginalName } from "@utils/dataTransform";
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

const fillMovieList = (results) => {
  const moviesList = document.querySelector("#movies");
  moviesList.innerHTML = "";

  results.forEach((movie) => {
    const movieElement = document.createElement("li");
    movieElement.classList.add("search-section__result-item");
    movieElement.textContent = movie;
    moviesList.appendChild(movieElement);
  });
};

// searchMovies("matrix");

document.querySelector("#app").innerHTML = `
  <section class='search-section'>

    <legend class='search-section__legend'>Pesquise um filme</legend>
    <input id='search' class='search-section__input' placeholder='Ex: Star Wars' type='search' />
    <span class='search-section__hint'>Utilize as teclas ↓ ↑ para navegar entre as opções</span>

    <ul id='movies' class='search-section__results-list'></ul>

  </section>
`;

const setupSearch = () => {
  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("blur", searchMovies);
};

const searchMovies = async (e) => {
  const query = e.target.value;
  const response = await fetchSearchMovies(query);
  const movies = response.results;
  const originalNames = mapByOriginalName(movies);

  fillMovieList(originalNames);
};

setupSearch();
