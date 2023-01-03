import { filterMovies } from "./js/filterMovies.js";

const displayRandomMovieList = async () => {
	const movies = await filterMovies("onnow");
	currentMoviesListEl.innerHTML = "";
	let htmlString = "";
	for (let i = 0; i < 21; i++) {
		const { image, title } = movies[i].movie;
		htmlString += `<a href="./movie.html#${movies[i].index}">
            <li class="current-movies-card">
            <img src=${image} alt="${title} poster" class="current-movies-card-image" />
            <h3 class="current-movies-card-title">${title}</h3>
          </li></a>`;
	}
	currentMoviesListEl.innerHTML = htmlString;
};

const currentMoviesListEl = document.querySelector(".current-movies-list");
window.addEventListener("load", displayRandomMovieList);