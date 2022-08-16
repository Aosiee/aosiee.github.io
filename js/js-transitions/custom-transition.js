import Highway from '@dogstudio/highway';

// GSAP Library
import Tween from 'gsap';

class Fade extends Highway.Transition {

    in ({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0);

        // Remove Old View
        from.remove();

        //////////////////////////////////////
        // Run ImagesLoad  ///////////////////
        //////////////////////////////////////

        let containerImages = document.querySelector('.image-container');
        let imgLoadTransition = imagesLoaded(containerImages);

        imgLoadTransition.on('progress', function(instance, image) {
            var result;
            var succeeded;

            if (image.img.classList.contains('half-opacity')) {
                result = image.isLoaded ? 'loaded-half-opacity' : 'broken';
                image.img.classList.add(result);
            }
            if (image.img.classList.contains('half-opacity-third')) {
                result = image.isLoaded ? 'loaded-half-opacity-third' : 'broken';
                image.img.classList.add(result);
            } else {
                result = image.isLoaded ? 'loaded' : 'broken';
                image.img.classList.add(result);
            }

            // console.log("Image Loaded on Transition with " + result)
        });

        //////////////////////////////////////
        // Run Magic Maths ///////////////////
        //////////////////////////////////////
        function getNumberOfDays(start, end) {
            const date1 = new Date(start);
            const date2 = new Date(end);
            const oneDay = 1000 * 60 * 60 * 24;
            const diffInTime = date2.getTime() - date1.getTime();
            const diffInDays = Math.round(diffInTime / oneDay);
            return diffInDays;
        }

        function getFormattedTimeSince(start) {
            let formattedTime = "#";
            var months = Math.ceil(getNumberOfDays(start, Date.now()) / 30);
            var years = Math.trunc(months / 12);
            let remainderMonths = years * 12;
            let remainingMonths = months - remainderMonths;
            if (months >= 12) {
                formattedTime = years + " yr " + remainingMonths + " mos";
            } else {
                formattedTime = months + ' mos';
            }
            return formattedTime;
        }

        ///////////////////////////////////////////////
        // AutoPlay for Hero Videos ///////////////////
        ///////////////////////////////////////////////
        var heroVideos = document.getElementsByClassName("home-hero-video");

        for (let i = 0; i < heroVideos.length; i++) {
            if (heroVideos[i].paused) {
                heroVideos[i].play();
                console.log("Hero Video %d, Wasn't Playing, Playing & Re-looping", i);

                var heroVideos = document.getElementsByClassName("home-hero-video");

                // Copied from projects-loader.js
                for (let i = 0; i < heroVideos.length; i++) {
                    if (heroVideos[i].paused) {
                        heroVideos[i].play();
                        console.log("Hero Video %d, Wasn't Playing, Playing & Re-looping", i);
                        forceAutoPlay();
                    } else {
                        console.log("Hero Video %d, Already Playing Continuing", i);
                    }
                }
            } else {
                console.log("Hero Video %d, Already Playing Continuing", i);
            }
        }

        ///////////////////////////////////////////////
        // Math for About Page ////////////////////////
        ///////////////////////////////////////////////

        // Brass Token Auto Month Calc
        var brassToken = document.getElementById('BrassToken');
        if (brassToken && !brassToken.firstChild) {
            brassToken.appendChild(document.createTextNode(getFormattedTimeSince('8/30/2021')));
        }

        //VFS-Ambassador Auto Month Calc
        var vfsAmbassador = document.getElementById('VFS-Ambassador');
        if (vfsAmbassador && !vfsAmbassador.firstChild) {
            vfsAmbassador.appendChild(document.createTextNode(getFormattedTimeSince('2/1/2022')));
        }

        // Animation
        Tween.fromTo(to, 0.5, { opacity: 0 }, {
            opacity: 1,
            onComplete: done
        });






    }

    out({ from, done }) {
        // Animation
        Tween.fromTo(from, 0.5, { opacity: 1 }, {
            opacity: 0,
            onComplete: done
        });

        // Tween.fromTo(".loader-wrapper", 0.5, { opacity: 0, zIndex: -1000000 }, {
        //     opacity: 100,
        //     zIndex: 99999999,
        //     onComplete: done
        // });
    }

}

// Don`t forget to export your transition
export default Fade;