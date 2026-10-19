import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Chrome DevTools probes this well-known path on every page load in dev;
	// respond quietly instead of logging a 404.
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}

	return resolve(event);
};
