import { writable } from 'svelte/store';

// True once the preloader has finished and the page begins to reveal
export const preloaderDone = writable(false);
