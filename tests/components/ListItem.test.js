import { describe, it, expect } from "vitest";
import ListItem from "@components/ListItem";
import { highlightSearchedQuery } from "@utils/dataTransform";

describe("ListItem Component", () => {
  const mockMovie = {
    id: 123,
    originalTitle: "Matrix",
    title: "Matrix",
    moviePageUrl: "https://www.themoviedb.org/movie/123-matrix",
    posterSrc: "https://image.tmdb.org/t/p/w200/poster.jpg",
    releaseYear: "1999",
    genres: ["Sci-Fi", "Action"],
    isFavorite: true,
  };

  it("renders the movie title with highlighted search query", () => {
    const query = "Mat";
    const component = ListItem({ movie: mockMovie, query });

    const expectedHighlightedTitle = highlightSearchedQuery({
      query,
      title: mockMovie.originalTitle,
    });

    expect(component).toContain(expectedHighlightedTitle);
  });

  it("sets the correct id and data-id attributes", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(`id="${mockMovie.id}"`);
    expect(component).toContain(`data-id="${mockMovie.id}"`);
  });

  it("includes the correct movie link", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(
      `href="${mockMovie.moviePageUrl}" target="_blank" rel="noopener noreferrer"`
    );
  });

  it("displays the correct movie poster", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(`data-src="${mockMovie.posterSrc}"`);
    expect(component).toContain(`alt="Movie Poster"`);
  });

  it("displays the correct release year", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(
      `<date class="search-section__year">(1999)</date>`
    );
  });

  it("renders the correct genres", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(
      `<span class="search-section__tag">Sci-Fi</span>`
    );
    expect(component).toContain(
      `<span class="search-section__tag">Action</span>`
    );
  });

  it("adds 'favorite' class if the movie is marked as favorite", () => {
    const component = ListItem({ movie: mockMovie, query: "" });

    expect(component).toContain(`class="search-section__item favorite"`);
  });

  it("does not add 'favorite' class if the movie is not a favorite", () => {
    const nonFavoriteMovie = { ...mockMovie, isFavorite: false };
    const component = ListItem({ movie: nonFavoriteMovie, query: "" });

    expect(component).not.toContain(`class="search-section__item favorite"`);
  });
});
