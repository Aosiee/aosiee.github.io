<script>
	export let zIndex = 10;
</script>

<div id="background-container">
	<div id="center-background" style="z-index: {zIndex};"></div>
</div>

<style>
	#background-container {
		width: 100%;
		height: 0;
		overflow-x: hidden;
	}

	#center-background {
		width: 100%;
		height: var(--section-mask-3-height);

		/* min-width: 1200px; */

		position: absolute;
		overflow-x: hidden;
		left: 0;
		right: 0;

		transform: translateY(-4rem);
		background-color: var(--main-bg-colour);

		-webkit-clip-path: url(#section-mask-3);
		clip-path: url(#section-mask-3);
	}
</style>
