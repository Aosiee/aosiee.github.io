<script lang="ts">
	import { blur } from 'svelte/transition';
	import { Motion } from 'svelte-motion';

	export let key: string;

	let playAnimation = false;
	const loggingEnabled = false;

	let xCount = Array();
	let yCount = Array();
	let totalCount = 0;

	let delays = Array();
	let animationSpeed = 0.01;
	let animationDuration = 1000;

	function shuffleArray(array: number[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	// Function to set the CSS variable dynamically
	function setBlockSize(blockSize: number) {
		document.documentElement.style.setProperty('--block-size', `${blockSize}px`);
	}

	function calculateBlockSize() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		const blockSize = Math.min(screenWidth, screenHeight) * 0.1;

		xCount = Array(Math.floor(screenHeight / blockSize) + 1);
		yCount = Array(Math.floor(screenWidth / blockSize) + 1);

		totalCount = xCount.length * yCount.length;
		animationSpeed = animationDuration / 1000 / totalCount;

		if (loggingEnabled) {
			console.log('AnimationSpeed: ' + animationSpeed);

			console.log('Screen Width: ' + screenWidth + ', Block Size: ' + blockSize);
			console.log('Screen Height: ' + screenHeight + ', Block Size: ' + blockSize);
			console.log('Total Blocks: ' + totalCount);

			console.log(
				'Total Count: ' + totalCount + ' yCount: ' + yCount.length + ' xCount: ' + xCount.length
			);
		}

		delays = [...Array(totalCount)].map(() => Math.random()); // Random delay between 0 and 1 seconds
		shuffleArray(delays);

		if (blockSize > 0) {
			setBlockSize(blockSize);
		} else {
			console.warn('Failed To setBlockSize, as Block Size was > 0');
		}
	}

	// Call function on component mount and window resize
	if (typeof window !== 'undefined') {
		calculateBlockSize();
		window.addEventListener('resize', calculateBlockSize);
	}

	const anim = {
		initial: {
			opacity: 0,
			transition: { duration: 0 }
		},
		open: (custom: number[] | undefined) => {
			// Provide a default value if custom is undefined
			const [delay = 0] = custom || [];
			return {
				opacity: 1,
				transition: {
					duration: 0,
					delay: animationSpeed * 5 * delay
				}
			};
		},
		closed: (custom: number[] | undefined) => {
			const [, delay = 0] = custom || [];
			return {
				opacity: 0,
				transition: {
					duration: 0,
					delay: animationSpeed * 5 * delay
				}
			};
		}
	};

	// Event handlers to control animation state
	function startAnimation() {
		setTimeout(() => {
			console.log('Scrolled');
			window.scrollTo({ top: 0, behavior: 'instant' });
		}, animationDuration);
		playAnimation = true;
	}

	function endAnimation() {
		playAnimation = false;
	}
</script>

{#key key}
	<div class="pixelBackground">
		{#each xCount as x, iX}
			<div class="transition_row">
				{#each yCount as y, iY}
					<Motion
						variants={anim}
						initial="initial"
						animate={playAnimation ? 'open' : 'closed'}
						custom={[xCount.length - iX + delays[iX * iY], iX + delays[iX * iY]]}
						let:motion
					>
						<div class="block" use:motion />
					</Motion>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Trigger animation on intro start/end immediately -->\
	<div
		in:blur={{ duration: animationDuration / 2, delay: 350 }}
		out:blur={{ duration: animationDuration / 2 }}
		on:introstart={() => {
			startAnimation();
		}}
		on:introend={() => {
			endAnimation();
		}}
	>
		<slot />
	</div>
{/key}

<!-- <svelte:window on:resize={() => location.reload()} /> -->

<style>
	:root {
		--block-size: 0px; /* This will be dynamically updated */
	}

	.pixelBackground {
		display: flex;
		flex-direction: column;

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
	}
</style>
