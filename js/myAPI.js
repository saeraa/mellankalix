const myURL = 'http://127.0.0.1:5500/static/';

export async function getMovies() {
    const res = await fetch(myURL + 'database.json');
    const data = await res.json();

    return data;
};

export async function getShowTimes() {
    const res = await fetch(myURL + 'showtimes.json');
    const data = await res.json();

    return data;
};