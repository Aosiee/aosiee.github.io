<script lang="ts">
	import { base } from '$app/paths';

	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="footer-background">
		<div class="footer-logo">
			<a href="#top">
				<img src="{base + '/assets/images/logos/logo-white-2.svg'}" alt="Back To Top" />
			</a>
		</div>
		<p>© 2019 - {currentYear} All Rights Reserved • Felipe Lara</p>
	</div>
</footer>

<style>
	.footer-background {
		background-color: black;

		align-content: center;
		text-align: center;

		width: 100%;
		height: fit-content;

		-webkit-clip-path: url(#footer-mask);
		clip-path: url(#footer-mask);
	}

	.footer-background p {
		color: white;
		transition: 1s;
	}

	.footer-logo {
		height: 2rem;
		width: 100%;

		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.footer-logo a {
		width: fit-content;
	}

	.footer-logo a img {
		height: 100%;
		object-fit: contain;
		transition: 0.2s;
	}

	.footer-logo a img:hover {
		transform: scale(1.25);
		transition: 0.2s;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
		padding-top: 2rem;

		z-index: 100;

		background-color: var(--main-bg-colour);
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 399.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.footer-background {
			font-size: 10px;
		}
	}

	@media (min-width: 400px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.footer-background {
			font-size: 15px;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.footer-background {
			font-size: 1rem;
		}
	}
</style>
