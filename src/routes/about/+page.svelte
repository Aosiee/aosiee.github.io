<script lang="ts">
	import { base } from '$app/paths';
	import CenterBackground from '$lib/components/layout/CenterBackground.svelte';
	import AboutEntry from '$lib/components/AboutEntry.svelte';
	import { gameExperienceItems, eduExperienceItems, educationItems } from '$lib/data/about';
</script>

<svelte:head>
	<title>Felipe Lara - About</title>
	<meta name="description" content="Portfolio - About" />
</svelte:head>

<div
	class="about-header"
	style={'background-image: url(' +
		base +
		'/assets/images/misc/gifs/cityscape.gif' +
		'); filter: grayscale(1); background-position: right; background-repeat: repeat-x; background-size: calc(3.16 * 22vh);'}
/>

<div style="background-color: var(--main-bg-colour);">
	<CenterBackground />

	<div class="text-area">
		<div class="about-me-column">
			<div class="about-me-image-box">
				<img
					class="about-me-image"
					src={base + '/assets/images/misc/about-me/self-image-2.jpg'}
					alt="Portfolio Head Shot"
					loading="lazy"
				/>
			</div>

			<div class="category-title">
				<h2>ABOUT ME</h2>
			</div>
			<br />

			<div class="text-block">
				<p style="line-height: 1.5">
					At my core, I aspire to build meaningful experiences. From the first time I saw a game
					spark a smile, I knew I wanted to craft worlds that resonated. Programming gives me the
					tools to turn imagination into reality — and I’m always looking for new challenges that
					push my skills further, fuel personal growth, and let me create something that leaves a
					lasting impact.
				</p>
			</div>

			<hr />

			<div class="category-title">
				<h2>PROGRAMMING EXPERIENCE</h2>
			</div>
			<br />
			{#each gameExperienceItems as experience}
				<AboutEntry
					company={experience.company}
					site={experience.companySite}
					title={experience.title}
					sub={experience.sub}
					location={experience.location}
					logo={experience.logo}
					logoStyle={experience.logoStyle}
					start={experience.start}
					end={experience.end}
					projects={experience.projects}
					desktopAnchorStyle="height: fit-content;"
				/>
			{/each}

			<hr />

			<div class="category-title">
				<h2>Teaching Experience</h2>
			</div>
			<br />
			{#each eduExperienceItems as experience}
				<AboutEntry
					company={experience.company}
					site={experience.companySite}
					title={experience.title}
					sub={experience.sub}
					location={experience.location}
					logo={experience.logo}
					logoStyle={experience.logoStyle}
					rotateLogo={experience.rotateLogo}
					start={experience.start}
					end={experience.end}
					description={experience.description}
					list={experience.list}
				/>
			{/each}

			<hr />

			<div class="category-title">
				<h2>Education</h2>
			</div>
			<br />
			{#each educationItems as education}
				<AboutEntry
					company={education.company}
					site={education.educationSite}
					title={education.title}
					sub={education.sub}
					location={education.location}
					logo={education.logo}
					logoStyle={education.logoStyle}
					rotateLogo={education.rotateLogo}
					start={education.start}
					end={education.end}
					description={education.description}
					desktopTarget=""
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.category-title * {
		font-size: 1.75rem;
	}

	.about-header {
		height: 40vh;
	}

	.text-area {
		position: relative;
		z-index: 10;
		text-align: center;
		background-color: var(--main-bg-colour);

		width: 100%;
	}

	.about-me-column {
		width: 50%;
		max-width: 650px;
		margin-left: auto;
		margin-right: auto;
	}

	.text-block,
	.text-block p {
		width: 100%;
		margin-bottom: 2rem;
		font-family: var(--font-text);
		font-weight: 470 !important;
	}

	.about-me-image,
	.about-me-image-box {
		width: 100%;
		height: 100%;
	}

	.about-me-image {
		max-width: 50%;

		border-radius: 50%;
		border-style: solid;
		border-width: medium;
		border-color: var(--grey-theme);

		background-color: var(--grey-theme);

		filter: grayscale(1);
	}

	.about-me-image-box {
		max-width: 100%;
		padding: 0rem 2rem 2rem;
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.about-me-column {
			width: 100%;
			max-width: 80%;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.about-me-column {
			width: 100%;
			max-width: 80%;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		/* For screens between 768px and 991.98px wide (medium devices) */
		.about-me-column {
			width: 100%;
			max-width: 80%;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		/* For screens between 992px and 1199.98px wide (large devices) */
		.about-me-column {
			width: 100%;
			max-width: 70%;
		}
	}
</style>
