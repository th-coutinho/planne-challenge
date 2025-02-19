import { describe, it, expect, beforeEach, vi } from "vitest";
import { toggleFavorite, isMovieFavorite } from "@utils/storage";

const FAVORITES_KEY = "favoriteMovies";

// Mock localStorage globally before each test
beforeEach(() => {
  vi.stubGlobal("window", {
    localStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
  });
});

describe("toggleFavorite", () => {
  it("should add a movie to favorites if it's not already there", () => {
    window.localStorage.getItem.mockReturnValue(null); // No favorites stored initially

    toggleFavorite(123);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      FAVORITES_KEY,
      JSON.stringify([123])
    );
  });

  it("should remove a movie from favorites if it's already there", () => {
    window.localStorage.getItem.mockReturnValue(JSON.stringify([123, 456]));

    toggleFavorite(123);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      FAVORITES_KEY,
      JSON.stringify([456]) // 123 is removed
    );
  });

  it("should handle an empty favorites list", () => {
    window.localStorage.getItem.mockReturnValue("[]");

    toggleFavorite(789);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      FAVORITES_KEY,
      JSON.stringify([789])
    );
  });
});

describe("isMovieFavorite", () => {
  it("should return true if a movie is in favorites", () => {
    window.localStorage.getItem.mockReturnValue(JSON.stringify([123, 456]));

    expect(isMovieFavorite(123)).toBe(true);
  });

  it("should return false if a movie is not in favorites", () => {
    window.localStorage.getItem.mockReturnValue(JSON.stringify([123, 456]));

    expect(isMovieFavorite(789)).toBe(false);
  });

  it("should return false if no favorites are stored", () => {
    window.localStorage.getItem.mockReturnValue(null);

    expect(isMovieFavorite(123)).toBe(null);
  });
});
