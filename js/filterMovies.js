import { getMovies, getShowTimes } from "./myAPI.js";

export async function filterMovies(parameter) {
	const movieTimes = await getShowTimes();
	const movies = await getMovies();

	// creating new array to be able to combine movie and showtimes
	const newMovieArray = movies.map((movie, index) => {
		return {
			...movie,
			showtime: []
		};
	});

	// populating new array with the matching showtimes
	movieTimes.forEach((salon) => {
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
		case "showtimes":
			// defining today at 00:00 for all of today's movies even if it's late in the day
			now = new Date();
			now.setHours(0, 0, 0, 0);

			// defining tomorrow at 23:59 to get all of tomorrow's movies
			tomorrow = new Date();
			tomorrow.setDate(now.getDate() + 1);
			tomorrow.setHours(23, 59, 59, 59);

			// looping through movieTimes and adding the ones having a showtime matching from today at 00:00 until tomorrow at 23:59
			movieTimes.forEach((salon) => {
				salon.dates.forEach((date) => {
					const showtime = new Date(date.date).getTime();
					if (now.getTime() < showtime && showtime < tomorrow.getTime()) {
						date.showtimes.forEach((time) => {
							results.push({
								day: showtime,
								time: time.time,
								movie: newMovieArray[time.movieIndex],
								index: time.movieIndex,
							});
						});
					}
				});
			});
			break;
		case "onnow":
			// adding 21 random movies to the "på bio nu" section
			// using Set, which only accepts unique values
			num = new Set();
			while (num.size < 21) {
				num.add(Math.floor(Math.random() * newMovieArray.length));
			}
			num.forEach((value, key) => {
				results.push({
					index: key,
					movie: newMovieArray[key]
				});
			});
			break;
		case "carousel":
			// adding 4 random movies to the carousel
			// using Set, which only accepts unique values
			num = new Set();
			while (num.size < 4) {
				num.add(Math.floor(Math.random() * newMovieArray.length));
			}
			num.forEach((value, key) => {
				results.push(newMovieArray[key]);
			});
			break;
		case "future":
			// filter movies released after today
			now = new Date().getTime();
			results = newMovieArray.filter((movie) => {
				movieRelease = new Date(movie.release).getTime();
				return movieRelease > now;
			});
			break;
		case "classics":
			// filter movies released before 1990
			results = newMovieArray.filter(
				(movie) => Number(movie.release.slice(0, 4)) < 1990
			);
			break;
		case "alcazar":
			// get dates for movies from the bar deco salon and defining now
			dates = movieTimes.filter((salon) => salon.name == "Alcazar");
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
		case "bardeco":
			// get dates for movies from the bar deco salon and defining now
			dates = movieTimes.filter((salon) => salon.name == "Bar Deco");
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
		case "camera":
			// get dates for movies from the camera salon and defining now
			dates = movieTimes.filter((salon) => salon.name == "Camera");
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
		default:
			// using regular expression to check if the parameter (hashtag) matches any number
			const movieIndex = +parameter.slice(1).match(/^\d+$/)?.input;

			if (!isNaN(movieIndex) && movieIndex < newMovieArray.length) {
				const currentMovie = newMovieArray[movieIndex];
				results.push(currentMovie);
			} else {
				// if regex isn't a number, or the parameter is a string that doesn't match any other switch case
				results.push("No such movie.");
			}
	}
	return results;
}
