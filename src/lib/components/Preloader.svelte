<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { readable, writable } from 'svelte/store';

	// Example lists of resources to load
	/** @type {string[]} */
	const imagesToLoad = [
		'/assets/images/headers/TheChantHeader_NoLogo.jpg',
		'/assets/images/headers/TheChantHeader_Logo.png',
		'/assets/images/headers/TheChantDLCHeader-NoLogo.jpg',
		'/assets/images/headers/TheChantDLCHeader_Logo.png',
		'/assets/images/headers/ShiftHeader.jpg',
		'/assets/images/headers/AIOverviewHeader.jpg'
	];
	// const exampleScriptsToLoad = ['script1.js', 'script2.js'];
	/** @type {string[]} */
	const scriptsToLoad = [
		'/assets/scripts/flickity.pkgd.min.js',
		'/assets/scripts/isotope.pkgd.min.js'
	];

	/** @type {string[]} */
	const stylesToLoad = ['/assets/styles/styles.css'];

	// Store to track loading progress
	const progress = writable(0);
	// Reactively update progress bar width based on progress store
	$: progressBarWidth = $progress * 100 + '%';

	// Function to load an image
	/**
	 * @param {string} url
	 * @returns {Promise<void>}
	 */
	async function loadImage(url) {
		return /** @type {Promise<void>} */ (
			new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve();
				img.onerror = (error) => reject();
				img.src = base + url;

				// Check if the image is immediately available (from cache) or has failed
				if (img.complete && img.naturalWidth === 0) {
					// Image failed to load
					reject();
					// img.onerror();
				}
			})
		);
	}

	// Function to load a script
	/**
	 * @param {string} url
	 * @returns {Promise<void>}
	 */
	async function loadScript(url) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = base + url;

			// Set up onload and onerror before appending
			script.onload = () => {
				console.log(`Script loaded successfully: ${url}`);
				resolve();
			};
			script.onerror = (error) => {
				console.error(`Failed to load script: ${url}`, error);
				reject(new Error(`Failed to load script: ${url}`));
			};

			// Append only after setting up event listeners
			document.body.appendChild(script);
		});
	}

	// Function to load a stylesheet
	/**
	 * @param {string} url
	 * @returns {Promise<void>}
	 */
	async function loadStylesheet(url) {
		return /** @type {Promise<void>} */ (
			new Promise((resolve, reject) => {
				const link = document.createElement('link');
				link.onload = () => resolve();
				link.onerror = (error) => reject();
				link.rel = 'stylesheet';
				link.href = base + url;

				// Safety check: only append if href is set and there's no immediate error
				if (link.href) {
					document.head.appendChild(link);
				} else {
					reject(new Error(`Invalid Stylesheet URL: ${url}`));
				}
			})
		);
	}

	// Function To Load All Resources
	async function loadResources() {
		const totalResources = imagesToLoad.length + stylesToLoad.length + scriptsToLoad.length;
		let loadedTotalResources = 0;
		let loadedStylesheets = 0;
		let loadedImages = 0;
		let loadedScripts = 0;

		// Load Stylesheets
		if (stylesToLoad.length > 0) {
			console.log('-= Loading Stylesheets - Total: ' + stylesToLoad.length + ' =-');
			for (const style of stylesToLoad) {
				try {
					await loadStylesheet(style);
					loadedStylesheets++;
					console.log('Loaded Stylesheet: (' + loadedStylesheets + '/' + stylesToLoad.length + ')');
				} catch (error) {
					console.error('Failed To Load Stylesheet:', style, error);
				}
				loadedTotalResources++;
				progress.set(loadedTotalResources / totalResources);
			}
		}

		// Load Images
		if (imagesToLoad.length > 0) {
			console.log('-= Loading Images - Total: ' + imagesToLoad.length + ' =-');
			for (const image of imagesToLoad) {
				try {
					await loadImage(image);
					loadedImages++;
					console.log('Loaded Image: (' + loadedImages + '/' + imagesToLoad.length + ')');
				} catch (error) {
					console.error('Failed To Load Image:', image, error);
				}
				loadedTotalResources++;
				progress.set(loadedTotalResources / totalResources);
			}
		}

		// Load Scripts
		if (scriptsToLoad.length > 0) {
			console.log('Loading Scripts - Total: ' + scriptsToLoad.length);
			for (const script of scriptsToLoad) {
				try {
					await loadScript(script);
					loadedScripts++;
					console.log('Loaded Script: (' + loadedScripts + '/' + scriptsToLoad.length + ')');
				} catch (error) {
					console.error('Failed To Load Script:', script, error);
				}
				loadedTotalResources++;
				progress.set(loadedTotalResources / totalResources);
			}
		}

		console.log('-= Finished Preloading Assets =-');
	}

	onMount(() => {
		// document.body.classList.add('no-scroll'); // Add class to hide scrollbar
		loadResources().then(() => {
			// All resources loaded
			progress.set(1); // Set progress to 100%

			const preloader = document.querySelector('.preloader');
			if (preloader) {
				preloader.classList.add('animate');
			} else {
				console.warn('Failed to trigger fade-in animation.');
			}
		});

		// setTimeout(() => {
		//     document.body.classList.remove('no-scroll'); // Remove class to show scrollbar

		// }, 2000)
	});
</script>

<!-- TODO:: Instead of progress bar, shake svg, maybe little particles that fall off -->

<div class="preloader">
	<div class="preloader-container">
		<img
			class="preloader-logo"
			src="{base + '/assets/images/logos/logo-black-2.svg'}"
			alt="Logo On Preloader"
		/>
	</div>
	<div class="loading-bar-container">
		<h3>Loading Resources...</h3>
		<div class="loading-bar">
			<div class="progress" style="width: {progressBarWidth} !important;">
				<div style="width: 100%; position: absolute; text-align: center;">
					<!-- {progressBarWidth} -->
				</div>
			</div>

		</div>
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
		z-index: 1000;
		justify-content: center;

		overflow: hidden;
		opacity: 1;
	}

	.preloader-container {
		text-align: center;
		padding-top: 15dvh;
		width: 100%;

		max-width: 100%;

		overflow: hidden;

		/* background-color: aqua; */
	}

	.preloader-logo {
		height: 25%;

		/* background-color: bisque; */
	}

	.loading-bar-container {
		position: fixed;

		bottom: 15rem;
		left: 7.5%;
		right: 7.5%;
	}

	.loading-bar {
		width: 100%;
		height: 20px;
		background-color: var(--main-bg-colour);
		/* background-color: darkgray; */
		position: relative;
		margin-top: 10px;
		border-radius: 5px;
		overflow: hidden;
	}

	.progress {
		height: 100%;
		background-color: var(--black-theme);
		transition: width 0.3s ease; /* Ensure transition is applied to width */
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

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.preloader-container {
			width: 100%;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.preloader-container {
			width: 100%;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		/* For screens between 768px and 991.98px wide (medium devices) */
		.preloader-container {
			width: 75%;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		/* For screens between 992px and 1199.98px wide (large devices) */
		.preloader-container {
			width: 50%;
		}
	}

	@media (min-width: 1200px) {
		/* For screens 1200px and wider (extra large devices) */
		.preloader-container {
			width: 35%;
		}
	}
</style>
