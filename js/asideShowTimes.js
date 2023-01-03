import { filterMovies } from './filterMovies.js'

async function init() {
    const database = await filterMovies("showtimes");
    sortByTime(database);
}

// This function is coded so that it can take asmany dates as it wants, not just for today and tomorrow, incase it would be needed in the future
function sortByTime (database) {    
    // An array for all the different dates from the database (no other data then dates)
    const dates = [];
    // An array for all the movies from different dates from the database (all data from database, in different arrays depending on date of showtimes)
    const days = [];

    // Goes through all showtimes, converts the dates to readable format, if date is uniqe put in dates array
    database.forEach(data => {
        let day = new Date(data.day);
        data.day = (day.toLocaleDateString("sv-SE", {
            weekday: "short",
            day: "numeric",
            month: "short"
        }).toUpperCase())
        
        if(dates.indexOf(data.day) === -1){
            dates.push(data.day);
        }
    });   

    // Creates an array for each date in days[]
    dates.forEach(date => days.push([]));

    // Sorts the database in to one array for each date
    database.forEach(data => {

        for(let i=0; i<days.length; i++){

            if(data.day === dates[i]) {
                days[i].push(data);
            }
        }
    })    

    // Removes the ":" from time so it can be sorted in the next step
    days.forEach(day => {
        day.forEach(showtime => {
            showtime.time = showtime.time.slice(0, 2) + showtime.time.slice(3, 5);    
        })
    })
    
    // Sorts on time
    days.forEach(day => {
        day.sort((a, b) => {return a.time - b.time});
    })
    
    // Adds the ":" back in time and converts dates to readable format
    days.forEach(date => {
        date.forEach(showtime => {
            showtime.time = showtime.time.slice(0, 2) + ":" + showtime.time.slice(2, 4);
            let day = new Date(showtime.day);
            showtime.day = day.toDateString();
        })
    })

    // Send the sorted array of arrays to create HTML for it
    createHTML(days, dates);
}

// Creates HTML for each showtime
function createHTML(days, dates) {
    // The Ul that contains the other Ul's    
    const showTimesUl = document.querySelector(".showtime-showtimes");

    // Create an ul for each date and fil each ul with showtime and title of movie
    for(let i=0; i<days.length; i++){

        const h3 = document.createElement("h3");
        const ul = document.createElement("ul");
        
        h3.innerText = dates[i];
        ul.appendChild(h3);
        ul.classList.add("showtimes")
        
        // Creates an ul for each date and fills it with shotime and title of movie
        for(let j=0; j<days[i].length; j++) {

            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = "./movie.html#" + days[i][j].index;
            a.innerText = `${days[i][j].time} - ${days[i][j].movie.title}`
            li.appendChild(a);
            ul.appendChild(li);
        }
        
        showTimesUl.appendChild(ul);
    }

}

init();