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