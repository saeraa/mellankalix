async function getMovieTimes() {
	const result = await fetch("static/movies.json");
	const data = await result.json();
	return data;
}

async function getMovies() {
	const result = await fetch("static/database.json");
	const data = await result.json();
	return data;
}

const parameters = [
	"visningstider",
	"pabionu",
	"karusell",
	"kommande",
	"klassiker",
	"salongalcazar",
	"salongbardeco",
	"salongcamera"
];

async function filterMovies(array, parameter) {
	const movieTimes = await getMovieTimes();
	const movies = await getMovies();

	const newMovieArray = movies.map((movie, index) => {
		return {
			...movie,
			showtime: []
		};
	});

	movieTimes.salons.forEach((salon) => {
		const { name: salonName } = salon;
		salon.dates.forEach((date) => {
			let dateString = date.date.slice(0, 10);

			date.showtimes.forEach((date) => {
				let obj = {
					time: new Date(`${dateString} ${date.time}`),
					salon: salonName
				};
				newMovieArray[date.movieIndex].showtime.push(obj);
			});
		});
	});

	let results = [];
	let dates, now, num, movieRelease, tomorrow;

	switch (parameter) {
		case "visningstider":
			now = new Date();
			now.setHours(0, 0, 0, 0);

			tomorrow = new Date();
			tomorrow.setDate(now.getDate() + 1);
			tomorrow.setHours(23, 59, 59, 59);

			movieTimes.salons.forEach((salon) => {
				salon.dates.forEach((date) => {
					const showtime = new Date(date.date).getTime();
					if (now.getTime() > showtime && showtime < tomorrow.getTime()) {
						date.showtimes.forEach((time) => {
							results.push({
								day: showtime,
								time: time.time,
								movie: newMovieArray[time.movieIndex]
							});
						});
					}
				});
			});
			break;
		case "pabionu":
			num = new Set();
			while (num.size < 21) {
				num.add(Math.floor(Math.random() * newMovieArray.length));
			}
			num.forEach((value, key) => {
				results.push(newMovieArray[key]);
			});
			break;
		case "karusell":
			num = new Set();
			while (num.size < 4) {
				num.add(Math.floor(Math.random() * newMovieArray.length));
			}
			num.forEach((value, key) => {
				results.push(newMovieArray[key]);
			});
			break;
		case "kommande":
			now = new Date().getTime();
			results = newMovieArray.filter((movie) => {
				movieRelease = new Date(movie.release).getTime();
				return movieRelease > now;
			});
			break;
		case "klassiker":
			results = newMovieArray.filter(
				(movie) => Number(movie.release.slice(0, 4)) < 1990
			);
			break;
		case "salongalcazar":
			dates = movieTimes.salons.filter((salon) => salon.name == "Alcazar");
			now = new Date().getTime();
			dates[0].dates.forEach((date) => {
				const showtime = new Date(date.date).getTime();
				if (showtime > now) {
					date.showtimes.forEach((time) => {
						results.push({
							day: showtime,
							time: time.time,
							movie: newMovieArray[time.movieIndex]
						});
					});
				}
			});
			break;
		case "salongbardeco":
			dates = movieTimes.salons.filter((salon) => salon.name == "Bar Deco");
			now = new Date().getTime();
			dates[0].dates.forEach((date) => {
				const showtime = new Date(date.date).getTime();
				if (showtime > now) {
					date.showtimes.forEach((time) => {
						results.push({
							day: showtime,
							time: time.time,
							movie: newMovieArray[time.movieIndex]
						});
					});
				}
			});
			break;
		case "salongcamera":
			dates = movieTimes.salons.filter((salon) => salon.name == "Camera");
			now = new Date().getTime();
			dates[0].dates.forEach((date) => {
				const showtime = new Date(date.date).getTime();
				if (showtime > now) {
					date.showtimes.forEach((time) => {
						results.push({
							day: showtime,
							time: time.time,
							movie: newMovieArray[time.movieIndex]
						});
					});
				}
			});
			break;
	}
	return results;
}

console.log(await filterMovies([], "visningstider"));
//console.log(await filterMovies([], "karusell"));
//console.log(await filterMovies([], "salongalcazar"));
//console.log(await filterMovies([], "salongbardeco"));
//console.log(await filterMovies([], "salongcamera"));
//console.log(await filterMovies([], "kommande"));
//console.log(await filterMovies([], "pabionu"));
//console.log(await filterMovies([], "klassiker"));
