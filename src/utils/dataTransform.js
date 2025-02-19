// Returns an Array containing only the Original Names
export const mapByOriginalName = (movies) => {
  return movies.map((m) => m.original_title);
};

export const highlightSearchedQuery = ({ query, collection }) => {
  return collection.map((m) => {
    const highlightedTitle = m.replace(
      new RegExp(query, "gi"), // Case-insensitive search
      (match) => `<span class="highlight">${match}</span>` // Preserve original case
    );

    return highlightedTitle;
  });
};
