import {getMovies} from "./myAPI.js";

const moviesList = document.querySelector("#movies-filter")
const cinemaMovies = await getMovies();

 
//Render some data to DOM from API
const displayMovies = (movies) => { 
     const htmlString = movies
     .map((movie, index) => {

        for (let i = 0; i < movie.genre.length; i++) {
            movie.genre[i] = movie.genre[i].charAt(0).toUpperCase() + movie.genre[i].slice(1);
        }
        const upperCase = movie.genre.join(", ");
 
            return`<a href="./movie.html#${index}">
                    <img src="${movie.image}" alt="${movie.title}" />
                    <div class="search-content">
                      <h6>${movie.title}</h6>
                      <p>${upperCase}</p>
                    </div>
                  </a>
                  <p class="noResult">Inga matchningar</p>
                  `;
                  
        }
        )
        .join("");
        moviesList.innerHTML = htmlString;
    } 
    
//Open search field
const filterSearch = () => {

    let search = document.querySelector("#search");
    let searchIcon = document.querySelector("#search-icon");
    
    searchIcon.addEventListener('click', () => {
    search.classList.toggle("search-input");

    const x = document.querySelector(".search-bx2");
    
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      } 

    })
    
    
    
    //Filter and remove search windows when input is empty
    let searchBx2 = document.querySelectorAll(".search-bx2")[0];
     
    search.addEventListener('keyup', () => {
        let filter = search.value.toUpperCase();
        let qtyMovies = cinemaMovies.length;
 
        let a = searchBx2.querySelectorAll('a');
        for (let i = 0; i < a.length; i++) {
            let b = a[i].querySelectorAll(".search-content")[0];
            let c = b.querySelectorAll("h6")[0];
            const noResult = document.querySelector(".noResult")
            let textValue = c.textContent || c.innerText
            
            
           
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                
                a[i].style.display = "";
                searchBx2.style.visibility = "visible";
                searchBx2.style.opacity = 1;
                
            } else {
                a[i].style.display = "none";
                qtyMovies -= 1 ;
            }
            if (search.value == 0) {
                searchBx2.style.visibility = "hidden";
                searchBx2.style.opacity = 0; 
            }
            
            if (qtyMovies == 0) {
                noResult.style.display = "flex";  
            }else{
                noResult.style.display = "none";
            }
        }
    })
    }

filterSearch()
displayMovies(cinemaMovies); 