export const highlightSearchedQuery = ({ query, title }) => {
  if (!query) return;

  const cleanTitle = cleanString(title);

  const highlightedTitle = cleanTitle.replace(
    new RegExp(query, "gi"), // Case-insensitive search
    (match) => `<span class="highlight">${match}</span>` // Preserve original case
  );

  return highlightedTitle;
};

export const cleanString = (str) => {
  return str
    .normalize("NFD") // Convert accented characters to their base form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-zA-Z0-9 ]/g, ""); // Keep letters, numbers, and spaces
};
