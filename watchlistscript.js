let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
console.log(watchlist);

const mainLogo = document.querySelector(".main-logo");
const movies = document.querySelector(".movies");
// render all movies in watchlist

if (watchlist) {
  mainLogo.classList.add("hidden");
  movies.classList.remove("hidden");

  renderWatchlist();
}

function renderWatchlist() {
  let movie = ``;
  movies.innerHTML = ``;
  watchlist.forEach((watch) => {
    movie = `
        <div class="movie" data-id=${watch.imdbID}>
          <img src="${watch.Poster}" alt="${watch.Title}" />
          <div class="movie-info">
            <div class="title-rating">
              <h3>${watch.Title}</h3>
              <i class="fa-solid fa-star"></i>
              <p>${watch.imdbRating}</p>
            </div>
            <div class="genre">
              <p>${watch.Runtime}</p>
              <p>${watch.Genre}</p>
              <div class="watchlist-btn">
                <i class="fa-solid fa-circle-minus"></i>
                <p>Watchlist</p>
              </div>
            </div>
            <div class="description">
              <p>
                ${watch.Plot}
              </p>
            </div>
          </div>
      `;
    movies.innerHTML += movie;
  });
}

movies.addEventListener("click", async (e) => {
  if (e.target.closest(".watchlist-btn")) {
    // get movie info based on its id
    const selectedMovieId = e.target.closest(".movie").dataset.id;

    // remove movie from watchlist
    watchlist = watchlist.filter((movie) => movie.imdbID !== selectedMovieId);

    // render the new array
    renderWatchlist();

    // change localStorage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
});
