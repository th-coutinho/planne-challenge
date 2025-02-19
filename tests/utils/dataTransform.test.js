import { describe, it, expect } from "vitest";
import { highlightSearchedQuery } from "@utils/dataTransform";

describe("highlightSearchedQuery", () => {
  it("should highlight the searched query in a title", () => {
    expect(
      highlightSearchedQuery({ query: "matrix", title: "The Matrix" })
    ).toBe('The <span class="highlight">Matrix</span>');
  });

  it("should highlight case-insensitively", () => {
    expect(
      highlightSearchedQuery({ query: "matrix", title: "The MATRIX" })
    ).toBe('The <span class="highlight">MATRIX</span>');
  });

  it("should return the original title if the query is not found", () => {
    expect(
      highlightSearchedQuery({ query: "avatar", title: "The Matrix" })
    ).toBe("The Matrix");
  });

  it("should handle empty query", () => {
    expect(
      highlightSearchedQuery({ query: "", title: "The Matrix" })
    ).toBeFalsy();
  });

  it("should handle empty title", () => {
    expect(highlightSearchedQuery({ query: "matrix", title: "" })).toBe("");
  });
});
