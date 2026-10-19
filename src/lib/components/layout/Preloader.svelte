<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { heroCarouselItems } from '$lib/data/hero-carousel';
	import { preloaderDone } from '$lib/stores/preloaderStore';

	// White space between the logo and the outline, in viewBox units (~55 units = 1px at 15rem height)
	export let outlineGap = 330;
	// Width of the outline itself, in viewBox units
	export let outlineWidth = 165;
	// Only the home page renders the hero carousel, so only preload its
	// first slide there; every other page skips the image preload entirely.
	const isHomePage = $page.url.pathname === `${base}/`;
	const firstSlide = heroCarouselItems[0];
	const imagesToLoad = isHomePage ? firstSlide.preload : [];

	// Store to track loading progress
	const progress = writable(0);
	// The logo outline draws itself as progress advances.
	// Measured at runtime because `pathLength` breaks <use> rendering in Chrome.
	/** @type {SVGPathElement | null} */
	let logoPathElement = null;
	/** @type {SVGSVGElement | null} */
	let outlineElement = null;
	let pathLength = 0;
	$: dashOffset = pathLength * (1 - $progress);

	// The dark band is 2x wider than needed; the white gap stroke carves out
	// the inner half, leaving a ring of `outlineWidth` at `outlineGap` from the logo.
	// Values are multiplied by 10 because the path sits inside a scale(0.1) transform.
	$: darkStrokeWidth = (2 * outlineGap + 2 * outlineWidth) * 10;
	$: gapStrokeWidth = 2 * outlineGap * 10;

	// Shared logo geometry (kept in one place; rendered as direct paths because
	// <use> referencing this path fails to paint when created by Svelte)
	const LOGO_PATH =
		'M35400 129142 c-107 -40 -242 -90 -300 -112 -58 -21 -152 -56 -210 ' +
		'-78 -335 -125 -642 -240 -1065 -397 -254 -94 -338 -125 -440 -165 -27 -10 ' +
		'-167 -62 -310 -115 -143 -53 -354 -132 -470 -175 -115 -43 -327 -122 -470 ' +
		'-175 -246 -91 -322 -120 -440 -165 -27 -10 -183 -68 -345 -128 -493 -184 -723 ' +
		'-270 -985 -367 -137 -51 -367 -137 -510 -189 -143 -53 -271 -101 -285 -107 ' +
		'-13 -6 -110 -42 -215 -80 -104 -38 -201 -74 -215 -80 -25 -11 -149 -57 -585 ' +
		'-219 -121 -44 -232 -85 -246 -91 l-26 -10 -6 -2587 c-4 -1423 -7 -8064 -7 ' +
		'-14759 l0 -12171 -27 -10 c-16 -5 -4379 -1631 -9698 -3612 -5319 -1981 -9773 ' +
		'-3638 -9900 -3681 -126 -43 -1308 -481 -2625 -972 l-2395 -892 -3 -3903 c-1 ' +
		'-2146 1 -3902 4 -3902 3 0 1046 388 2317 861 1272 474 2395 890 2497 924 102 ' +
		'34 4597 1706 9990 3715 5393 2009 9813 3655 9823 3658 16 4 17 -451 17 -9461 ' +
		'l0 -9465 -67 -25 c-12868 -4794 -19440 -7240 -19558 -7278 -82 -27 -1246 -458 ' +
		'-2585 -957 l-2435 -908 -3 -3903 c-2 -3714 -1 -3903 15 -3898 10 2 1069 396 ' +
		'2353 874 1284 479 2387 887 2450 908 63 21 4543 1687 9955 3703 5412 2015 ' +
		'9847 3667 9857 3669 15 5 16 -1922 20 -27925 1 -15362 6 -27934 10 -27938 4 ' +
		'-4 54 8 110 26 91 28 635 227 728 265 19 8 170 64 335 126 165 61 395 146 510 ' +
		'189 116 43 345 128 510 189 165 61 316 118 335 126 19 8 170 64 335 126 554 ' +
		'205 889 330 995 370 58 22 159 60 225 83 66 24 131 49 145 54 14 6 176 67 360 ' +
		'136 184 68 432 160 550 204 118 44 276 103 350 130 74 28 146 55 160 61 14 6 ' +
		'160 60 325 122 165 61 395 146 510 189 372 138 810 300 823 305 15 5 14 -750 ' +
		'21 10581 l6 9150 7580 -3566 c4169 -1961 7625 -3585 7680 -3609 92 -39 382 ' +
		'-140 448 -155 l27 -6 0 4002 0 4003 -7867 3702 -7868 3701 -3 14050 -2 14051 ' +
		'57 21 c32 12 4275 1592 9428 3511 5154 1920 9456 3523 9560 3562 105 40 1260 ' +
		'471 2567 957 l2378 885 0 3898 c0 2143 -2 3897 -4 3897 -27 0 -1981 -724 ' +
		'-5171 -1916 -1120 -418 -18806 -7004 -18810 -7004 -3 0 -4 4260 -3 9466 l3 ' +
		'9465 9435 3514 c5189 1933 9476 3530 9525 3548 50 19 1200 448 2557 953 l2468 ' +
		'919 0 3898 0 3897 -27 -6 c-68 -16 -472 -165 -2708 -999 -1309 -488 -2468 ' +
		'-920 -2575 -960 -107 -40 -4352 -1621 -9433 -3514 -5081 -1893 -9240 -3441 ' +
		'-9242 -3441 -3 0 -6 5075 -6 11278 -1 6202 -5 12841 -8 14752 l-6 3475 -195 ' +
		'-73z';

	// Hide the loading text until the site's display font is ready, so it
	// never flashes in the fallback font.
	let fontReady = false;

	/**
	 * @param {string} url
	 * @returns {Promise<void>}
	 */
	async function loadImage(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve();
			img.onerror = () => reject();
			img.src = url;

			// Check if the image is immediately available (from cache) or has failed
			if (img.complete && img.naturalWidth === 0) {
				// Image failed to load
				reject();
			}
		});
	}

	// Sweeps the progress store linearly so the outline fills at a constant speed.
	/**
	 * @param {number} target
	 * @param {number} duration
	 * @returns {Promise<void>}
	 */
	function sweepProgressTo(target, duration) {
		return /** @type {Promise<void>} */ (
			new Promise((resolve) => {
				const start = $progress;
				const startTime = performance.now();
				/** @param {number} now */
				const tick = (now) => {
					const t = Math.min(1, (now - startTime) / duration);
					progress.set(start + (target - start) * t);
					if (t < 1) {
						requestAnimationFrame(tick);
					} else {
						resolve();
					}
				};
				requestAnimationFrame(tick);
			})
		);
	}

	// Function To Load All Resources
	async function loadResources() {
		// Load Images
		for (const image of imagesToLoad) {
			try {
				await loadImage(image);
			} catch (error) {
				console.error('Failed To Load Image:', image, error);
			}
		}
	}

	onMount(() => {
		// Measure the logo path so the outline can draw in sync with progress
		if (logoPathElement) {
			pathLength = logoPathElement.getTotalLength();
		}

		// Reveal the loading text once the display font is available
		try {
			Promise.all([document.fonts.load('1rem "Forevs"'), document.fonts.load('1rem "Staatliches"')])
				.then(() => {
					fontReady = true;
				})
				.catch(() => {
					fontReady = true;
				});
		} catch (error) {
			// Font Loading API unavailable: show the text regardless
			fontReady = true;
		}

		// Chromium quirk: SVG content created by Svelte may not paint until the DOM is mutated.
		if (outlineElement) {
			const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			outlineElement.appendChild(marker);
			marker.remove();
		}

		// Uniform 0 -> 90% sweep, then finish the last 10% once everything is loaded
		const sequence = (async () => {
			await sweepProgressTo(0.9, 1200);
			await loadResources();
			await sweepProgressTo(1, 200);
		})();

		sequence.then(() => {
			const preloader = document.querySelector('.preloader');
			if (preloader) {
				// Signal once the preloader has fully faded away
				const onFadeEnd = (/** @type {Event} */ event) => {
					if (event.target !== preloader) return;
					preloader.removeEventListener('animationend', onFadeEnd);
					preloaderDone.set(true);
				};
				preloader.addEventListener('animationend', onFadeEnd);
				setTimeout(() => preloaderDone.set(true), 2500);
				preloader.classList.add('animate');
			} else {
				console.warn('Failed to trigger fade-in animation.');
				preloaderDone.set(true);
			}
		});
	});
