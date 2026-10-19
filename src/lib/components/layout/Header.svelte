<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	function openNav() {
		const sideNav = document.getElementById('mobileNav');
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
		const sideNav = document.getElementById('mobileNav');
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

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' }
	];
</script>

<header>
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

			/* -webkit-clip-path: url(#header-mask);
			clip-path: url(#header-mask); */

			/* background-color: red; */
			-webkit-clip-path: url(#section-mask-3);
			clip-path: url(#section-mask-3);

			transform: rotate(180deg);
		}

		.header-background div {
			transform: rotate(180deg);
		}

		.header-background div .col {
			transform: rotate(0deg);
		}

		.header-background.mobile {
			transform: rotate(180deg);
			position: fixed;
		}

		.desktop-navbar {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;

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

			transform: rotate(0deg);
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
			padding-bottom: 0.5rem;
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

	<div id="top"></div>

	<!-- Mobile Navbar -->
	<div class="header-background mobile d-sm-none">
		<div class="row">
			<div class="col">
				<a class="navbar-brand" href="{base}/">
					<img src={base + '/favicon.svg'} alt="Home" />
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

	<div id="mobileNav" class="sidenav">
		<button class="nav-button" on:click={closeNav}>
			<div class="closebtn">&times;</div>
		</button>

		<hr />

		<ul style="display: inline;">
			{#each navLinks as link}
				<li
					aria-current={$page.url.pathname === base + link.href ? 'page' : undefined}
					class="mobile-nav-link"
				>
					<a href={base + link.href} data-sveltekit-noscroll>{link.label}</a>
				</li>
			{/each}
		</ul>

		<hr />
	</div>

	<div class="header-background d-none d-sm-block">
		<div class="desktop-navbar">
			<div id="nav-block-left">
				<a href="{base}/">
					<img src={base + '/favicon.svg'} alt="Home" />
				</a>
			</div>

			<nav id="nav-block-right">
				<ul id="page-nav">
					{#each navLinks as link}
						<li aria-current={$page.url.pathname === base + link.href ? 'page' : undefined}>
							<a href={base + link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>

				<div style="padding: 0 20px; user-select: none; align-content: center;">
					<h1 style="margin: 0; transform: scale(0.25, 0.5)">|</h1>
				</div>

				<ul id="media-links">
					<li>
						<a
							href="https://www.linkedin.com/in/luis-felipe-lara/"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="LinkedIn"
							class="social-account text-2xl text-primary hover:text-secondary"
							><span class="account-icon"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									style="width: 1em; height: 1em;"
									fill="currentColor"
									aria-hidden="true"
								>
									<!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. -->
									<path
										d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
									/></svg
								></span
							>
						</a>
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
		top: 0;
		z-index: 100;
		width: 100vw;
	}

	nav {
		display: flex;
		justify-content: right;
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

	#mobileNav li a {
		font-size: 2.5rem;
	}

	#mobileNav .closebtn {
		font-size: 3.5rem;
	}
</style>
