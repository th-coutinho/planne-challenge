import "./style.css";
import "./styles/main.scss";

import { fetchSearchMovies, fetchMovieGenres } from "@api/request";
import {
  mapByOriginalName,
  highlightSearchedQuery,
} from "@utils/dataTransform";
import { mapMovies } from "@mappers/movie";

window.state = {
  searchQuery: "",
  movies: [],
  genres: [],
  currentPage: 1,
  totalPages: 1,
};

/*
  Why Use tabindex?
  tabindex="0" → Makes the element focusable in natural tab order.
  tabindex="-1" → Makes it focusable programmatically (not via keyboard Tab).
*/

const fillMovieList = async (movies) => {
  const moviesList = document.querySelector("#movies");
  moviesList.innerHTML = "";
  const mappedMovies = mapMovies(movies);

  mappedMovies.forEach((movie) => {
    const movieElement = document.createElement("li");

    // Handle component props
    movieElement.classList.add("search-section__results-list__item");
    movieElement.setAttribute("tabindex", "-1");

    // Handles and highlight the query in title
    const highlightedTitle = highlightSearchedQuery({
      query: window.state.searchQuery,
      title: movie.originalTitle,
    });

    movieElement.innerHTML = highlightedTitle;

    // moviesList.appendChild(movieElement);

    // Create a container for genres
    const genresContainer = document.createElement("span");
    genresContainer.classList.add("genres-container");

    // Assuming `movieGenres` is an array of genre IDs for this movie
    movie.genres.forEach((genre) => {
      const genreElement = document.createElement("span");
      genreElement.classList.add("genre-tag");
      genreElement.textContent = genre; // Convert genre ID to name
      genresContainer.appendChild(genreElement);
    });

    // // Append genres to the movie element
    movieElement.appendChild(genresContainer);

    const imgElement = document.createElement("img");
    imgElement.dataset.src = movie.posterSrc;
    imgElement.alt = "Movie Poster";
    imgElement.loading = "lazy";

    movieElement.appendChild(imgElement);

    // // Append movie element to the list
    moviesList.appendChild(movieElement);
  });
};

const renderGenreTagsForIds = (idsList) => {
  idsList.forEach((id) => {
    const genreElement = document.createElement("span");
    genreElement.classList.add("genre-tag");
    genreElement.textContent = getGenreEnum()[id];
    document.querySelector("#genres").appendChild(genreElement);
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

const setupArrowNavigationBehavior = () => {
  const list = document.getElementById("movies");
  const items = Array.from(list.querySelectorAll("li"));

  let currentIndex = 0;

  function updateFocus(index) {
    items.forEach((item) => item.classList.remove("focused"));
    items[index].classList.add("focused");

    // Lazy load images
    items[index].querySelector("img").src =
      items[index].querySelector("img").dataset.src;

    debugger;
    items[index].focus();
  }

  list.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent scrolling
      currentIndex = (currentIndex + 1) % items.length; // Loop navigation
      updateFocus(currentIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateFocus(currentIndex);
    }
  });

  // Initialize first focus
  updateFocus(currentIndex);
};

const searchMovies = async (e) => {
  const query = e.target.value;

  window.state.searchQuery = query;

  const fetchedGenres = await fetchMovieGenres(query);

  const genres = fetchedGenres.genres.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  window.state = {
    ...window.state,
    genres,
  };

  const response = await fetchSearchMovies(query);
  const movies = response.results;

  window.state = {
    ...window.state,
    movies,
  };

  fillMovieList(movies);
  setupArrowNavigationBehavior();
};

setupSearch();
