/////////////////////////////////////////////////////////
// About Me - Filter / Toggles //////////////////////////
/////////////////////////////////////////////////////////
function showOnlyTag(button, tag = 'default') {

    var projects = document.getElementsByClassName('home-image-parent')

    // If Clicking Already Active Nav Button
    if (button.classList.contains('projects-button-active')) {
        clearNavButtons();

        for (var i = 0; i < projects.length; i++) {
            projects[i].classList.remove('d-none');
            projects[i].classList.add('d-block');
        }

        console.log('Returning All Projects to List')

        return;
    }


    clearNavButtons(button);

    // Set 'button' as active
    button.classList.add('projects-button-active')

    for (var i = 0; i < projects.length; i++) {
        projects[i].classList.remove('d-block');
        projects[i].classList.add('d-none');
        // projects[i].classList.add('invisible');
    }

    var tagged_projects = document.getElementsByClassName(tag);

    for (var i = 0; i < tagged_projects.length; i++) {
        tagged_projects[i].classList.remove('d-none');
        tagged_projects[i].classList.add('d-block');
    }

    console.log("Ran Show on " + tagged_projects.length + " Items with '" + tag + "'")
}

// Clear Active Selection
function clearNavButtons(selectedButton) {

    var active_buttons = document.getElementsByClassName('projects-button-active');
    // Remove All Active
    for (var b = 0; b < active_buttons.length; b++) {
        active_buttons[b].classList.add('projects-button');
        active_buttons[b].classList.remove('projects-button-active');
    }
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