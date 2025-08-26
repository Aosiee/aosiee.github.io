<script type="text/javascript" lang="ts">
	import { base } from '$app/paths';

	import { Video } from '@splidejs/splide-extension-video';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	export let items: itemData[] = [];

	type itemData = {
		title: string;
		position: string;
		src: string;
		type: string;
	};

	var useArrows: boolean = items.length != 1;
	var dynamicType: string = useArrows ? 'loop' : 'fade';
</script>

<!-- Carousel CSS -->
<link rel="stylesheet" href="/assets/styles/carousel.css" />

<!-- Splide Carousel -->
<Splide
	aria-label="Splide Carousel"
	class="splide-carousel"
	options={{
		type: dynamicType,
		rewind: true,
		rewindByDrag: true,
		lazyLoad: 'nearby',
		preloadPages: 1,
		wheel: true,
		wheelSleep: 75,
		gap: 0,
		snap: true,
		arrows: useArrows,
		pagination: useArrows,
		video: {
			host: 'https://www.youtube-nocookie.com',
			playerOptions: {
				youtube: {}
			}
		}
	}}
	extensions={{ Video }}
	on:mounted={(e) => {
		const splide = e.detail.splide;
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
		{#if item.type === 'image'}
			<SplideSlide>
				<img data-splide-lazy={base + item.src} alt={item.title} />
			</SplideSlide>
		{:else if item.type === 'youtube'}
			<SplideSlide data-splide-youtube={'https://www.youtube.com/watch?v=' + item.src}>
				<img
					data-splide-lazy={`https://img.youtube.com/vi/${item.src}/maxresdefault.jpg`}
					alt="Video Slide"
				/>

				{#if useArrows}
					<div class="blocker left" />
					<div class="blocker right" />
				{/if}
			</SplideSlide>
		{/if}
	{/each}
</Splide>

<style>
	.blocker {
		height: 65%;
		top: 50px;
		bottom: 80px;
		width: calc(50% - 125px);
		z-index: 6;
	}

	.blocker.left {
		position: absolute;
		left: 0;
		/* border: 2px solid green; */
	}

	.blocker.right {
		position: absolute;
		left: auto;
		right: 0;
		/* border: 2px solid red; */
	}
</style>
