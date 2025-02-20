/*
  Why Use tabindex?
  tabindex="0" → Makes the element focusable in natural tab order.
  tabindex="-1" → Makes it focusable programmatically (not via keyboard Tab).
*/
import { highlightSearchedQuery } from "@utils/dataTransform";

export default ({ movie, query }) => {
  const highlightedTitle = highlightSearchedQuery({
    query,
    title: movie.originalTitle,
  });

  return `
  <li
    id="${movie.id}"
    data-id="${movie.id}"
    tabindex="-1"
    class="search-section__item ${movie.isFavorite && "favorite"}">
    <a href="${movie.moviePageUrl}" target="_blank" rel="noopener noreferrer">

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
    </a>
  </li>
`;
};
