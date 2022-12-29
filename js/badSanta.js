const santa = document.querySelector("#bad-santa");
const btn = document.querySelector("#bad-santa-btn");
const source = document.querySelector("#one");
let val = 1;

btn.addEventListener("click", () => {

    val++;
    if(val > 7)
        val = 1;

    switch(val) {
        case 1:
            source.src = "static/audio/1.mp3"
        break;

        case 2:
            source.src = "static/audio/2.mp3"
        break;

        case 3:
            source.src = "static/audio/3.mp3"
        break;

        case 4:
            source.src = "static/audio/4.mp3"
        break;

        case 5:
            source.src = "static/audio/5.mp3"
        break;

        case 6:
            source.src = "static/audio/6.mp3"
        break;

        case 7: 
            source.src = "static/audio/7.mp3"
        break;

        default:
            source.src = "static/audio/1.mp3"
        break;
    } 

    santa.load();

})