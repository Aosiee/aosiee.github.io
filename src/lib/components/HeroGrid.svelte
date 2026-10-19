<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { projects, projectCategories, getProjectPage } from '$lib/data/projects';
	import { getPlatformIcon } from '$lib/data/platformIcons';
	import { getImageVariants, GRID_IMAGE_SIZES } from '$lib/data/image-srcsets';
	import type { PlatformLink } from '$lib/data/projects';

	export let showSelector = false;
	export let separateCategories = false;
	export let showPlatforms = true;

	let isotope: any = null;
	let activeFilter: string | null = null;

	type GridItemData = {
		title: string;
		page: string;
		src: string;
		logo: string;
		platforms: PlatformLink[];
	};

	// The stagger spreads each card's rise across the full scroll range,
	// so the last card finishes exactly when the grid fully enters the viewport.
	const totalCards = projectCategories.reduce(
		(sum, category) => sum + projects.filter((project) => project.category === category.key).length,
		0
	);
	const staggerStep = 0.6 / Math.max(totalCards - 1, 1);

	let staggerCount = 0;

	let gridCategories = projectCategories.map((category) => {
		const data = projects
			.filter((project) => project.category === category.key)
			.map(
				(project): GridItemData => ({
					title: project.title,
					page: getProjectPage(project),
					src: project.thumbnail,
					logo: project.logo,
					platforms: project.platforms
				})
			);

		const categoryStaggerCount = staggerCount;
		staggerCount += data.length;

		return {
			data,
			categoryClass: category.key,
			categoryClassRaw: `.${category.key}`,
			categoryTitle: category.title,
			categoryStaggerCount
		};
	});

	let isotopeLoadPromise: Promise<void> | null = null;

	function ensureIsotope(): Promise<void> {
		if (window.Isotope) {
			return Promise.resolve();
		}
		if (!isotopeLoadPromise) {
			isotopeLoadPromise = new Promise((resolve, reject) => {
				const script = document.createElement('script');
				script.src = `${base}/assets/scripts/isotope.pkgd.min.js`;
				script.onload = () => resolve();
				script.onerror = () => reject(new Error('Failed to load Isotope'));
				document.body.appendChild(script);
			});
		}
		return isotopeLoadPromise;
	}

	onMount(async () => {
		try {
			await ensureIsotope();
			isotope = new window.Isotope('.grid', {
				itemSelector: '.grid-item',
				layoutMode: 'fitRows'
			});
		} catch (error) {
			console.error('Failed to initialize grid layout:', error);
		}

		setupScrollProgress();
	});

	function filterItems(filter: string | null) {
		if (isotope) {
			activeFilter = filter;
			isotope.arrange({ filter: filter ? filter : '*' });
		}
	}

	function toggleFilter(filter: string) {
		// If the same button is clicked, reset the filter (show all)
		if (activeFilter === filter) {
			filterItems(null);
		} else {
			filterItems(filter);
		}
	}

	// ---- Fade-in once a card's images are loaded ----
	// Tracks how many images per card have finished loading; a card fades in
	// once all of its images (logo + thumbnail) are loaded.
	let loadCounts: Record<string, number> = {};
	let loadedItems: Set<string> = new Set();

	function markLoaded(key: string, expected: number) {
		const count = (loadCounts[key] ?? 0) + 1;
		loadCounts[key] = count;
		if (count >= expected) {
			loadedItems = new Set(loadedItems).add(key);
		}
	}

	// Guaranteed image-load check: fires immediately for cached/complete
	// images, otherwise waits for the load event before marking the card loaded.
	function imageLoaded(node: HTMLImageElement, onLoaded: () => void) {
		if (node.complete && node.naturalWidth > 0) {
			onLoaded();
			return;
		}
		const handle = () => {
			onLoaded();
		};
		node.addEventListener('load', handle, { once: true });
		node.addEventListener('error', handle, { once: true });
	}

	// ---- Scroll-scrubbed staggered rise (like capybaragames.com) ----
	// Cards translate up as the grid scrolls through the viewport, staggered
	// per card and fully reversible (scrolling back sinks them down again).
	function setupScrollProgress() {
		const container = document.querySelector<HTMLElement>('.grid');
		if (!container) return;

		// Cards start faded until their images load (JS-only, so no-JS stays visible)
		container.querySelectorAll('.card-body').forEach((card) => {
			card.classList.add('pending');
		});

		let rafId = 0;

		const update = () => {
			rafId = 0;
			const rect = container.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const progress = Math.min(
				1,
				Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height))
			);
			container.style.setProperty('--scroll-progress', String(progress));
		};

		const onScroll = () => {
			if (!rafId) {
				rafId = requestAnimationFrame(update);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		update();
	}
</script>

<div class="container" style="z-index: 11;">
	{#if showSelector}
		<!-- Filter Buttons -->
		<div class="button-group row grid-item">
			{#each gridCategories as category}
				<div class="button-container col-4">
					<button
						class="category-button btn btn-success {activeFilter === category.categoryClassRaw
							? 'active'
							: ''}"
						on:click={() => toggleFilter(category.categoryClassRaw)}
					>
						<svg viewBox="0 0 107 62" preserveAspectRatio="none" class="button-border">
							<path
								fill="transparent"
								stroke="currentColor"
								stroke-width="3"
								d="M90.827 5.851s-40.2-5.078-67.581-.337c0 0-16.345-.086-17.956 11.359-2.133 11.445-.149 24.599 3.059 31.072 3.208 6.474 6.292 9.233 12.195 9.776 5.902.543 61.557.688 67.676-.358 6.119-1.045 12.025-7.464 13.017-17.064.992-9.6 7.743-30.336-10.41-34.448Z"
							></path>
						</svg>
						<h5>
							{category.categoryTitle}
						</h5>
					</button>
				</div>
			{/each}
		</div>

		<hr />
	{/if}

	<!-- Grid Layout -->
	<div class="w-100 overflow-x-hidden">
		<div class="row grid gx-5 overflow-hidden">
			{#each gridCategories as category, index}
				{#if category}
					{#if separateCategories}
						<div
							class="col-12 grid-item grid-title {category.categoryClass}"
							style="--stagger-offset: {category.categoryStaggerCount * staggerStep}"
						>
							<h1>{category.categoryTitle}</h1>
						</div>

						<div
							class="col-12 grid-item grid-title"
							style="--stagger-offset: {category.categoryStaggerCount * staggerStep}"
						>
							<!-- <div style="height: 25px;"></div> -->
							<hr class="grid-hr" />
							<div style="height: 30px;"></div>
						</div>
					{/if}

					{#each category.data as item, itemIndex}
						{@const variants = getImageVariants(item.src)}
						<div class="col-sm-12 col-md-6 col-lg-4 card grid-item {category.categoryClass}">
							<!-- <div class="card"> -->
							<div
								class="card-body"
								class:loaded={loadedItems.has(item.page)}
								style="--stagger-offset: {(category.categoryStaggerCount + itemIndex) *
									staggerStep}"
							>
								<a class="card-logo-link" href={base + item.page} data-sveltekit-noscroll>
									{#if item.logo}
										<div class="card-logo">
											<img
												src={base + item.logo}
												alt={item.title + ' Logo'}
												class="h-100"
												use:imageLoaded={() => markLoaded(item.page, 2)}
											/>
										</div>
									{/if}

									<div class="card-image">
										<img
											src={base + item.src}
											srcset={variants.length
												? variants.map((v) => `${base}${v.url} ${v.width}w`).join(', ')
												: null}
											sizes={variants.length ? GRID_IMAGE_SIZES : null}
											class="w-100 h-100"
											alt={item.title}
											loading="lazy"
											use:imageLoaded={() => markLoaded(item.page, item.logo ? 2 : 1)}
										/>
									</div>
								</a>
								<div class="card-text-block">
									<a class="card-text-link" href={base + item.page} data-sveltekit-noscroll>
										<!-- <h2 class="card-text tight-text uppercase" style="font-size: 1.375rem">{item.title}</h2> -->
										<h2 class="card-text uppercase" style="font-size: 1.25rem">{item.title}</h2>
									</a>

									{#if showPlatforms && item.platforms.length > 0}
										{#each item.platforms as platform}
											{@const icon = getPlatformIcon(platform.platform)}
											{#if icon}
												<a class="platform-icon" href={platform.link} data-sveltekit-noscroll>
													<svg
														class="h-100"
														viewBox={icon.viewbox}
														fill="currentColor"
														fill-rule="evenodd"
														preserveAspectRatio="xMidYMid meet"
													>
														<path d={icon.icon}> </path>
													</svg>
												</a>
											{/if}
										{/each}
									{/if}
								</div>
							</div>
							<!-- </div> -->
						</div>
					{/each}
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.card-text-block {
		height: 2rem;
		display: flex;
		margin-top: 0.5rem;
		color: var(--primary-theme);
	}

	.platform-icon {
		padding: 4px;
		width: auto;
		height: 100%;

		display: flex;
		align-items: center;

		transition: 0.3s;
	}

	.platform-icon svg {
		width: 100%;
	}

	.card-body .platform-icon:hover {
		transform: scale(1.1);
		transition: 0.3s;
		color: var(--highlight-theme);
	}

	.button-group {
		margin-bottom: 1rem;
		justify-content: space-around;
	}
	.btn.active {
		background-color: black;
		color: white;
	}

	/* .grid-item {
		margin-bottom: 1rem;
	} */

	.button-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		height: 6rem;
		width: 18rem;
		/* overflow: hidden; */
	}

	.category-button {
		position: absolute;
		left: 0;
		z-index: 15;
		height: 100%;
		width: 100%;
		top: -2px;

		-webkit-clip-path: url(#btn-shape);
		clip-path: url(#btn-shape);

		color: var(--primary-theme);
	}

	.category-button:active {
		background-color: var(--primary-theme);
		color: var(--main-bg-colour);
	}

	.category-button h5 {
		margin: 1rem;
	}

	.button-border {
		position: absolute;
		width: 90%;
		height: 85%;
		top: 52%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.card-body:hover .card-logo-link .card-image img {
		transform: scale(1.05);
		transition-duration: 0.3s;
	}
	.card-body:hover .card-logo-link .card-logo img {
		transform: scale(0.95);
		transition-duration: 0.3s;
	}
	.card-body a .card-image img {
		transition-duration: 0.3s;
	}
	.card-body a .card-logo img {
		transition-duration: 0.3s;
	}

	.card-body {
		height: 100%;
		padding: 0 0 30px 0;

		padding-left: 1rem;
		padding-right: 1rem;
	}
	/* Reserve space for the scroll offset so translated cards never clip
	   into the footer (the container's overflow-hidden would cut them off).
	   Matches the last card's translate (stagger offset 0.6) plus a small
	   allowance for the card overflow. */
	.grid {
		padding-bottom: calc(64px * (1 - min(max((var(--scroll-progress, 1) - 0.6) / 0.6, 0), 1)));
	}

	/* Fade-in once the card's images are loaded */
	.card-body.pending {
		opacity: 0;
	}

	.card-body.pending.loaded {
		opacity: 1;
		transition: opacity 0.5s ease-out;
	}

	/* Scroll-scrubbed staggered rise, reversible in both directions */
	.card-body,
	.grid-item.grid-title > * {
		transform: translateY(
			calc(
				(1 - min(max((var(--scroll-progress, 1) - var(--stagger-offset, 0)) / 0.6, 0), 1)) * 40px
			)
		);
	}

	@media (prefers-reduced-motion: reduce) {
		.card-body,
		.grid-item.grid-title > * {
			transform: none;
		}

		.card-body.pending {
			opacity: 1;
			transition: none;
		}
	}

	.card-body .card-logo-link .card-image img {
		object-fit: cover;
		object-position: center;

		-webkit-clip-path: url(#game-card-mask);
		clip-path: url(#game-card-mask);
	}

	.card-body .card-logo-link {
		display: flex;
		height: 93%;
		width: 100%;

		justify-content: center;
		align-items: center;
	}

	.card {
		/* max-height: 20rem; */
		height: 18rem;

		/* Disabling Bootstrap Defaults */
		border: 0;
		background-color: transparent;

		padding-bottom: 1rem;
	}

	.card-logo img {
		object-fit: contain !important;
		max-width: 65%;
	}

	.card-image {
		height: 100%;
		width: 100%;
	}

	.card-logo {
		max-height: 10rem;
		position: absolute;
		z-index: 1;

		justify-content: center;
		align-items: center;
		place-items: center;

		padding: 1.75rem;
		top: 50;
		left: 0;

		width: 100%;
		height: 100%;

		display: flex;
	}

	.card-text-link {
		text-decoration: none;
		width: 100%;
		height: 100%;
		align-content: center;
		color: var(--grey-theme);
	}

	.card-body:hover .card-text-link .card-text {
		color: var(--highlight-theme);
		transition: 0.3s;
	}

	.grid-title h1 {
		padding-top: 0.75rem;
	}

	.grid-hr {
		margin: 0;
	}
</style>
