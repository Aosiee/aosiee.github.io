<script>
	import Hero_Carousel from '$lib/components/Hero-Carousel.svelte';
	import CenterBackground from '$lib/components/CenterBackground.svelte';
	import Hero_Grid from '$lib/components/HeroGrid.svelte';
</script>

<svelte:head>
	<title>Felipe Lara - Home</title>
	<meta name="description" content="Portfolio - Home" />
</svelte:head>

<clipPath id="section-mask-2" clipPathUnits="objectBoundingBox" data-v-6ee8c214>
	<path
		transform="scale(0.000521 0.0011)"
		d="M1919.005 1022.583H0V0l235.075 2.448 227.67 17.991 246.37 3.173 86.12 6.755 126.65-1.31 208.33 13.023 226.18 3.602 317.85 18.455 151.58-1.616 93.18 9.258v950.804Z"
		data-v-6ee8c214
	></path>
</clipPath>
<clipPath id="contact-mask" clipPathUnits="objectBoundingBox" data-v-6ee8c214>
	<path
		transform="scale(0.00052 0.00123)"
		d="M1937.73 753.883s-119.22.094-126.23-.213c-7.01-.073-109.57-.98-116.07-.8-6.5.178-64.79 4.804-71.89 4.983-5.85.18-159.75 11.408-167.27 10.615-7.53-.793-68.03.47-70.03.48-2-.495-55.03-1.033-55.03-1.033s-109.02 1.006-119 1.781c-9.98.776-77.87 6.441-92.4 5.05-14.52-.6-103.08-1.66-108.61-2.508-5.52-.37-100.417 4.27-102.416 4.325-1.999.055-119.83 8.094-136.366 6.762-16.535-1.045-177.029 1.38-186.553.643-9.524-.738-155.927 4.8-170.907 5.713-14.288.913-157.261 10.84-170.784 10.212-13.522-.628-133.642-3.318-144.638-3.014-10.995.303-49.384 4.863-54.383 5.001-4.998.138-45.154 5.166-45.154 5.166V0H1937.73v753.883Z"
		data-v-6ee8c214
	></path>
</clipPath>

<section style="justify-content: flex-start;">
	<Hero_Carousel />
	<CenterBackground zIndex={1} />

	<Hero_Grid showSelector={false} showPlatforms={true} separateCategories={true}/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;

		background-color: var(--main-bg-colour);
	}
</style>
