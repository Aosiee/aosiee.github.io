<script lang="ts">
	import { base } from '$app/paths';
	import CenterBackground from '$lib/components/CenterBackground.svelte';
	import Hero_Grid from '$lib/components/HeroGrid.svelte';
</script>

<svelte:head>
	<title>Felipe Lara - Projects</title>
	<meta name="description" content="Portfolio - Projects" />
</svelte:head>

<div
	class="about-header"
	style={'background-image: url(' +
		base +
		'/assets/images/misc/gifs/cityscape.gif' +
		'); filter: grayscale(1); background-position: right; background-repeat: repeat-x; background-size: calc(3.16 * 22vh);'}
/>

<!-- <div
	class="about-header"
	style={'background-image: url(' +
		base +
		'/assets/images/misc/gifs/cityscape-2.gif' +
		'); filter: grayscale(1); background-position: right; background-repeat: repeat-x; background-size: auto;'}
/> -->

<!-- <div class="about-header">
	<img
		src="{base + '/assets/images/misc/about-me/AboutMeHeader.jpg'}"
		alt="About Me Decorative Background"
		loading="lazy"
	/>
</div> -->

<div style="background-color: var(--main-bg-colour);">
	<CenterBackground />
	<div style="position: relative; z-index: 11;">
		<Hero_Grid showSelector={false} separateCategories={true} showPlatforms={true} />
	</div>
</div>
