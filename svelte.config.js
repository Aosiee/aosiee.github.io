import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// vite: {
		// 	include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
		// },
		adapter: adapter({
			pages: 'docs', // Sets output directory to docs
			assets: 'docs', // Ensure static assets also go to 'docs'
			fallback: null
		}),
		paths: {
            base: process.env.NODE_ENV === 'production' ? '/aosiee.github.io' : '',
        }
	}
};

export default config;
