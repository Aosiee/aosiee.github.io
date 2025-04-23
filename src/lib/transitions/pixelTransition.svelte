<script lang="ts">
	import { blur } from 'svelte/transition';
	import { Motion } from 'svelte-motion';

	import { cubicInOut, cubicIn, cubicOut } from 'svelte/easing';

	export let key: string;

	let playAnimation = false;
	let whiteout = false;
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

	function showWhiteout(show: boolean) {
		const whiteOut = document.getElementById('transitionWhiteout');
		if (whiteOut) {
			if (show) {
				whiteOut.style.display = 'block';
			} else {
				whiteOut.style.display = 'none';
			}
			return;
		}
		console.error('Failed To Find Whiteout For Show/Hide!');
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

		// delays = [...Array(totalCount)].map(() => Math.random()); // Random delay between 0 and 1 seconds
		// shuffleArray(delays);

		const maxDelay = 10; // Maximum delay at the slowest point

		// Generate delays with easing (bottom to top)
		delays = new Array(totalCount).fill(0).map((_, index) => {
			// Calculate row and column index
			const iX = Math.floor(index / yCount.length); // Row (vertical movement)
			const iY = index % yCount.length; // Column (horizontal variation)

			// Normalize indices for easing (convert to 0–1 range)
			const normalizedX = iX / (xCount.length - 1); // Bottom (0) to top (1)
			const normalizedY = iY / (yCount.length - 1); // Left (0) to right (1)

			// Apply cubic easing to the row delay (vertical movement)
			const delayFactorX = cubicInOut(normalizedX);

			// Apply a smaller easing to horizontal variation
			const delayFactorY = cubicInOut(normalizedY) * 0.3; // Small effect on Y

			// Combine both factors and scale to max delay
			const randomFactor = (Math.random() - 0.5) * 0.1; // Small random variation
			return (delayFactorX + delayFactorY + randomFactor) * maxDelay;
		});

		console.log(delays);

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
			showWhiteout(true);
		}, animationDuration * 0.99);

		setTimeout(() => {
			console.debug('Pixel Transition, Scrolled To Top');
			window.scrollTo({ top: 0, behavior: 'instant' });

			setTimeout(() => {
				showWhiteout(false);
				setTimeout(() => {
					playAnimation = false;
				}, 100);
			}, 100);
		}, animationDuration * 1.1);
		playAnimation = true;
	}

	// function startAnimation() {
	// 	setTimeout(() => {
	// 		console.debug('Pixel Transition, Scrolled To Top');
	// 		window.scrollTo({ top: 0, behavior: 'instant' });
	// 		playAnimation = false;
	// 	}, animationDuration * 1);
	// 	playAnimation = true;
	// }

	function endAnimation() {
		// playAnimation = false;
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

	<div id="transitionWhiteout" style="var(--main-bg-colour)"></div>
{/key}

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

	#transitionWhiteout {
		height: 100vh;
		width: 100vw;
		position: fixed;
		overflow: hidden;
		z-index: 99;
		background-color: var(--main-bg-colour);

		display: none;
	}
</style>
