<script>
	import Header from '$lib/components/Header.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import PixelTransition from '$lib/transitions/pixelTransition.svelte';

	export let data;
</script>

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
