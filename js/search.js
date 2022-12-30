 import {getMovies} from "./myAPI.js";

const moviesList = document.getElementById("movies-filter")
const cinemaMovies = await getMovies();

 
//Render some data to DOM from API
const displayMovies = (movies) => { 
    let id = cinemaMovies.filter.length;   
    const htmlString = movies
        .map((movie) => {
            return`<a href="page.html/#${id ++}">
                    <img src="${movie.image}" alt="${movie.title}" />
                    <div class="search-content">
                      <h6>${movie.title}</h6>
                      <p>${movie.genre}</p>
                    </div>
                  </a>
                  `;
        })
        .join('');
        moviesList.innerHTML = htmlString;
        
    } 
    
//Open search field
const filtersearch = () => {

    let search = document.getElementById('search');
    let search_icon = document.getElementById('search-icon');
    
    search_icon.addEventListener('click', () => {
        search.classList.toggle('search-input');
    })
    

    //Filter and remove search windows when input is empty
    let search_bx2 = document.getElementsByClassName('search-bx2')[0];
    
    search.addEventListener('keyup', () => {
        let filter = search.value.toUpperCase();
        let a = search_bx2.getElementsByTagName('a');
        for (let i = 0; i < a.length; i++) {
            let b = a[i].getElementsByClassName('search-content')[0];
            let c = b.getElementsByTagName('h6')[0];
    
            let TextValue = c.textContent || c.innerText;
            if (TextValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = '';
                search_bx2.style.visibility = "visible";
                search_bx2.style.opacity = 1;
            } else {
                a[i].style.display = 'none';
            }
            if (search.value == 0) {
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }
        }
    })
    }

filtersearch()
displayMovies(cinemaMovies); 