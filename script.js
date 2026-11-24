const formEl = document.querySelector(".input-field");
const inputEl = document.querySelector("#input-el");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  fetch(`http://www.omdbapi.com/?apikey=7970eeff&t=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
