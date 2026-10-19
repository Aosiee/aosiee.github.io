<script type="text/javascript" lang="ts">
	import '@splidejs/splide/css';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import BakedMedia from '$lib/components/BakedMedia.svelte';
	import { heroCarouselItems as items } from '$lib/data/hero-carousel';
	import { preloaderDone } from '$lib/stores/preloaderStore';
</script>

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
		pauseOnFocus: false
	}}
	on:mounted={(e) => {
		const splide = e.detail.splide;

		// Keep autoplay paused while the preloader is covering the page
		splide.Components.Autoplay.pause();
		const unsubscribe = preloaderDone.subscribe((done) => {
			if (done) {
				splide.Components.Autoplay.play();
				unsubscribe();
			}
		});

		// Fill the upcoming pagination dot as autoplay counts down to the next slide
		let nextDotIndex = -1;

		function updateNextDot() {
			const pages = splide.Components.Pagination.items.map((item) => item.button);
			pages.forEach((page) => page.classList.remove('is-next'));
			const nextIndex = (splide.index + 1) % splide.length;
			nextDotIndex = nextIndex;
			pages[nextDotIndex]?.classList.add('is-next');
		}

		updateNextDot();

		// Smoothly interpolate the displayed progress toward the autoplay rate
		let targetProgress = 0;
		let displayedProgress = 0;
		let manualNavigation = false;
		// Peak rate seen this cycle; Splide's internal rewind emits playing(0)
		// during moves, which would otherwise clobber the pre-move rate.
		let lastPeakRate = 0;

		function tick() {
			const delta = targetProgress - displayedProgress;
			displayedProgress += delta * 0.15;
			if (Math.abs(delta) < 0.0004) {
				displayedProgress = targetProgress;
			}
			if (nextDotIndex >= 0) {
				const nextDot = splide.Components.Pagination.items[nextDotIndex]?.button;
				nextDot?.style.setProperty('--autoplay-progress', String(displayedProgress));
			}
			requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);

		splide.on('autoplay:playing', (/** @type {number} */ rate) => {
			lastPeakRate = Math.max(lastPeakRate, rate);
			targetProgress = rate;
		});

		// An autoplay advance happens exactly when the rate reaches 1; any other
		// move (dots, arrows, drag/swipe, keyboard) counts as manual navigation.
		splide.on('move', () => {
			manualNavigation = lastPeakRate < 0.999;
		});

		splide.on('autoplay:play', updateNextDot);
		splide.on('autoplay:pause', () => {
			targetProgress = 0;
		});

		splide.on('moved', () => {
			const previousNextDots = splide.Components.Pagination.items
				.map((item) => item.button)
				.filter((button) => button.classList.contains('is-next'));

			if (manualNavigation) {
				// Manual jumps: clear the old dot's fill instantly, no animation
				previousNextDots.forEach((dot) => {
					dot.style.removeProperty('--autoplay-progress');
				});
			} else {
				// Autoplay: complete the old dot's fill so it hands off seamlessly
				previousNextDots.forEach((dot) => {
					dot.classList.add('completing');
					dot.style.setProperty('--autoplay-progress', '1');
					setTimeout(() => {
						dot.classList.remove('completing');
						dot.style.removeProperty('--autoplay-progress');
					}, 400);
				});
			}

			updateNextDot();
			targetProgress = 0;
			displayedProgress = 0;

			// The countdown resumes immediately so the next change stays telegraphed
			manualNavigation = false;
			lastPeakRate = 0;
		});

		// Fallback to HD YouTube thumbnail when maxresdefault is unavailable
		splide.on('lazyload:loaded', (_img, slide) => {
			if (_img) {
				if (_img.naturalWidth <= 135) {
					let choppedUrl = _img.currentSrc.split('/');
					if (!_img.dataset.fallbackDone) {
						_img.dataset.fallbackDone = '1';
						// _img.setAttribute('data-splide-lazy', `https://img.youtube.com/vi/${choppedUrl[4]}/hqdefault.jpg`);
						_img.setAttribute('src', `https://img.youtube.com/vi/${choppedUrl[4]}/hqdefault.jpg`);
						console.log('Failed To Find MaxResDefault, Using HD');
					}
				}
			}
		});
	}}
>
	{#each items as item}
		<SplideSlide>
			{#if item.background_src}
				<BakedMedia
					src={item.background_src}
					srcset={item.background_srcset ?? undefined}
					sizes={item.background_sizes}
					title={item.title}
					cover
					mediaStyle={'object-position: ' + (item.position ?? 'center')}
				/>
			{/if}

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
