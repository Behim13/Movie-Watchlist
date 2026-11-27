const formEl = document.querySelector(".input-field");
const inputEl = document.querySelector("#input-el");
const noMovies = document.querySelector(".noMovies");
const welcomeScreen = document.querySelector(".explore");
const movies = document.querySelector(".movies");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get results from search
  const result = await getSearchResults();

  // get full details of all searches
  const detailedSearches = await Promise.all(
    result.map((search) => getMovieDetails(search.imdbID)),
  );

  // render
  renderMovieDetails(detailedSearches);
});

movies.addEventListener("click", async (e) => {
  if (e.target.closest(".watchlist-btn")) {
    // get movie info based on its id
    const movie = await getMovieDetails(e.target.closest(".movie").dataset.id);
    if (sendMovieToStorage(movie))
      e.target.closest(".watchlist-btn").innerHTML = "Added!";
  }
});

function sendMovieToStorage(movie) {
  // variable to check is the movie already in watchlist
  const isAlreadyAdded = watchlist.some((savedMovie) => {
    return savedMovie.imdbID === movie.imdbID;
  });

  if (!isAlreadyAdded) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    return 1;
  }
  return 0;
}

// get lite info about search
async function getSearchResults() {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7970eeff&s=${inputEl.value}`,
  );

  const data = await res.json();
  welcomeScreen.classList.add("hidden");

  if (data.Response === "False") {
    noMovies.classList.remove("hidden");
    movies.classList.add("hidden");
  } else {
    movies.classList.remove("hidden");
  }
  return data.Search;
}

// render movie with full details
async function renderMovieDetails(Searches) {
  let movie = ``;
  movies.innerHTML = ``;
  Searches.forEach((search) => {
    movie = `
        <div class="movie" data-id=${search.imdbID}>
          <img src="${search.Poster}" alt="${search.Title}" />
          <div class="movie-info">
            <div class="title-rating">
              <h3>${search.Title}</h3>
              <i class="fa-solid fa-star"></i>
              <p>${search.imdbRating}</p>
            </div>
            <div class="genre">
              <p>${search.Runtime}</p>
              <p>${search.Genre}</p>
              <div class="watchlist-btn">
                <i class="fa-solid fa-circle-plus"></i>
                <p>Watchlist</p>
              </div>
            </div>
            <div class="description">
              <p>
                ${search.Plot}
              </p>
            </div>
          </div>
      `;
    movies.innerHTML += movie;
  });
}

// api to get details about every search
async function getMovieDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=7970eeff&i=${id}`);
  const data = await res.json();

  return data;
}
