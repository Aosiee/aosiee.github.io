import Highway from '@dogstudio/highway';

// Import Renderers
import CustomRenderer from '../js/js-transitions/custom-renderer.js';

// Import Transitions
import Fade from '../js/js-transitions/custom-transition.js';

// Call Highway.Core once.
// Relate transitions to pages with the label of the `data-router-view`.
const H = new Highway.Core({
    renderers: {
        name: CustomRenderer
    },
    transitions: {
        name: Fade,
        default: Fade
    }
});

H.on('NAVIGATE_END', ({ to }) => {

    manageScripts(to);
});

function manageScripts(to) {
    const main = document.querySelector('#main-script');

    const a = [...to.page.querySelectorAll('script:not([data-no-reload])')];
    const b = [...document.querySelectorAll('script:not([data-no-reload])')];

    //Compare Scripts
    for (let i = 0; i < b.length; i++) {
        const c = b[i];

        for (let j = 0; j < a.length; j++) {
            const d = a[j];

            if (c.outerHTML === d.outerHTML) {
                // Create Shadow Script
                const script = document.createElement(c.tagName);

                // Loop Over Attributes
                for (let k = 0; k < c.attributes.length; k++) {
                    // Get Attribute
                    const attr = c.attributes[k];

                    // Set Attribute
                    script.setAttribute(attr.nodeName, attr.nodeValue);
                }

                // Inline Script
                if (c.innerHTML) {
                    script.innerHTML = c.innerHTML;
                }

                // Replace
                c.parentNode.replaceChild(script, c);

                // Clean Arrays
                b.splice(i, 1);
                a.splice(j, 1);

                // Exit Loop
                break;
            }
        }
    }

    // Remove Useless
    for (const script of b) {
        //Remove
        script.parentNode.removeChild(script);
    }

    // Add Scripts
    for (const script of a) {
        const loc = script.parentNode.tagName;

        if (loc === 'HEAD') {
            document.head.appendChild(script);
        }

        if (loc === 'BODY') {
            // document.body.insertAdjacentElement(main, script);
            // document.body.insertBefore(script, main);
        }
    }

}