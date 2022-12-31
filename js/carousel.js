let currentShown = 0;
let changeSlides;
const prevButtons = document.querySelectorAll(".carousel-item-prev");
const nextButtons = document.querySelectorAll(".carousel-item-next");
const movieItems = document.querySelectorAll(".carousel-item");

prevButtons.forEach((button) => {
    button.addEventListener("click", displayPrevMovie);
});

nextButtons.forEach((button) => {
    button.addEventListener("click", displayNextMovie);
})

function displayPrevMovie() {
    let last = currentShown;
    movieItems.forEach((item) => {
        item.classList.remove("last");
    })
    currentShown--;
    if(currentShown < 0) {
        currentShown = 2;
    }
    console.log(last, currentShown)
    movieItems.forEach((item, index) => {
        if(index === currentShown) {
            item.classList.add("active");
        } 
        else if(index === last) {
            item.classList.add("last");
            item.classList.remove("active");
        } else {
            item.classList.remove("active");
        }
    });
    clearInterval(changeSlides);
    changeSlides = setInterval(() => {
        displayPrevMovie();
    }, 5000);
}

function displayNextMovie() {
    currentShown++;
    if(currentShown > 2) {
        currentShown = 0;
    }
    console.log(currentShown)
}

changeSlides = setInterval(() => {
    displayPrevMovie();
}, 5000);