<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Preloader from '$lib/components/layout/Preloader.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SvgDefs from '$lib/components/SvgDefs.svelte';

	import PixelTransition from '$lib/transitions/pixelTransition.svelte';

	import { dev } from '$app/environment';
	export let data;
</script>

<SvgDefs />

<svelte:head>
	{#if dev}
		<link rel="icon" href="/assets/images/logos/dev-favicon.png" />
	{/if}
</svelte:head>

<div class="app">
	<Preloader />
	<Header />

	<main>
		<PixelTransition key={data.url}>
			<slot />
		</PixelTransition>
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;

		background-color: var(--main-bg-colour);
	}
</style>
