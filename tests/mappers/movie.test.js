import { describe, it, expect, vi } from "vitest";
import { mapMovies } from "@mappers/movie";
import { isMovieFavorite } from "@utils/storage";

// Mock the `isMovieFavorite` function
vi.mock("@utils/storage", () => ({
  isMovieFavorite: vi.fn(),
}));

vi.stubGlobal("window", {
  state: {
    genres: {
      28: "Action",
      12: "Adventure",
      16: "Animation",
    },
  },
});

// Sample movie data
const sampleMovies = [
  {
    id: 555879,
    title: "Matrix",
    original_title: "Matrix",
    genre_ids: [28, 12],
    poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
    release_date: "1998-12-31",
    isFavorite: false,
  },
];

describe("mapMovies", () => {
  it("should correctly map movie data", () => {
    isMovieFavorite.mockReturnValue(true); // Mock favorite status

    const mappedMovies = mapMovies(sampleMovies);

    expect(mappedMovies).toEqual([
      {
        id: 555879,
        title: "Matrix",
        originalTitle: "Matrix",
        genres: ["Action", "Adventure"],
        posterSrc:
          "https://image.tmdb.org/t/p/w200/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
        releaseYear: 1998,
        moviePageUrl: "https://www.themoviedb.org/movie/555879",
        isFavorite: true,
      },
    ]);
  });
});
