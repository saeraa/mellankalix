let currentShown = 1;
const prevButtons = document.querySelectorAll(".carousel-item-prev");
const nextButtons = document.querySelectorAll(".carousel-item-next");
const movieItems = document.querySelectorAll(".carousel-item");

console.log(movieItems)

prevButtons.forEach((button) => {
    button.addEventListener("click", displayPrevMovie);
});

nextButtons.forEach((button) => {
    button.addEventListener("click", displayNextMovie)
})

function displayPrevMovie() {
    currentShown--;
    if(currentShown < 0) {
        currentShown = 2;
    }
    movieItems.forEach((item, index) => {
        if(index === currentShown) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
    //console.log(currentShown)
}

function displayNextMovie() {
    currentShown++;
    if(currentShown > 2) {
        currentShown = 0;
    }
    console.log(currentShown)
}
