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