</script>

<!-- TODO:: Instead of progress bar, shake svg, maybe little particles that fall off -->

<div class="preloader">
	<div class="preloader-container">
		<svg
			class="preloader-outline"
			viewBox="0 0 6660 13140"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			bind:this={outlineElement}
		>
			<g transform="translate(0 13140) scale(0.1 -0.1)">
				<!-- Dark band that draws itself with progress. Only rendered once the
				     path length is measured so it can never flash as a solid outline -->
				{#if pathLength}
					<path
						d={LOGO_PATH}
						fill="none"
						stroke-dasharray={pathLength}
						stroke-dashoffset={dashOffset}
						style="stroke: var(--black-theme); stroke-width: {darkStrokeWidth}; stroke-linecap: round; stroke-linejoin: round;"
					/>
				{/if}
				<!-- Background-colored stroke carving the white gap between logo and outline -->
				<path
					d={LOGO_PATH}
					fill="none"
					style="stroke: var(--main-bg-colour); stroke-width: {gapStrokeWidth}; stroke-linecap: round; stroke-linejoin: round;"
				/>
				<!-- Opaque logo painted last, covering the strokes' inner halves -->
				<path d={LOGO_PATH} bind:this={logoPathElement} style="fill: var(--black-theme);" />
			</g>
		</svg>
		<h3 class:font-ready={fontReady}>LOADING RESOURCES...</h3>
	</div>
	<div class="animate"></div>
	<!-- Required Otherwise Gets Pruned -->
</div>

<style>
	/* Styles for the preloader */
	.preloader {
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		background-color: var(--main-bg-colour); /* Color of each strip */

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		z-index: 1000;

		overflow: hidden;
		opacity: 1;
	}

	.preloader-container {
		text-align: center;

		/* background-color: aqua; */
	}

	.preloader-container h3 {
		margin-top: 1.5rem;

		/* Hidden until the display font has loaded to avoid the fallback-font flash */
		opacity: 0;
	}

	.preloader-container h3.font-ready {
		opacity: 1;
		transition: opacity 0.25s ease;
	}

	.preloader-outline {
		display: block;
		width: 7.6rem;
		height: 15rem;
		max-height: 45vh;

		margin: 0 auto;

		overflow: visible;
	}

	.animate {
		animation-delay: 1s;
		animation-name: fadeOut;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	/* Apply animations staggered */

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		99% {
			opacity: 0;
		}
		100% {
			z-index: -15;
			display: none;
		}
	}
</style>
