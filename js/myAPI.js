export async function getMovies() {
    const res = await fetch('static/database.json');
    const data = await res.json();

    return data;
};

export async function getShowTimes() {
    const res = await fetch('static/showtimes.json');
    const data = await res.json();

    return data;
};