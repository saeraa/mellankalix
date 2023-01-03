import { getMovies } from "./myAPI.js";

let movies = await getMovies();
let currentShown = 0;
let changeSlides;
let randomlySortedMovies;
let movieIds = [];
const prevButtons = document.querySelectorAll(".carousel-item-prev");
const nextButtons = document.querySelectorAll(".carousel-item-next");
const movieItems = document.querySelectorAll(".carousel-item");

prevButtons.forEach((button) => {
  button.addEventListener("click", displayPrevMovie);
});

nextButtons.forEach((button) => {
  button.addEventListener("click", displayNextMovie);
});

function getRandomMovies() {
  randomlySortedMovies = Array.from(movies);
  randomlySortedMovies = randomlySortedMovies.sort(function () {
    return Math.random() - 0.5;
  });
  randomlySortedMovies.splice(3);

  randomlySortedMovies.forEach((randMovie) => {
    movies.forEach((movie, index) => {
      if (movie === randMovie) {
        movieIds.push(index);
      }
    });
  });
}

getRandomMovies();

function generateMovieItems() {
  randomlySortedMovies.forEach((movie, index) => {
    const currentMovie = movieItems[index];
    currentMovie.querySelector("img").src = movie.image;
    currentMovie.querySelector("h3").textContent = movie.title;
    currentMovie.querySelector("p").textContent = movie.director;
    currentMovie.querySelector("a").href = window.location.origin + "/movie.html#" + movieIds[index];
  });
}

generateMovieItems();

function displayPrevMovie() {
  clearInterval(changeSlides);
  let last = currentShown;
  movieItems.forEach((item) => {
    item.classList.remove(
      "last-right",
      "last-left",
      "active-right",
      "active-left"
    );
  });
  currentShown--;
  if (currentShown < 0) {
    currentShown = 2;
  }

  movieItems.forEach((item, index) => {
    if (index === currentShown) {
      item.classList.add("active-left");
    } else if (index === last) {
      item.classList.add("last-left");
      item.classList.remove("active-left");
    } else {
      item.classList.remove("active-left");
    }
  });

  changeSlides = setInterval(() => {
    displayPrevMovie();
  }, 5000);
}

function displayNextMovie() {
  clearInterval(changeSlides);
  let last = currentShown;
  movieItems.forEach((item) => {
    item.classList.remove(
      "last-right",
      "last-left",
      "active-right",
      "active-left"
    );
  });
  currentShown++;
  if (currentShown > 2) {
    currentShown = 0;
  }
  movieItems.forEach((item, index) => {
    if (index === currentShown) {
      item.classList.add("active-right");
    } else if (index === last) {
      item.classList.add("last-right");
      item.classList.remove("active-right");
    } else {
      item.classList.remove("active-right");
    }
  });

  changeSlides = setInterval(() => {
    displayPrevMovie();
  }, 5000);
}

changeSlides = setInterval(() => {
  displayPrevMovie();
}, 5000);
