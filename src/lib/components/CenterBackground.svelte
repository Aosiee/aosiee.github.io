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
	}

	#center-background {
		width: 100%;
		height: 40%;

		position: absolute;
		overflow-x: hidden;
		left: 0;
		right: 0;

		transform: translateY(-4rem);

		background-color: var(--main-bg-colour);
		/* background-image: url(/assets/images/gifs/cityscape.gif); */
		/* background-color: aqua; */

		/* width: 100%;
		height: 50px;
		border: 1px black;	
		background-color: var(--main-bg-colour);
		transform: scale(1, 7.5) translate(0, 15px);
		z-index: 5; */

		-webkit-clip-path: url(#section-mask-1);
		clip-path: url(#section-mask-1);
	}
</style>
