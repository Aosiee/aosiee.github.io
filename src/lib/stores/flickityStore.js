import { writable } from 'svelte/store';
export const flickityStore = writable({ instance: null, count: 0 });