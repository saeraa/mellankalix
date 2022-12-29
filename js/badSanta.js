const santa = document.querySelector("#bad-santa");
const btn = document.querySelector("#bad-santa-btn");
let val = 1;

btn.addEventListener("click", () => {
    
    val++;
    if(val > 5)
        val = 1;

    switch(val) {
        case 1:
            document.querySelector("#one").src = "static/audio/1.mp3"
        break;

        case 2:
            document.querySelector("#one").src = "static/audio/2.mp3"
        break;

        case 3:
            document.querySelector("#one").src = "static/audio/3.mp3"
        break;

        case 4:
            document.querySelector("#one").src = "static/audio/4.mp3"
        break;

        case 5:
            document.querySelector("#one").src = "static/audio/5.mp3"
        break;
    } 
    santa.load();

})