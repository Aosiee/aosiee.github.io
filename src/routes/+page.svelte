<script>
	import Hero_Carousel from '$lib/components/carousel/Hero-Carousel.svelte';
	import CenterBackground from '$lib/components/layout/CenterBackground.svelte';
	import Hero_Grid from '$lib/components/HeroGrid.svelte';
</script>

<svelte:head>
	<title>Felipe Lara - Home</title>
	<meta name="description" content="Portfolio - Home" />
</svelte:head>

<section style="justify-content: flex-start;">
	<Hero_Carousel />
	<CenterBackground zIndex={1} />

	<Hero_Grid showSelector={false} showPlatforms={true} separateCategories={true} />
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
