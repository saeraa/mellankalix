const getDataFromDatabase = async () => {
	const response = await fetch("./static/database.json");
	const data = await response.json();
	return data;
};

const displayRandomMovieList = async () => {
	currentMoviesListEl.innerHTML = "";
	const movies = await getDataFromDatabase();
	let htmlString = "";
	for (let i = 0; i < 21; i++) {
		const { image, title } = movies[i];
		htmlString += `<a href="#">
            <li class="current-movies-card">
            <img src=${image} alt="${title} poster" class="current-movies-card-image" />
            <h3 class="current-movies-card-title">${title}</h3>
          </li></a>`;
	}
	currentMoviesListEl.innerHTML = htmlString;
};

const currentMoviesListEl = document.querySelector(".current-movies-list");
window.addEventListener("load", displayRandomMovieList);