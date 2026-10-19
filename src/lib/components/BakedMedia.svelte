<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { bakedMedia } from '$lib/data/media-manifest';
	import type { BakedLevel } from '$lib/data/media-manifest';
	import { imageLqips } from '$lib/data/image-lqips';

	/**
	 * Media path:
	 * - `.gif` / baked video paths render as a <video> using the quality level
	 *   that best fits the element's rendered size
	 * - images render as a plain <img>, and when the bake pipeline has produced
	 *   a low-quality placeholder for it, they load gradually (blurred
	 *   placeholder that sharpens in) — on by default
	 */
	export let src: string;
	/** Accessible label for the media. */
	export let title = '';
	/** Toggle the loading spinner overlay while the video buffers. */
	export let showSpinner = true;
	/** Extra inline styles for the wrapper element. */
	export let style = '';
	/** Extra inline styles for the media element itself (img or video). */
	export let mediaStyle = '';
	/** Responsive srcset for images (space-separated "url 640w" entries). */
	export let srcset = '';
	/** Sizes hint for the image srcset. */
	export let sizes = '';
	/** Fill the container edge-to-edge (used for full-bleed media like hero slides). */
	export let cover = false;
	/** Enable the gradual image loading (blurred placeholder -> sharp image). */
	export let gradual = true;
	/** Poster for direct videos that have no baked poster (baked media uses its own). */
	export let poster = '';
	/** Optional intrinsic size for unbaked direct videos, to reserve layout space. */
	export let width = 0;
	export let height = 0;

	let wrapperElement: HTMLDivElement | null = null;
	let videoElement: HTMLVideoElement | null = null;
	let fullImageElement: HTMLImageElement | null = null;
	let ready = false;
	let imageLoaded = false;

	$: entry = bakedMedia[src] ?? null;
	$: isDirectVideo = !entry && /\.(mp4|webm)$/i.test(src);
	$: posterSrc = entry ? base + entry.poster : poster ? base + poster : '';
	$: lqip = gradual && !entry && !isDirectVideo ? (imageLqips[src] ?? null) : null;

	let selectedLevel: BakedLevel | null = null;
	$: selectedSrc = entry
		? base + (selectedLevel?.src ?? entry.levels[entry.levels.length - 1].src)
		: base + src;
	$: reservedAspect = entry
		? `${entry.width} / ${entry.height}`
		: width > 0 && height > 0
			? `${width} / ${height}`
			: '';
	$: aspectRatio = reservedAspect ? `aspect-ratio: ${reservedAspect}; ` : '';
	$: lqipAspect = lqip ? `aspect-ratio: ${lqip.width} / ${lqip.height}; ` : '';

	// In cover mode the wrapper's height is fixed (height: 100%), so an
	// aspect-ratio would wrongly drive the intrinsic width during layout.
	$: videoWrapperStyle = cover ? style : aspectRatio + style;
	$: imageWrapperStyle = cover ? style : lqipAspect + style;

	// Pick the smallest baked level whose width covers the element's rendered
	// size (scaled by device pixel ratio), so full-screen heroes and small
	// inline videos each fetch only what they need.
	function pickLevel() {
		const el = wrapperElement;
		if (!el || !entry) return;
		const target = Math.max(1, Math.round(el.clientWidth * (window.devicePixelRatio || 1)));
		let best = entry.levels[0];
		for (const level of entry.levels) {
			if (level.width <= target) best = level;
			else break;
		}
		selectedLevel = best;
	}

	onMount(() => {
		pickLevel();

		// Cached images can finish loading before we attach the load listener.
		if (fullImageElement?.complete && fullImageElement.naturalWidth > 0) {
			imageLoaded = true;
		}

		const cleanup: (() => void)[] = [];

		if (videoElement) {
			// Only run playback while the video is actually on screen.
			if (!('IntersectionObserver' in window)) {
				void videoElement.play().catch(() => {});
			} else {
				const observer = new IntersectionObserver(
					([observation]) => {
						if (!observation) return;
						if (observation.isIntersecting) {
							void videoElement?.play().catch(() => {});
						} else {
							videoElement?.pause();
						}
					},
					{ rootMargin: '200px' }
				);
				observer.observe(videoElement);
				cleanup.push(() => observer.disconnect());
			}
		}

		if ('ResizeObserver' in window && wrapperElement) {
			const resizeObserver = new ResizeObserver(() => pickLevel());
			resizeObserver.observe(wrapperElement);
			cleanup.push(() => resizeObserver.disconnect());
		}

		return () => cleanup.forEach((fn) => fn());
	});
</script>

{#if entry || isDirectVideo}
	<div class="baked-media" class:cover bind:this={wrapperElement} style={videoWrapperStyle}>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={videoElement}
			class="baked-media-element"
			src={selectedSrc}
			muted
			loop
			playsinline
			preload={entry ? 'none' : 'metadata'}
			poster={posterSrc || null}
			style={mediaStyle || null}
			aria-label={title || 'Video'}
			on:canplay={() => (ready = true)}
			on:error={() => (ready = true)}
		>
			{#if posterSrc}
				<img src={posterSrc} alt={title} loading="lazy" />
			{/if}
		</video>
		{#if showSpinner && !ready}
			<div class="baked-media-spinner" aria-hidden="true"></div>
		{/if}
	</div>
{:else if lqip}
	<div class="baked-media-image" class:cover bind:this={wrapperElement} style={imageWrapperStyle}>
		<img class="baked-media-lqip" src={base + lqip.src} alt="" aria-hidden="true" />
		<img
			bind:this={fullImageElement}
			class="baked-media-full"
			class:loaded={imageLoaded}
			src={base + src}
			srcset={srcset || null}
			sizes={sizes || null}
			alt={title}
			loading="lazy"
			style={mediaStyle || null}
			on:load={() => (imageLoaded = true)}
		/>
	</div>
{:else}
	<img
		class="baked-media-fallback"
		class:cover
		src={base + src}
		srcset={srcset || null}
		sizes={sizes || null}
		alt={title}
		loading="lazy"
		style={mediaStyle || style || null}
	/>
{/if}

<style>
	.baked-media {
		position: relative;
		width: 100%;
		max-width: 540px;
	}

	.baked-media.cover {
		max-width: none;
		height: 100%;
	}

	.baked-media-element {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.baked-media.cover .baked-media-element {
		object-fit: cover;
	}

	.baked-media-fallback {
		width: 100%;
		max-width: 540px;
		object-fit: contain;
	}

	.baked-media-fallback.cover {
		max-width: none;
		height: 100%;
		object-fit: cover;
	}

	/* Gradual image loading: blurred placeholder under the real image */
	.baked-media-image {
		position: relative;
		width: 100%;
		max-width: 540px;
		overflow: hidden;
	}

	.baked-media-image.cover {
		max-width: none;
		height: 100%;
	}

	.baked-media-lqip {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(12px) saturate(0.9);
		transform: scale(1.05); /* hide blur fringing at the edges */
	}

	.baked-media-full {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.baked-media-image.cover .baked-media-full {
		object-fit: cover;
	}

	.baked-media-full.loaded {
		opacity: 1;
	}

	.baked-media-spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2.5rem;
		height: 2.5rem;
		margin: -1.25rem 0 0 -1.25rem;

		border: 3px solid rgba(30, 40, 48, 0.15);
		border-top-color: var(--black-theme);
		border-radius: 50%;

		animation: baked-media-spin 0.8s linear infinite;
	}

	@keyframes baked-media-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
