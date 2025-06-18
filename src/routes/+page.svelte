<script>
	import Hero_Carousel from '$lib/components/Hero-Carousel.svelte';
	import CenterBackground from '$lib/components/CenterBackground.svelte';
	import Hero_Grid from '$lib/components/HeroGrid.svelte';
</script>

<svelte:head>
	<title>Felipe Lara - Home</title>
	<meta name="description" content="Portfolio - Home" />
</svelte:head>

<svg class="svg-container">
	<clipPath id="section-mask-2" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.000521 0.0011)"
			d="M1919.005 1022.583H0V0l235.075 2.448 227.67 17.991 246.37 3.173 86.12 6.755 126.65-1.31 208.33 13.023 226.18 3.602 317.85 18.455 151.58-1.616 93.18 9.258v950.804Z"
		></path>
	</clipPath>
	<clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"
		><path d="M1,1 V0.077 L0.948,0 l-0.181,0.076,-0.15,-0.058,-0.224,0.072 L0.162,0,0,0.027 V1 h1"
		></path></clipPath
	>
	<clipPath id="section-mask-3" clipPathUnits="objectBoundingBox">
		<path
			d="M365.843 56.4V4.32L346.673 0l-66.3 4.28-54.81-3.25-81.817 4.08L59.229 0 0 1.53V56.4h365.843Z"
		></path>
	</clipPath>
	<clipPath id="contact-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00052 0.00123)"
			d="M1937.73 753.883s-119.22.094-126.23-.213c-7.01-.073-109.57-.98-116.07-.8-6.5.178-64.79 4.804-71.89 4.983-5.85.18-159.75 11.408-167.27 10.615-7.53-.793-68.03.47-70.03.48-2-.495-55.03-1.033-55.03-1.033s-109.02 1.006-119 1.781c-9.98.776-77.87 6.441-92.4 5.05-14.52-.6-103.08-1.66-108.61-2.508-5.52-.37-100.417 4.27-102.416 4.325-1.999.055-119.83 8.094-136.366 6.762-16.535-1.045-177.029 1.38-186.553.643-9.524-.738-155.927 4.8-170.907 5.713-14.288.913-157.261 10.84-170.784 10.212-13.522-.628-133.642-3.318-144.638-3.014-10.995.303-49.384 4.863-54.383 5.001-4.998.138-45.154 5.166-45.154 5.166V0H1937.73v753.883Z"
		></path>
	</clipPath>

	<clipPath id="header-logo-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.002 0.0028)"
			d="m28.661 350.128 107.731-83.78 30.592-23.327 63.973-35.965 91.779-76.062 84.201-48.447 34.545-36.148L502.83.732.215 81.155l28.446 268.973Z"
		></path>
	</clipPath>
	<clipPath id="slide-content-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00095 0.0057)"
			d="m1056.638925.00056493-86.8414152 8.4693051L829.927125 3.84494931l-72.9742101 5.17226778-158.2718259.43507074-66.718044-6.6070296-205.50830901 5.22624678-94.78388526-4.42411884-57.38615448.95650788-73.93449651-2.38479222L40.0794075 5.59063017 0 .98838063v174.36512496h1056.638925V.00056493Z"
		></path>
	</clipPath>
	<clipPath id="slide-thumb-mask-odd" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.0017 0.00276)"
			d="m583.138 367.014 4.297-183.345-5.729-177.617-243.507 1.433L110.45.323.156 16.079 3.021 250.99.156 358.42l385.313 1.433 197.669 7.161Z"
		></path>
	</clipPath>
	<clipPath id="slide-thumb-mask-even" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00625 0.01)"
			d="M1.854.13.695 49.59l1.546 47.914 65.688-.386 61.438 1.931 29.753-4.25-.773-63.37.773-28.98-103.942-.386L1.854.13Z"
		></path>
	</clipPath>
	<clipPath id="slider-btn-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.013 0.013)"
			d="m4.627 76.737 43.955-2.313 25.448 3.469 3.47-63.616L74.03.397H5.783L0 47.82l4.627 28.917Z"
		></path>
	</clipPath>
	<clipPath id="card-mask-1" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00198 0.0035)"
			d="m502.58 0-.1 158.46 3.52 79.87-6.94 19.44 4.15 7.6-11.67 14.61-219.85-.88-15.28 3.68-189.25-2.47-5.78 5.69-25.5-5.74L0 286V89.46l5.43-23.95L0 51.26l11.3-39.93 170.26-3.49 52.84-4.92 191.84 3.35L502.58 0Z"
		></path>
	</clipPath>
	<clipPath id="hero-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00125 0.00201)"
			d="M0 0h799.979v483.97l-92.86 12.76-122.701-11.12-121.322 11.12-236.778-11.21-79.894 11.21-60.945-9-56.676 9L0 487.49V0Z"
		></path>
	</clipPath>
	<clipPath id="feature-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00067 0.00155)"
			d="M1526.076 630.62 1518.866 0h-157.51l-251.3 16.88L763.036 0H0v645.07l95.027-9.11 441.543 9.11 249.336-13.23 268.5 4.34 471.67-5.56Z"
		></path>
	</clipPath>
	<clipPath id="feature-image-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.0013 0.00156)"
			d="M10.888.01 0 164.66l21.637 264.61-6.008 131.89 6.363 36.64-.671 38.36h765.56V.01H10.888Z"
		></path>
	</clipPath>
	<clipPath id="dot-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.07 0.07)"
			d="M2.491 2.444 7.595.669 13.587 2l.222 8.433-8.211 3.995L.272 8.88l2.219-6.436Z"
		></path>
	</clipPath>
	<clipPath id="footer-bg-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.000525 0.003)"
			d="M1920.237 385.12V54.71L1827.017 44.38l-327.6 11.69-270.35-19.37-404.14 20.58L279.75 0 0 15.45V385.12H1920.237Z"
		/>
	</clipPath>
	<clipPath id="community-bg-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00275 0.006)"
			d="M365.843 169.42V4.32L346.673 0l-66.3 4.28-54.81-3.25-81.817 4.08L59.229 0 0 1.53v167.89h365.843Z"
		></path>
	</clipPath>
	<clipPath id="play-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.012 0.018)"
			d="m8.327 6.826 17.134-4.635L54.529.687l19.734 4.604 8.833 22.961-8.927 22.709-21.143 3.352-30.071-1.003-14.784-4.103L.904 28.252 8.327 6.826Z"
		></path>
	</clipPath>
	<clipPath id="separator-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00088 0.08)"
			d="M0 11.95h42.367L179.23 8.24h55.792l103.682 3.71h100.704l118.343-3.71 175.317-3.71 115.721 3.71 189.2 3.71 94.48-3.71V4.53l-94.93 3.71-188.78-3.71L733.201 0l-175.72 4.53-117.945 3.71H337.822L235.071 4.53h-55.747L42.591 8.24H0v3.71Z"
		></path>
	</clipPath>
	<clipPath id="separator-mask-2" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00088 0.08)"
			d="M.802 4.183c24.891-.683 49.767-.308 74.643.07l74.628 1.069 74.628 1.07 18.625.249 18.656-.332 37.312-.664 149.248-2.654 18.656-.332 9.328-.166c3.193.007 6.241.131 9.369.19l37.308.895 74.614 1.79 74.614 1.79 4.664.112 2.331.056c.672.021 1.525-.033 2.278-.045l9.326-.264 18.652-.529 37.303-1.058 74.606-2.083 18.653-.517 9.326-.259c.794-.013 1.515-.062 2.369-.045l2.332.026 4.664.053 37.315.42 149.263 1.681 37.316.421 18.658.21 9.329.105 1.109.01 1.164-.068 2.328-.135 4.658-.271 74.509-4.334.037-.002.037.001 167.227 6.414 10.451.401 5.226.2c1.693.078 3.473.024 5.205.042l20.918.013 41.838.024c27.892.078 55.783-.189 83.675.557v.111c-27.892.745-55.783.478-83.675.556l-41.838.025-20.918.013c-1.754-.017-3.463.041-5.254-.037l-5.225-.194-10.453-.388-167.234-6.213.073-.001-74.505 4.423-4.656.277-2.328.138-1.165.069-1.222-.006-9.329-.094-18.658-.188-37.316-.376-149.264-1.502-37.316-.376-4.665-.047-2.333-.023c-.701-.018-1.533.034-2.292.047l-9.327.27-18.651.539-74.605 2.144-37.303 1.056-18.651.527-9.326.264c-.801.013-1.501.066-2.385.045l-2.331-.056-4.664-.112-74.614-1.793-74.614-1.793-37.307-.897c-3.091-.06-6.26-.183-9.285-.191l-9.328.166-18.656.331-149.249 2.648-37.312.662-18.655.331-18.69-.25-74.628-1.073-74.628-1.072C50.539 5.918 25.663 5.579.802 4.183Z"
		></path>
	</clipPath>
	<clipPath id="square-block-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00203 0.00224)"
			d="M6.021 6.139 179.454.653l187.509 5.074 121.014-.274-3.721 256.324 7.119 130.562-8.413 51.773-255.62.891-176.669-9.874-44.652 1.097L.844 206.919 6.021 6.139Z"
		></path>
	</clipPath>
	<clipPath id="btn-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00333 0.0185)"
			d="m7.338 52.722 60.07-.024 136.344.609 96.678-1.006-3.35-19.445 1.365-29.03L128.128.912l-73.272 1L3.366.854.939 15.841l5.469 12.032.93 24.849Z"
		></path>
	</clipPath>
	<clipPath id="hero-bg" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00052 0.007)"
			d="M.18815647 163.7094646.0001569 8.52281994l414.59905067 10.78097531 401.99907952-16.5559621 57.17786908.41399906 177.63159326-1.5299965 190.30956424-1.64099624 372.8791462 21.18795149 315.80927687-12.1879721V163.7094646H.18815647Z"
		></path>
	</clipPath>
	<clipPath id="dlc-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.00091 0.00095)"
			d="m1080.00018263-.00758689 8.12998139 86.36380225-24.59994367 113.12474097v66.36584804l3.59999175 46.75789294 17.99995879 96.53377896-11.09997459 196.08255102 17.09996085 147.81666153-9.59997802 111.61674443 9.59997802 104.0737617-2.99999313 116.75073266H.00265556V-.00758689h1079.99752707Z"
		></path>
	</clipPath>
	<clipPath id="contact-block-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.002758 0.00329)"
			d="m357.367 9.286-79.714-5.033L117.978.798 4.756 6.501l-2.319 110.27L.839 296.904l205.704 1.014 82.78 4.718 72.695-4.391-.278-84.989-3.284-68.23-1.089-135.74Z"
		></path>
	</clipPath>
	<clipPath id="circular-mask" clipPathUnits="objectBoundingBox">
		<path
			transform="scale(0.0063 0.005)"
			d="M14.1 28.1 64.1 0l52 5.1 33 35 13 36-8 48-29 27-56 16-53-27L0 88.1l14.1-60Z"
		></path>
	</clipPath>
</svg>

<section style="justify-content: flex-start;">
	<Hero_Carousel />
	<CenterBackground zIndex={1} />

	<Hero_Grid showSelector={false} showPlatforms={true} separateCategories={true} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;

		background-color: var(--main-bg-colour);
	}

	.svg-container {
		pointer-events: none;
		height: 0;
		width: 0;
		overflow: hidden;
	}
</style>
