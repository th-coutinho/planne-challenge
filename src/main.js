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
    const highlightedTitle = highlightSearchedQuery({
      query: window.state.searchQuery,
      title: movie.originalTitle,
    });

    const template = `
      <li
        tabindex="-1"
        class="search-section__item">

        <div class="search-section__col">
          <img class="search-section__img" data-src="${
            movie.posterSrc
          }" alt="Movie Poster" loading="lazy"/>
        </div>

        <div class="search-section__col">
          <div>
            <h6 class="search-section__title">${highlightedTitle}</h6>
            <date class="search-section__year">(${movie.releaseYear})</date>
          </div>

          <ul class="search-section__tags">
            ${
              movie.genres
                .map((tag) => {
                  return `<span class="search-section__tag">${tag}</span>`;
                })
                .join("") /* avoid commas to be rendered */
            }
          </ul>
        </div>
      </li>
    `;

    // Convert string into real DOM nodes
    const listItemElement = document
      .createRange()
      .createContextualFragment(template);

    moviesList.appendChild(listItemElement);
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

    <ul id='movies' class='search-section__list'></ul>

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
