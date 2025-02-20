import { describe, it, expect } from "vitest";
import ErrorMessage from "@components/ErrorMessage";

describe("ErrorMessage Component", () => {
  const query = "Matrix";

  it("renders the error message correctly", () => {
    const component = ErrorMessage({ query });

    expect(component).toContain('<div class="search-section__error">');
    expect(component).toContain("Não encontramos este título 😕");
  });

  it("displays the search query in the message", () => {
    const component = ErrorMessage({ query });

    expect(component).toContain(`Mas você pode tentar buscar por "${query}"`);
  });

  it("generates a valid Google search link", () => {
    const component = ErrorMessage({ query });

    expect(component).toContain(
      `<a href="https://www.google.com/search?q=${query}" target="_blank">Google</a>`
    );
  });

  it("generates a valid IMDb search link", () => {
    const component = ErrorMessage({ query });

    expect(component).toContain(
      `<a href="https://www.imdb.com/find?q=${query}" target="_blank">IMDb</a>`
    );
  });
});
