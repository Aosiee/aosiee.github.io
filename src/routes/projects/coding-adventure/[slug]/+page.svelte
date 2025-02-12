<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { project } = data; // Destructure the post from data

	let loading = false;
	let error = null;

	import CenterBackground from '$lib/components/CenterBackground.svelte';

	console.log('Project =');
	console.log(project);
</script>

<svelte:head>
	{#if project}
		<title>Felipe Lara - {project.title}</title>
		<meta name="description" content="Portfolio - {project.title}" />
	{:else}
		<title>Felipe Lara - Loading</title>
		<meta name="description" content="Portfolio - Loading" />
	{/if}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="project-header">
	{#if project && project.art.background && project.art.maxWidth}
		<img
			src={project.art.background}
			alt="{project.title} Decorative Background With Max Width"
			loading="lazy"
			style="object-position: {project.art.background_position}; max-width: {project.art.maxWidth}; position-area: center; border-radius: 15%; object-fit: contain;"
		/>
	{:else if project && project.art.background}
		<img
			src={project.art.background}
			alt="{project.title} Decorative Background"
			loading="lazy"
			style="object-position: {project.art.background_position};"
		/>
	{/if}

	{#if project && project.art.background && project.art.logo}
		<div class="project-logo">
			<img src={project.art.logo} alt="{project.title} Decorative Logo" loading="lazy" />
		</div>
	{/if}
</div>

<CenterBackground />
<div class="container">
	<div class="content-area">
		{#if loading}
			<p>Loading...</p>
		{:else if error}
			<p>Error: {error}</p>
		{:else if project}
			<div class="project-page">
				{#if project && !project.art.logo}
					<h1>{project.title}</h1>
				{/if}

				{#if project.page_data.headerBlock}
					<h2>
						{project.page_data.headerBlock.company} | {project.page_data.headerBlock.duration}
					</h2>
				{/if}

				{#each project.page_data.projectBlocks as block, index}
					<div {...block.nav ? { id: block.nav } : {}}>
						{#if block.heroVideo}
							<div class="media-sizing">
								<iframe
									width="540"
									height="304"
									src={block.heroVideo + '?rel=0&modestbranding=1&showinfo=0&color=white'}
									title={block.title + ' ' + project.title + ' Video'}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
									allowfullscreen
									loading="lazy"
								></iframe>
							</div>
						{/if}

						{#if block.heroGif}
							<div style="width: 504px; height: 304px" class="media-sizing">
								<img
									style="object-fit: cover; width: 100%; height: 100%;"
									src={block.heroGif}
									alt="{project.title} Hero Gif"
									loading="lazy"
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
										<img src={descriptor.link} alt={descriptor.text} />
										<p>{@html descriptor.text}</p>
									{/if}
								</div>
							{/each}
						{/if}
						{#if block.list}
							<ul>
								{#each block.list as listItem, index}
									<li><a href={'#' + listItem.nav}>{listItem.text}</a></li>
								{/each}
							</ul>
						{/if}
					</div>

					<hr />
				{/each}
			</div>
		{/if}

		<!-- TODO -->
		<!-- <div style="height: 10rem; background-color: red; text-align: center; margin: 4rem;;">
			<h3>Add Back to Top & Back To Projects Page Link</h3>
			<p>Possibly Other Related / Recommended Projects</p>
			<p>Like Warhammer Website</p>
		</div> -->
	</div>
</div>

<style>
	.project-description img {
		width: 100%;
		max-width: 540px;
		object-fit: contain;
	}

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

	.project-header .project-logo img {
		width: 55%;
		height: 55%;
		object-fit: contain;
		position: absolute;
		position-area: center;
	}

	.content-area {
		z-index: 10;
		width: 100%;
		position: relative;
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 767.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.media-sizing {
			width: 100%;
			height: 0;

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
	}
</style>
