<script lang="ts">
	import { base } from '$app/paths';
	import CenterBackground from '$lib/components/CenterBackground.svelte';
	import Hero_Grid from '$lib/components/HeroGrid.svelte';
</script>

<svelte:head>
	<title>Felipe Lara - Projects</title>
	<meta name="description" content="Portfolio - Projects" />
</svelte:head>

<div class="about-header">
	<img
		src="{base + '/assets/images/headers/AboutMeHeader.jpg'}"
		alt="About Me Decorative Background"
		loading="lazy"
	/>
</div>

<div style="background-color: var(--main-bg-colour);">
	<CenterBackground />
	<div style="position: relative; z-index: 11;">
		<Hero_Grid showSelector={false} separateCategories={true} showPlatforms={true}/>
	</div>
</div>

<style>
	.about-header {
		height: 40vh;
	}

	.about-header img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
