<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { project } = data; // Destructure the post from data

	import { base } from '$app/paths';
	import Carousel from '$lib/components/carousel/Carousel.svelte';
	import BakedMedia from '$lib/components/BakedMedia.svelte';
	import CenterBackground from '$lib/components/layout/CenterBackground.svelte';
</script>

<svelte:head>
	{#if project}
		<title>Felipe Lara - {project.title}</title>
		<meta name="description" content="Portfolio - {project.title}" />
	{:else}
		<title>Felipe Lara - Loading</title>
		<meta name="description" content="Portfolio - Loading" />
	{/if}
</svelte:head>

<div class="project-header">
	{#if project.art.background && project.art.maxWidth}
		<img
			src={base + project.art.background}
			alt="{project.title} Decorative Background With Max Width"
			loading="lazy"
			style="object-position: {project.art.background_position}; max-width: {project.art
				.maxWidth}; border-radius: 15%; object-fit: contain; {project.art.style
				? project.art.style
				: ''}"
		/>
	{:else if project.art.background}
		<img
			src={base + project.art.background}
			alt="{project.title} Decorative Background"
			loading="lazy"
			style="object-position: {project.art.background_position}; {project.art.style
				? project.art.style
				: ''}"
		/>
	{/if}

	{#if project.art.background && project.art.logo}
		<div class="project-logo">
			<img src={base + project.art.logo} alt="{project.title} Decorative Logo" loading="lazy" />
		</div>
	{/if}
</div>

<CenterBackground />
<div class="container">
	<div class="content-area">
		{#if project}
			<div class="project-page">
				{#if !project.art.logo}
					<h1 class="text-uppercase">{project.title}</h1>
				{/if}

				{#if project.page_data.headerBlock}
					<h2 style="text-wrap: balance;">
						{project.page_data.headerBlock.company} | {project.page_data.headerBlock.duration}
					</h2>
				{/if}

				{#each project.page_data.projectBlocks as block, index}
					<div {...block.nav ? { id: block.nav } : {}}>
						{#if block.projectCarousel}
							<div class="carousel-sizer">
								<Carousel items={block.projectCarousel} />
							</div>
						{/if}

						{#if block.projectVideo}
							<div class="media-sizing">
								<iframe
									src={block.projectVideo + '&rel=0&modestbranding=1&showinfo=0&color=white'}
									title={block.title + ' ' + project.title + ' Video'}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
									allowfullscreen
									loading="lazy"
								/>
							</div>
						{/if}

						{#if block.projectGif}
							<div class="media-sizing">
								<BakedMedia
									src={block.projectGif}
									title={project.title + ' Project Gif'}
									style="max-width: 540px"
								/>
							</div>
						{/if}

						{#if block.blockTitle}
							<h3>{block.blockTitle}</h3>
						{/if}
						{#if block.description}
							{#each block.description as descriptor}
								<div class="project-description w-100">
									{#if descriptor.type === 'text'}
										<p>{@html descriptor.text}</p>
									{/if}
									{#if descriptor.type === 'img'}
										{#if descriptor.link}
											<BakedMedia src={descriptor.link} title={descriptor.text} />
										{/if}
										<p>{@html descriptor.text}</p>
									{/if}
								</div>
							{/each}
						{/if}
						{#if block.list}
							<ul>
								{#each block.list as listItem, index}
									{#if listItem.nav != null}
										<li><a href={'#' + listItem.nav}>{listItem.text}</a></li>
									{:else}
										<li>{listItem.text}</li>
									{/if}
								{/each}
							</ul>
						{/if}
					</div>

					<hr />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.project-page h2,
	.project-page p,
	.project-page ul {
		font-family: 'Montserrat';
		font-weight: 550;
		font-size: 1rem;
	}

	.media-sizing {
		width: 100%;
		height: 100%;

		overflow: hidden;
		position: relative;
	}

	.media-sizing iframe {
		min-height: 304px;
		height: auto;
	}

	/* .media-sizing img {
		min-height: 304px;
		height: auto;
	} */

	.project-header {
		height: 40vh;
		position: relative;
	}

	.project-header img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
	}

	.project-logo {
		width: 100%;
		height: 100%;
		display: flex;

		justify-content: center;
		place-items: center;
	}

	.project-header .project-logo img {
		width: 55%;
		height: 55%;
		object-fit: contain;
		position: absolute;
	}

	.content-area {
		z-index: 10;
		width: 100%;
		position: relative;
	}

	.carousel-sizer {
		width: 540px;
		height: 304px;
		max-width: 100%;
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 767.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.media-sizing {
			width: 100%;
			height: 150px;

			padding-bottom: 56.25%;
		}

		.media-sizing iframe {
			width: 100%;
			height: 100%;
			min-height: unset;

			top: 0;
			left: 0;
			bottom: 0;

			position: absolute;
		}

		.carousel-sizer {
			width: 100%;
			height: 304px;
			max-width: 100%;
		}
	}

	@media (min-width: 768px) and (max-width: 1200px) {
		.carousel-sizer {
			width: 100%;
			height: 404px;
			max-width: 100%;
		}
	}
</style>
