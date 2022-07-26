var vid = document.getElementById("chant-video");

function playVid() {
    vid.play();
    console.log("Playing Video");
}

function pauseVid() {
    vid.pause();
}

playVid();

console.log("Ran Stuff");