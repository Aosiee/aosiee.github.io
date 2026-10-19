<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let key: string;

	// How long the pixel wipe takes, in ms (matches the original transition).
	const animationDuration = 1000;

	type BlockData = {
		openMs: number;
		closeMs: number;
	};

	// The pixel overlay persists across navigations (it lives outside {#key}),
	// so the block grid is only recalculated when the viewport changes.
	let rows: BlockData[][] = [];
	let maxCloseMs = 0;
	let state: 'idle' | 'playing' | 'closing' = 'idle';
	let whiteoutVisible = false;
	// Invalidates pending timers when the user navigates again mid-animation.
	let generation = 0;

	onMount(() => {
		calculateBlockSize();
	});

	function calculateBlockSize() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		const blockSize = Math.min(screenWidth, screenHeight) * 0.1;

		maxCloseMs = 0;

		const xCount = Math.floor(screenHeight / blockSize) + 1;
		const yCount = Math.floor(screenWidth / blockSize) + 1;
		const totalCount = xCount * yCount;

		// Same delays as the original transition: bottom-to-top easing plus a
		// small horizontal variation and a touch of randomness.
		const maxDelay = 10; // Maximum delay at the slowest point
		const delays = new Array(totalCount).fill(0).map((_, index) => {
			// Row (vertical movement) and column (horizontal variation)
			const iX = Math.floor(index / yCount);
			const iY = index % yCount;

			// Normalize indices for easing (convert to 0–1 range)
			const normalizedX = iX / (xCount - 1); // Bottom (0) to top (1)
			const normalizedY = iY / (yCount - 1); // Left (0) to right (1)

			// Apply cubic easing to the row delay (vertical movement)
			const delayFactorX = cubicInOut(normalizedX);

			// Apply a smaller easing to horizontal variation
			const delayFactorY = cubicInOut(normalizedY) * 0.3; // Small effect on Y

			// Combine both factors and scale to max delay
			const randomFactor = (Math.random() - 0.5) * 0.1; // Small random variation
			return (delayFactorX + delayFactorY + randomFactor) * maxDelay;
		});

		// Original timing: each block's delay was animationSpeed * 5 * delay,
		// with animationSpeed = animationDuration / 1000 / totalCount.
		const delayScale = (5 * animationDuration) / totalCount;

		rows = new Array(xCount).fill(0).map((_, iX) =>
			new Array(yCount).fill(0).map((_, iY) => {
				// NOTE: the original indexed delays with `iX * iY` — kept as-is
				// so the wave pattern looks exactly like it did before.
				const delay = delays[iX * iY] ?? delays[0];
				const openMs = (xCount - iX + delay) * delayScale;
				const closeMs = (iX + delay) * delayScale;
				maxCloseMs = Math.max(maxCloseMs, closeMs);
				return { openMs, closeMs };
			})
		);

		document.documentElement.style.setProperty('--block-size', `${blockSize}px`);
	}

	function startAnimation() {
		// Restart cleanly even if a previous wipe is still in flight. The
		// frame-gap toggles the class off/on so the CSS animations replay.
		generation++;
		const gen = generation;
		whiteoutVisible = false;
		state = 'idle';
		requestAnimationFrame(() => {
			if (gen !== generation) return;
			state = 'playing';
		});

		// Same timeline as the original transition.
		setTimeout(() => {
			if (gen === generation) whiteoutVisible = true;
		}, animationDuration * 0.99);

		setTimeout(() => {
			if (gen !== generation) return;
			window.scrollTo({ top: 0, behavior: 'instant' });
			setTimeout(() => {
				if (gen !== generation) return;
				whiteoutVisible = false;
				setTimeout(() => {
					if (gen !== generation) return;
					state = 'closing';
					setTimeout(() => {
						if (gen === generation) state = 'idle';
					}, maxCloseMs + 100);
				}, 100);
			}, 100);
		}, animationDuration * 1.1);
	}
</script>

<!-- Pixel overlay: persists between pages so the blocks are not recreated -->
<div
	class="pixelBackground"
	class:playing={state === 'playing'}
	class:closing={state === 'closing'}
>
	{#each rows as row}
		<div class="transition_row">
			{#each row as block}
				<div
					class="block"
					style="--open-delay: {block.openMs}ms; --close-delay: {block.closeMs}ms;"
				></div>
			{/each}
		</div>
	{/each}
</div>

{#key key}
	<!-- Trigger the pixel wipe as the new page arrives -->
	<div
		in:blur={{ duration: animationDuration / 2, delay: 350 }}
		out:blur={{ duration: animationDuration / 2 }}
		on:introstart={startAnimation}
	>
		<slot />
	</div>

	<div id="transitionWhiteout" class:visible={whiteoutVisible}></div>
{/key}

<svelte:window on:resize={calculateBlockSize} />

<style>
	:root {
		--block-size: 0px; /* This will be dynamically updated */
	}

	.pixelBackground {
		display: flex;
		flex-direction: column;

		top: 0;
		height: 100vh;
		width: 100vw;
		position: fixed;

		overflow: hidden;
		pointer-events: none;

		z-index: 99;
	}

	.pixelBackground .transition_row {
		display: flex;
		height: var(--block-size);
		width: 100%;
	}

	.pixelBackground .transition_row .block {
		width: var(--block-size);
		height: 100%;

		z-index: 99;
		position: relative;
		background-color: var(--main-bg-colour);
		opacity: 0;
	}

	/* Staggered pixel reveal: each block flips to its target opacity after its
	   delay. Duration is effectively zero, so this is one composited frame per
	   block — no per-frame JS and no animation framework. `both` keeps the
	   from-state during the delay window and the to-state after it. */
	.pixelBackground.playing .block {
		animation: pixel-in 0.001s linear both;
		animation-delay: var(--open-delay);
	}

	.pixelBackground.closing .block {
		animation: pixel-out 0.001s linear both;
		animation-delay: var(--close-delay);
	}

	@keyframes pixel-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes pixel-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	#transitionWhiteout {
		height: 100vh;
		width: 100vw;
		position: fixed;
		overflow: hidden;
		z-index: 99;
		background-color: var(--main-bg-colour);

		display: none;
	}

	#transitionWhiteout.visible {
		display: block;
	}
</style>
