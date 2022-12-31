let currentShown = 1;
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
    clearInterval(changeSlides);
    changeSlides = setInterval(() => {
        displayPrevMovie();
    }, 5000);
    movieItems.forEach((item) => {
        item.classList.remove("last");
    })
    currentShown--;
    if(currentShown < 0) {
        currentShown = 2;
    }
    movieItems.forEach((item, index) => {
        if(index === last) {
            item.classList.add("last");
        }
        if(index === currentShown) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
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