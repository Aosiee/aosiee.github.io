<script type="text/javascript" lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { flickityStore } from '$lib/stores/flickityStore';

	let flickityInstance: any = null;

	const unusedClass = 'carousel-item-start';

	export let items: itemData[] = [];
	console.log('Items');
	console.log(items);

	type itemData = {
		title: string;
		position: string;
		src: string;
		type: string;
	};

	onMount(() => {
		// Load Flickity JS after the component is mounted
		flickityStore.update((store) => {
			if (store.instance) {
				console.log('Flickity already initialized, recreating instance.');
				flickityInstance = store.instance;
				flickityInstance.destroy();

				console.log('Initializing new Flickity instance, Count = ' + (store.count + 1).toString());

				setTimeout(() => {
					const carouselElement = document.querySelector('.carousel') as HTMLElement;
					flickityInstance = new window.Flickity(carouselElement, {
						wrapAround: true,
						autoPlay: false,
						pageDots: true,
						lazyLoad: 1,
					});
				}, 750); // Small delay to ensure correct mounting
			} else {
				console.log('Initializing new Flickity instance, Count = ' + (store.count + 1).toString());
				const carouselElement = document.querySelector('.carousel') as HTMLElement;
				flickityInstance = new window.Flickity(carouselElement, {
					wrapAround: true,
					autoPlay: false,
					pageDots: true,
					lazyLoad: 1,
				});
			}

			return { instance: flickityInstance, count: store.count + 1 }; // Increase count
		});
	});

	onDestroy(() => {
		flickityStore.update((store) => {
			const newCount = store.count - 1;
			if (newCount <= 0 && store.instance === flickityInstance && flickityInstance !== null) {
				console.log('Destroying Flickity (no more components using it).');
				flickityInstance.destroy();
				return { instance: null, count: 0 }; // Fully clear store
			} else if (newCount <= 0) {
				console.log('Instances below 0, resetting store');
				return { instance: null, count: 0 }; // Fully clear store
			}
			return { instance: store.instance, count: newCount }; // Just decrease count
		});
	});
</script>

<div>
	<div class="carousel-item-start carousel-item-end"></div>
</div>

<div class="carousel">
	{#each items as item}
		<div class="carousel-cell">
			{#if item.type === 'image'}
				<img data-flickity-lazyload={base + item.src} class="d-block w-100" alt={item.title} />
			{:else if item.type === 'video'}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video class="carousel-video" controls>
					<source src={base + item.src} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			{:else if item.type === 'youtube'}
				<iframe
					width="100%"
					height="100%"
					src={item.src + '?rel=0&modestbranding=1&showinfo=0&color=white'}
					title={item.title + ' Project Video'}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					loading="lazy"
				></iframe>
			{/if}
		</div>
	{/each}
</div>

<none style="display: none;" class="carousel is-fullscreen"><none class="carousel-cell" /></none>

<style>
	.carousel {
		background-color: var(--main-bg-colour);
		width: 100%;
	}

	.carousel-cell {
		width: 100%; /* 100% of container width */
		height: 100%;
		margin-right: 10px; /* optional, if you want space between cells */

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-cell iframe {
		height: 100%;
		width: 100%;
	}

	/* Set a default height for the div */
	.carousel {
		height: 50vh; /* Default height */
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.carousel {
			height: 25vh;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.carousel {
			height: 30vh;
		}
	}

	.carousel.is-fullscreen {
		height: 100vh !important;
		z-index: 9999999 !important;
	}

	.carousel.is-fullscreen .carousel-cell {
		height: 100vh !important;
		z-index: 9999998 !important;
	}

	.carousel.is-fullscreen .carousel-cell img {
		height: 100vh !important;
		z-index: 9999997 !important;
		background-color: black;
	}
</style>
