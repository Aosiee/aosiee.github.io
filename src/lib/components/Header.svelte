<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	function openNav() {
		const sideNav = document.getElementById('mySidenav');
		const sideNavBlocker = document.getElementById('sideBarBlocker');

		if (sideNav && sideNavBlocker) {
			sideNav.style.width = '250px';
			document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';

			sideNavBlocker.style.width = '100%';
			sideNavBlocker.style.opacity = '0.5';

			window.addEventListener('scroll', preventScroll, { passive: true });
			window.addEventListener('wheel', preventScroll, { passive: true });
			window.addEventListener('touchmove', preventScroll, { passive: true });
		} else {
			console.error('Failed To Open Side Nav!!!');
			console.error(sideNav);
			console.error(sideNavBlocker);
		}
	}

	function closeNav() {
		const sideNav = document.getElementById('mySidenav');
		const sideNavBlocker = document.getElementById('sideBarBlocker');

		if (sideNav && sideNavBlocker) {
			sideNav.style.width = '0';

			sideNavBlocker.style.width = '0';
			sideNavBlocker.style.opacity = '0';

			window.removeEventListener('scroll', preventScroll);
			window.removeEventListener('wheel', preventScroll);
			window.removeEventListener('touchmove', preventScroll);
		} else {
			console.error('Failed To Close Side Nav!!!');
			console.error(sideNav);
			console.error(sideNavBlocker);
		}
	}

	/**
	 * @param {{ preventDefault: () => void; }} event
	 */
	function preventScroll(event) {
		event.preventDefault();
	}

	let isClient = false;
	function handleResize() {
		if (isClient && window.innerWidth >= 576) {
			// Change 768 to the desired breakpoint in pixels
			closeNav();
		}
	}

	onMount(() => {
		isClient = true; // Ensure this runs only on the client
		window.addEventListener('resize', handleResize);
		handleResize(); // Optionally check size immediately on mount

		window.removeEventListener('scroll', preventScroll);
		window.removeEventListener('wheel', preventScroll);
		window.removeEventListener('touchmove', preventScroll);
	});

	onDestroy(() => {
		if (isClient) {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<header>
	<link href="/assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
	<link href="/assets/fontawesome/css/brands.css" rel="stylesheet" />

	<!-- SVG's -->
	<svg class="w-0 h-0 absolute pointer-events-none" data-v-585b909e="">
		<clipPath id="header-mask" clipPathUnits="objectBoundingBox" data-v-585b909e=""
			><path
				transform="scale(0.000532 0.0114)"
				d="M0 0v79.265l83.325 6.339 147.824-6.669 81.66 2.724 135.279 3.4 127.256.62 189.909-4.145 180.09 4.019 52.43.173 118.84-5.289 76.59 2.173 247.69-5.57 236.36 9.259 204.46-6.436V0H0Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="footer-mask" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.000525 0.003)"
				d="M1920.237 385.12V54.71l-93.22-10.33-155.04 5.49-198.27-13.62-115.92-3.69-227.96.57-220.53-12.94-132.8 3.41-80.88-6.27-255.316-.08L205.187 0 0 2.23v382.89h1920.237Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="nav-active" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.0212 0.095)"
				d="m0 1.75 1.478 7.999s16.895-.75 21.963 0c5.069.75 19.429-.25 20.908-.5 1.478-.25 1.9-8.749 1.9-8.749L0 1.75Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="btn-shape" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.0093 0.017)"
				d="M90.827 5.851s-40.2-5.078-67.581-.337c0 0-16.345-.086-17.956 11.359-2.133 11.445-.149 24.599 3.059 31.072 3.208 6.474 6.292 9.233 12.195 9.776 5.902.543 61.557.688 67.676-.358 6.119-1.045 12.025-7.464 13.017-17.064.992-9.6 7.743-30.336-10.41-34.448Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="btn-shape-long" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.00194 0.0166)"
				d="M500.83 5.851S55.303.773 24.974 5.514c0 0-18.105-.086-20.178 11.359-2.074 11.445.124 24.599 3.677 31.072 3.797 6.474 6.97 9.233 13.508 9.776 6.538.543 469.184.688 475.962-.358 6.777-1.045 13.319-7.464 14.418-17.064 1.099-9.6 7.6-30.336-11.531-34.448Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="section-mask-1" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.000521 0.0011)"
				d="M.388 893.1 0 79.427l225.876-16.326 239.402-1.054L645.013 50.07l155.653-3.679 114.302-10.215 230.002-4.415 198.13-12.347 331.18-5.674L1827.88 0 1921 1.653l-.72 891.447h.72v64.771H0v-64.77h.388Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="section-mask-2" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.000521 0.0011)"
				d="M1919.005 1022.583H0V0l235.075 2.448 227.67 17.991 246.37 3.173 86.12 6.755 126.65-1.31 208.33 13.023 226.18 3.602 317.85 18.455 151.58-1.616 93.18 9.258v950.804Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="game-card-mask" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.00204 0.0036)"
				d="m489.4 15.045-.07-6.008s-.81-6.918-8.49-6.918c-7.69 0-50.6-.345-50.6-.345s-29.66-.339-51.9.927c-22.23 1.266-43.69.701-49.16.439-5.48-.261-33.65-1.37-43.2-1.412-9.55-.041-23.59.325-33.52-.302C242.52.799 215.39.204 207.04.045c-8.35-.159-38.22.006-56.41 2.232-18.19 2.227-30.8 2.385-46.13 2.501-15.34.117-39.17-1.117-49.05-.885-9.87.232-40.08.08-45.85.212-5.77.132-7.17 3.527-7.39 5.978C2 12.534 4.43 54.19 3.32 66.148c-1.11 11.957-1.83 30.626-1.69 36.861.15 6.24-.04 26-.89 29.15-.85 3.15-.91 45.58-.49 49.91.41 4.33-.06 52.62-.06 52.62s.25 27.1 1.04 30.47c.78 3.38 1.15 8.08 6.71 8.67 5.56.59 23.98-1.64 37.82-1.58 13.83.06 35.23 1.55 47.97 1.7 12.74.15 32.58 1.72 43.98 1.5 11.39-.22 140 1.68 155.14-.39 15.14-2.07 68.29-1.48 68.29-1.48s28.19-.07 42.34 1.07c14.15 1.13 55.62 1.46 57.46 1.43 1.85-.03 20.59-.42 20.59-.42s7.17-.41 7.43-4.76c.27-4.35-2.46-19.28-2.34-25.96.11-6.68 2.2-34.86 2.51-39.64.32-4.79.27-190.254.27-190.254Z"
				data-v-585b909e=""
			></path>
		</clipPath>
		<clipPath id="contact-mask" clipPathUnits="objectBoundingBox" data-v-585b909e="">
			<path
				transform="scale(0.00052 0.00123)"
				d="M1937.73 753.883s-119.22.094-126.23-.213c-7.01-.073-109.57-.98-116.07-.8-6.5.178-64.79 4.804-71.89 4.983-5.85.18-159.75 11.408-167.27 10.615-7.53-.793-68.03.47-70.03.48-2-.495-55.03-1.033-55.03-1.033s-109.02 1.006-119 1.781c-9.98.776-77.87 6.441-92.4 5.05-14.52-.6-103.08-1.66-108.61-2.508-5.52-.37-100.417 4.27-102.416 4.325-1.999.055-119.83 8.094-136.366 6.762-16.535-1.045-177.029 1.38-186.553.643-9.524-.738-155.927 4.8-170.907 5.713-14.288.913-157.261 10.84-170.784 10.212-13.522-.628-133.642-3.318-144.638-3.014-10.995.303-49.384 4.863-54.383 5.001-4.998.138-45.154 5.166-45.154 5.166V0H1937.73v753.883Z"
				data-v-585b909e=""
			></path>
		</clipPath>
	</svg>

	<style>
		.header-background {
			position: absolute;
			width: 100%;
			height: 5rem;
			top: 0;
			left: 0;
			z-index: 0;
			background-color: var(--main-bg-colour);

			align-content: center;

			-webkit-clip-path: url(#header-mask);
			clip-path: url(#header-mask);
		}

		.header-background.mobile {
			position: fixed;
		}

		.desktop-navbar {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left 0;

			/* background-color: aqua; */
		}

		.mobile-navbar {
			width: 100%;
			z-index: 11;
			position: absolute;

			-webkit-clip-path: url(#header-mask);
			clip-path: url(#header-mask);

			background-color: aqua;
		}

		.navbar-collapse.collapse {
			transition: height 0.3s ease;
		}

		#nav-block-right {
			padding: 0;
			padding-right: 3rem;
			height: 100%;
			z-index: 100;
		}

		#nav-block-left {
			padding: 0;
			padding-left: 3rem;
			height: 100%;

			position: absolute;
		}

		#nav-block-left a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}

		#nav-block-left img {
			height: 50%;
			object-fit: contain;
			/* transition: 0.2s ease-in-out; */
			transition: 0.25s ease-out;
		}

		#nav-block-left:hover img {
			scale: 1.2;
			transition: 0.25s;
			/* transition: scale(1.2); */
		}

		.navbar-brand {
			margin-left: 1.5rem;
			height: 3rem;

			display: block;
			align-content: center;
		}

		.navbar-brand img {
			height: 2.25rem;
			object-fit: contain;
			/* transition: 0.2s ease-in-out; */
			transition: 0.25s ease-out;
		}

		.navbar-brand:hover img {
			scale: 1.2;
			transition: 0.25s;
			/* transition: scale(1.2); */
		}

		.navbar {
			padding-top: 1rem;
			height: 4rem;

			position: fixed;
    		top: 0;
    		right: 0;
    		left: 0;
    		z-index: 1;
		}
	</style>

	<style>
		body {
			transition: background-color 0.4s;
		}

		.sidenav {
			height: 100%;
			width: 0;
			position: fixed;
			z-index: 1;
			top: 0;
			right: 0;
			background-color: #111;
			overflow-x: hidden;
			transition: 0.4s;
		}

		.sidenav a {
			padding: 8px 8px 8px 32px;
			text-decoration: none;
			font-size: 25px;
			color: #9e9e9e;
			display: block;
			transition: 0.3s;
		}

		.sidenav a:hover {
			color: #f1f1f1;
		}

		.sidenav .closebtn {
			position: relative;
			/* top: 0; */
			/* right: 25px; */
			/* font-size: 36px;
			margin-right: 50px; */

			align-content: center;
			font-size: 35px;

			width: 100%;
			height: 100%;

			color: white;
		}

		.sidenav .nav-button {
			width: 5rem;
			height: 5rem;

			display: block;
			background-color: #111 !important;

			padding: 0;
		}

		.nav-button {
			width: 3rem;
			height: 3rem;
			border: none;
			background-color: var(--main-bg-colour);
		}

		.mobile-nav-link {
			height: auto !important;
			display: block;
		}

		.mobile-nav-link[aria-current='page'] a {
			color: white;
		}

		@media screen and (max-height: 450px) {
			.sidenav {
				padding-top: 15px;
			}
			.sidenav a {
				font-size: 18px;
			}
		}

		#sideBarBlocker {
			position: fixed;
			height: 100%;
			z-index: 1;

			background-color: black;
			border: none;

			top: 0;
			right: 0;
			width: 0;

			opacity: 0;
			transition: opacity 0.3s;

			box-sizing: content-box;
			cursor: default !important;
		}
	</style>

	<!-- Mobile Navbar -->
	<div class="header-background mobile d-sm-none">
		<div class="row">
			<div class="col">
				<a class="navbar-brand" href="{base}/">
					<img src="/assets/images/logos/logo-black-2.svg" alt="Home" />
				</a>
			</div>
			<div class="col" style="text-align: right; margin-right: 1rem;">
				<button class="nav-button" on:click={openNav} type="button">
					<span style="font-size:30px;cursor:pointer">&#9776;</span>
				</button>
			</div>
		</div>
	</div>

	<button
		tabindex="-1"
		aria-label="Close Navigation Menu"
		type="button"
		id="sideBarBlocker"
		on:click={closeNav}
	></button>

	<div id="mySidenav" class="sidenav">
		<button class="nav-button" on:click={closeNav}>
			<div class="closebtn">&times;</div>
		</button>

		<hr />

		<ul style="display: inline;">
			<li aria-current={$page.url.pathname === ({base}+'/') ? 'page' : undefined} class="mobile-nav-link">
				<a href="{base}/" data-sveltekit-noscroll>Home</a>
			</li>
			<li
				aria-current={$page.url.pathname === ({base}+'/about') ? 'page' : undefined}
				class="mobile-nav-link"
			>
				<a href="{base}/about" data-sveltekit-noscroll>About</a>
			</li>
			<li
				aria-current={$page.url.pathname === ({base}+'/projects') ? 'page' : undefined}
				class="mobile-nav-link"
			>
				<a href="{base}/projects" data-sveltekit-noscroll>Projects</a>
			</li>
		</ul>

		<hr />
	</div>

	<div class="header-background d-none d-sm-block">
		<div class="desktop-navbar">
			<div id="nav-block-left">
				<a href="/">
					<img src="/assets/images/logos/logo-black-2.svg" alt="Home" />
				</a>
			</div>

			<nav id="nav-block-right">
				<ul id="page-nav">
					<li aria-current={$page.url.pathname === ({base}+'/') ? 'page' : undefined}>
						<a href="{base}/">Home</a>
					</li>
					<li aria-current={$page.url.pathname === ({base}+'/about') ? 'page' : undefined}>
						<a href="{base}/about">About</a>
					</li>
					<li aria-current={$page.url.pathname === ({base}+'/projects') ? 'page' : undefined}>
						<a href="{base}/projects">Projects</a>
					</li>
				</ul>

				<div style="padding: 0 20px; user-select: none; align-content: center;">
					<h1 style="margin: 0; transform: scale(0.25, 0.5)">|</h1>
				</div>

				<ul id="media-links">
					<li>
						<a
							href="https://www.linkedin.com/in/luis-felipe-lara/"
							target="_blank"
							rel="noreferer, noopener"
							class="social-account text-2xl text-primary hover:text-secondary"
							><span class="account-icon"><i class="fab fa-linkedin" aria-hidden="true"></i></span>
							<span class="sr-only">LinkedIn</span></a
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;

		position: absolute;
		right: 0;
		z-index: 100;
		width: 100vw;
	}

	nav {
		display: flex;
		justify-content: right;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	#page-nav {
		gap: 0.5rem;
	}

	/* Nav CSS Setup */
	#page-nav li::before {
		content: '';
		clip-path: url(#nav-active);
		position: absolute;
		left: 0;
		top: -1rem;
		display: block;
		height: 0.75rem;
		width: 100%;
		transform-origin: top;

		background-color: var(--black-theme);
		transition-duration: 0.1s;
		will-change: transform;
	}

	/* Active Page Selector */
	#page-nav li[aria-current='page']::before {
		top: -0.25rem;
	}

	/* Active Page Text */
	#page-nav li[aria-current='page'] a {
		color: var(--black-theme);
		transition-duration: 0.15s;
	}

	/* Hovered Page Selector */
	#page-nav li:hover::before {
		top: -0.25rem;
	}

	#media-links a {
		/* color: rgba(34, 157, 248, 1) !important; */
		color: var(--secondary-theme) !important;
	}

	#media-links a:hover {
		color: var(--black-theme) !important;
		transform: scale(1.25) rotate(6deg);
		transition: 0.2s;
	}

	nav a {
		color: var(--grey-theme);
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		/* font-weight: 300; */
		font-weight: normal;
		font-size: 1.25rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
