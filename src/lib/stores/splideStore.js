import { writable } from 'svelte/store';
export const splideStore = writable({ instance: null, count: 0 });