const formEl = document.querySelector(".input-field");
const inputEl = document.querySelector("#input-el");
const noMovies = document.querySelector(".noMovies");
const welcomeScreen = document.querySelector(".explore");
const movies = document.querySelector(".movies");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  getSearchResults();
});

function getSearchResults() {
  fetch(`http://www.omdbapi.com/?apikey=7970eeff&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      welcomeScreen.classList.add("hidden");

      if (data.Response === "false") {
        noMovies.classList.remove("hidden");
      } else {
        let movie = `
        <div class="movie">
          <img src="${data.Poster}" alt="${data.Title}" />
          <div class="movie-info">
            <div class="title-rating">
              <h3>${data.Title}</h3>
              <i class="fa-solid fa-star"></i>
              <p>${data.imdbRating}</p>
            </div>
            <div class="genre">
              <p>${data.Runtime}</p>
              <p>${data.Genre}</p>
              <div>
                <i class="fa-solid fa-circle-plus"></i>
                <p>Watchlist</p>
              </div>
            </div>
            <div class="description">
              <p>
                ${data.Plot}
              </p>
            </div>
          </div>
      `;
        movies.classList.remove("hidden");
        movies.innerHTML = movie;
      }
    });
}
