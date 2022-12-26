import { getMovies } from './myAPI.js';

async function getMovieDatabase() {
    // Gets the movie database from the database.json file
    const database = await getMovies();
    createShowTimeDatabase(database);
}

// Adds the length of the movie (comes in minutes) to the time object
function addMovieLengthToTime(min, time) {
    time.setHours(time.getHours() + (Math.floor(min/60)));

    if(time.getMinutes() + (min%60) > 60) {
        time.setHours(time.getHours() + 1);
        time.setMinutes(time.getMinutes() + ((time.getMinutes()+(min%60))%60));    
    } else {
        time.setMinutes(time.getMinutes() + (min%60));
    }
}

//Adds some time around 31-60 min for clean up until next show time, adds the time to the time object
function nextShowTime (time) {

    if (time.getMinutes() > 30) {
        time.setMinutes(30);
    } else {
        time.setMinutes(0);
    }

    time.setHours(time.getHours() + 1);
}


function createShowTimeDatabase (database) {
    const salons = ["Alcazar", "Bar Deco", "Camera"];
    // the variable that will be turned in to a json object for parsing in to a file
    const showTimes = [];

    // the start and end date for the database
    const startDate = new Date('Dec 25 2022');
    const endDate = new Date('Mar 01 2023');
    
    

    // loops through all the salons (in case we want to add more or less in the future)
    for(let i=0; i<salons.length; i++){
        showTimes.push({"name":salons[i], "dates":[]});
        // a temporary time so we dont alter the startDate
        let tempDate = new Date(startDate);
        
        // Loops through from startDate to endDate
        for(let j=0;tempDate < endDate;j++) {
            // to set the date to a better format
            let today = tempDate.toJSON().slice(0, 10);
            
            showTimes[i].dates.push({"date":today, "showtimes": []});

            // tempTime is set to be altered for each day so tempDate dosent get alterd each day (note to self: cloud just reset the tempDate at the end of loop)
            let tempTime = new Date(tempDate);
            // sets the day to be able to controll start time for the first show, which varies from weekends 
            let day = tempDate.getDay();
            
            // sundays open at 10:30, saturdays 12:30, all other days at 13:30
            if(day == 0) {
                tempTime.setHours(10, 30);
            } else if (day == 6) {
                tempTime.setHours(12, 30);
            } else {
                tempTime.setHours(13, 30);
            }

            showTimes[i].dates[j].showtimes.push({"time":`${tempTime.getHours()}:${tempTime.getMinutes()}`, "movieIndex":Math.floor(Math.random() * database.length)});
            
            // Goes through and sets the showtimes for each day, randomes a movie from the database
            for(let k=0;tempTime.getHours() < 23;k++) {
                
                let movieIndex = showTimes[i].dates[j].showtimes[k].movieIndex;
                let movieLength = database[movieIndex].length; // could just write database[showTimes[i].dates[j].showtimes[k].movieIndex].length , but it gets hard to read.
                
                // A test date to check to see if it goes over closing time or not before setting the real time
                let temp2Time = new Date(tempTime);

                // If movielength goes over 23:00 (closing time) then break the shit.
                addMovieLengthToTime(movieLength, temp2Time)
                if((temp2Time.getHours() < 23) && (temp2Time.getHours() > 10)){
                    addMovieLengthToTime(movieLength, tempTime);
                } else {
                    break;
                }
                
                // If cleanuptime goes over 23:00 (closing time) then break the shit.
                nextShowTime(temp2Time);
                if(temp2Time.getHours() < 23 && (temp2Time.getHours() > 10)){
                    nextShowTime(tempTime);
                } else{
                    break;
                }

                // Just to make it prittier, other wise time will get stamped as 17:0 insted of 17:00
                if (tempTime.getMinutes() == 0) {
                    showTimes[i].dates[j].showtimes.push({"time":`${tempTime.getHours()}:00`, "movieIndex":Math.floor(Math.random() * database.length)});    
                } else {
                    showTimes[i].dates[j].showtimes.push({"time":`${tempTime.getHours()}:${tempTime.getMinutes()}`, "movieIndex":Math.floor(Math.random() * database.length)});
                }

            }
            // Go to next day
            tempDate.setDate(tempDate.getDate() + 1);
        }
        
    } 

    //console.log(showTimes);
    console.log(JSON.stringify(showTimes));
}

getMovieDatabase();