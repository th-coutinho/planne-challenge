export default ({ query }) => {
  return `
    <div class="search-section__error">
      <p>Não encontramos este título 😕</p>
      <p>
        Mas você pode tentar buscar por "${query}" no
        <a href="https://www.google.com/search?q=${query}" target="_blank">Google</a> ou no
        <a href="https://www.imdb.com/find?q=${query}" target="_blank">IMDb</a>
      </p>
    </div>
  `;
};
