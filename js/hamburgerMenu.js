const toggleButton = document.querySelector(".header-list-toggle");
const headerList = document.querySelector(".header-list");

toggleButton.addEventListener("click",()=>{
    toggleButton.classList.toggle("open");
    if(headerList.classList.toggle("open")){
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
})