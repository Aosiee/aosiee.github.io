<script type="text/javascript" lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let flickityInstance: any = null;

	const unusedClass = 'carousel-item-start';

	let items = [
		{
			title: 'The Chant',
			page: '/projects/professional-project/the-chant',
			position: 'top',
			src: '/assets/images/headers/TheChantHeader_NoLogo.jpg',
			logo: '/assets/images/headers/TheChantHeader_Logo.png'
		},
		{
			title: 'The Chant DLC',
			page: '/projects/professional-project/the-chant-dlc',
			position: 'left top',
			src: '/assets/images/headers/TheChantDLCHeader-NoLogo.jpg',
			logo: '/assets/images/headers/TheChantDLCHeader_Logo.png'
		},
		{
			title: 'Kinshft',
			page: '/projects/professional-project/kinshft',
			position: 'top',
			src: '/assets/images/headers/Kinshift_NoLogo_2.jpg',
			logo: '/assets/images/headers/Kinshift_Logo.png'
		},
		{
			title: 'Poppet',
			page: '/projects/game-jam/poppet',
			position: '80% 50%',
			src: '/assets/images/headers/Poppet_Header.jpg',
			logo: '/assets/images/headers/Poppet.png'
		},
		{
			title: 'Get A Grip',
			page: '/projects/game-jam/get-a-grip',
			position: '50% 25%',
			src: '/assets/images/headers/GAG_Header2.png',
			logo: '/assets/images/headers/GAG_Logo.png'
		}
	];

	onMount(() => {
		// Load Flickity JS after the component is mounted
		if (typeof window !== 'undefined') {
			const carouselElement = document.querySelector('.carousel') as HTMLElement;

			// Initialize Flickity after it's loaded
			flickityInstance = new window.Flickity(carouselElement, {
				wrapAround: true,
				autoPlay: 18000,
				pageDots: true,
				lazyLoad: 1
			});
		}
	});
</script>

<div>
	<div class="carousel-item-start carousel-item-end"></div>
</div>

<div class="carousel">
	{#each items as item}
		<div class="carousel-cell">
			{#if item.logo}
				<div class="carousel-center">
					<div class="carousel-background-image">
						<img
							data-flickity-lazyload={base + item.src}
							style="object-position: {item.position};"
							alt={item.title + ' Background Image'}
						/>
					</div>

					<div class="carousel-logo-holder">
						<a href={base + item.page} data-sveltekit-noscroll>
							<img data-flickity-lazyload={base + item.logo} class="d-block w-100" alt={item.title} />
						</a>
					</div>
				</div>
			{:else}
				<img data-flickity-lazyload={base + item.src} class="d-block w-100" alt={item.title} />
			{/if}
		</div>
	{/each}
</div>

<style>
	.carousel {
		background-color: black;
		width: 100%;
	}

	.carousel-cell {
		width: 100%; /* 100% of container width */
		height: 100%;
		margin-right: 10px; /* optional, if you want space between cells */
	}

	.carousel-center {
		height: 100%;
		width: 100%;

		background-position: 50% 0% !important;

		z-index: -10;

		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.carousel-background-image {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.carousel-background-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-logo-holder {
		height: 35%;
		object-fit: contain;
		transition: 0.25s ease-out;
		z-index: 1;
	}

	.carousel-logo-holder a {
		display: flex;
		height: 100%;
	}

	.carousel-logo-holder a img {
		height: 100%;
	}

	.carousel-logo-holder:hover {
		scale: 1.05;
		transition: 0.25s;
	}

	/* Set a default height for the div */
	.carousel {
		height: 45vh; /* Default height */
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.carousel {
			height: 60vh;
		}
		.carousel-logo-holder {
			max-height: 35vw;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.carousel {
			height: 80vh;
		}
		.carousel-logo-holder {
			max-height: 40vw;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		/* For screens between 768px and 991.98px wide (medium devices) */
		.carousel {
			height: 70vh;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		/* For screens between 992px and 1199.98px wide (large devices) */
		.carousel {
			height: 90vh;
		}
	}

	@media (min-width: 1200px) {
		/* For screens 1200px and wider (extra large devices) */
		.carousel {
			height: 85vh;
		}
	}
</style>
