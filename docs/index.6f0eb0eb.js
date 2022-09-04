/////////////////////////////////////////////////////////
// About Me - Filter / Toggles //////////////////////////
/////////////////////////////////////////////////////////
function showOnlyTag(button, tag = "default") {
    var projects, i, i, tagged_projects, i;
    // Function replaced with filterItems as Isotope has been successfully integrated
    return;
}
// Clear Active Selection
function clearNavButtons(selectedButton) {
    var active_buttons = document.getElementsByClassName("projects-button-active");
    // Remove All Active
    for(var b = 0; b < active_buttons.length; b++){
        active_buttons[b].classList.add("projects-button");
        active_buttons[b].classList.remove("projects-button-active");
    }
}
function forceAutoPlay() {
    var heroVideos = document.getElementsByClassName("home-hero-video");
    for(let i = 0; i < heroVideos.length; i++)if (heroVideos[i].paused) {
        heroVideos[i].play();
        console.log("Hero Video %d, Wasn't Playing, Playing & Re-looping", i);
        forceAutoPlay();
    } else console.log("Hero Video %d, Already Playing Continuing", i);
}

//# sourceMappingURL=index.6f0eb0eb.js.map
