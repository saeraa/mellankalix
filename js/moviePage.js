import { filterMovies } from "./filterMovies.js";
const movieEl = document.querySelector(".movie-details");

const hashChange = async () => {
	const hash = window.location.hash;

	const movie = await filterMovies(hash);

	// destructuring returned movie object to easier manipulate it
	const {
		actors,
		age,
		description,
		director,
		genre,
		image,
		land,
		length,
		release,
		title,
		trailer,
		showtime
	} = movie[0];

	showtime.sort((a, b) => a.time - b.time);

	// reformatting some of the values from the api
	let year = release.slice(0, 4);
	let actorsString = actors.join(", ");
	let genreString = genre.join(", ");
	let ageLimit = age <= 7 ? "Barntillåten" : `Från ${age} år`;

	let htmlString = "";

	htmlString += `
    			<div>
				<h1 class="movie-title">${title}</h1>
				<p class="movie-description">
					${description}
				</p>
				<hr />
				<p class="movie-genres">${genreString}</p>
				<p class="movie-info">
					<strong>Regi: </strong> <span class="movie-director">${director}</span>
					<strong>Skådespelare: </strong> <span class="movie-actors">${actorsString}</span>
					<strong>Land: </strong> <span class="movie-country">${land} (${year})</span>
					<strong>Åldersgräns: </strong> <span class="movie-age">${ageLimit}</span>
          </p>
          <p class="movie-trailer"><a href="${trailer}">Se trailer här</a></p>
			</div>

			<div>
				<hr />
				<div class="movie-showtimes">
					<h2>Visningstider</h2>
					<ul class="movie-showtimes-list"> `;

	let now = new Date();

	showtime.forEach((showtime) => {
		// don't need to display showtimes already gone by
		if (showtime.time > now) {
			let date = new Date(showtime.time).toLocaleDateString("sv-SE", {
				weekday: "short",
				day: "numeric",
				month: "short"
			});

			let time = new Date(showtime.time).toLocaleTimeString("sv-SE", {
				hour: "numeric",
				minute: "numeric"
			});

			htmlString += `
        <li>
          <div>
            <span class="movie-date">${date}</span>
            <span class="movie-showtime">${time}</span>
          </div>
          <div>
            <span class="movie-salon">${showtime.salon}</span>
            <span class="movie-length">${length} min</span>
          </div>
    
          <a href="tickets.html${hash}" class="movie-tickets">Biljetter</a>
        </li>
      `;
		}
	});

	htmlString += `</ul>
        </div>
        </div>
        <img
          src="${image}"
          alt="${title}"
          class="movie-poster"
        />
        `;

	// add it all to the dom
	movieEl.innerHTML = htmlString;
};

window.addEventListener("hashchange", hashChange);
window.addEventListener("load", hashChange);
