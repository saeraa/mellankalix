
makeNav();

window.onresize = makeNav;


function makeNav(){
    // removing listeners old listeners
    const listItems = document.querySelectorAll(".nav-list-item");
    let newListItems = [];
    for(let i = 0; i < listItems.length ; i++){
            newListItems[i] = listItems[i].cloneNode(true);
            listItems[i].parentNode.replaceChild(newListItems[i], listItems[i]);
    }
if(window.innerWidth < 750){
    const buttons = document.querySelectorAll(".dropdown-button");
    buttons.forEach(button => 
        button.addEventListener("click", () => {
            if(button.nextElementSibling.className == "dropdown-content show"){
                button.nextElementSibling.classList.remove("show");
            } else {
            openThisHideTheRest(button);
        }
        }));
    } else {
       newListItems.forEach(listItem =>
            listItem.addEventListener("mouseover", () => {
                    const button = listItem.childNodes[1].childNodes[1];
                    openThisHideTheRest(button);
                }));
       newListItems.forEach(listItem => 
            listItem.addEventListener("mouseleave", () => {
                hideDropdown(listItem);
            }));
}
}

function openThisHideTheRest(element){
    const dropdowns = document.querySelectorAll(".dropdown-content");
    for(let i = 0; i < dropdowns.length; i++){
        if(dropdowns[i].className=="dropdown-content show"){
            dropdowns[i].classList.toggle("show");
        }
    }
    showDropdown(element.innerText.substring(0, element.innerText.length-1));
}

function hideDropdown(element){
    if(element.className=="dropdown-content"){
        element.classList.remove("show");
    } else {
        element.childNodes[1].childNodes[3].classList.remove("show");
    }
}


function showDropdown(whatDropDown){
switch(whatDropDown) {
    case "Repertoar":
        document.getElementById("dropdown-repertoar").classList.toggle("show");
        break;
    case "Serverade salonger":
        document.getElementById("dropdown-salonger").classList.toggle("show");
    break;
    case "Specialvisningar":
        document.getElementById("dropdown-specialvisningar").classList.toggle("show");
    break;
    case "Live på bio":
        document.getElementById("dropdown-live").classList.toggle("show");
    break;
    case "Bar & Bistro":
        document.getElementById("dropdown-bar&bistro").classList.toggle("show");
    break;
    case "Sök":
        document.getElementById("dropdown-search").classList.toggle("show");
    break;
}
}