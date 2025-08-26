<script type="text/javascript" lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { items } from '$lib/components/Hero-Carousel-Items.svelte';
</script>

<!-- Carousel CSS -->
<link rel="stylesheet" href="/assets/styles/carousel.css" />

<!-- Splide Hero Carousel -->
<Splide
	aria-label="Hero Carousel"
	class="hero-carousel"
	options={{
		type: 'fade',
		speed: 1200,
		rewind: true,
		rewindByDrag: true,
		lazyLoad: 'nearby',
		preloadPages: 2,
		wheel: false,
		wheelSleep: 75,
		gap: 0,
		snap: true,
		arrows: true,
		pagination: true,
		autoplay: true,
		interval: 10000,
		perMove: 1,
	}}
>
	{#each items as item}
		<SplideSlide>
			<img
				alt={item.title}
				class="d-block w-100"
				style={'object-position:' + (item.position ?? 'center')}
				data-splide-lazy-srcset={item.background_srcset ?? undefined}
				sizes={item.background_sizes}
				/>
				<!-- data-splide-lazy={item.background_src ?? undefined} -->

			{#if item.logo_src || item.logo_srcset}
				<div class="hero-carousel-center">
					<div class="hero-carousel-logo-holder">
						<a href={item.page} data-sveltekit-noscroll>
							<img
								alt={`${item.title} logo`}
								class="d-block w-100"
								data-splide-lazy-srcset={item.logo_srcset ?? undefined}
								sizes={item.logo_sizes}
								/>
								<!-- data-splide-lazy={item.logo_src ?? undefined} -->
						</a>
					</div>
				</div>
			{/if}
		</SplideSlide>
	{/each}
</Splide>
