var loader = document.getElementsByClassName('loader-wrapper');


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded and Parsed');

    setTimeout(() => hideWrapper(), 0);
});

document.addEventListener("DOMContentLoaded", function(event) {
    forceAutoPlay();
});

function hideWrapper() {

    loader[0].classList.add('hide-wrapper');

    setTimeout(() => sortWrapper(), 500);
    console.log("Hidding Wrapper");
}

function sortWrapper() {
    loader[0].classList.add('buried-wrapper');
    console.log("Buried Wrapper");
}

function forceAutoPlay() {

    var heroVideos = document.getElementsByClassName("home-hero-video");

    for (let i = 0; i < heroVideos.length; i++) {
        if (heroVideos[i].paused) {
            heroVideos[i].play();
            console.log("Hero Video %d, Wasn't Playing, Playing & Re-looping", i);
            forceAutoPlay();
        } else {
            console.log("Hero Video %d, Already Playing Continuing", i);
        }
    }
}