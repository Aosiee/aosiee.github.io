<script>
	// @ts-nocheck
	import { page } from '$app/stores';

	console.log($page.error.message);
</script>

<div class="error">
	{#if $page.error}
		<!-- Horizontal -->
		<div class="container d-lg-block d-none" style="height: 90%">
			<div class="row h-100 text-center">
				<div class="col-7">
					<img class="error-image" src="/assets/images/headers/404.png" alt="404 Error Icon" />
				</div>
				<div class="error-message col-5">
					<h1>404</h1>
					<p>This page is either missing or under construction...</p>
					<a href="/">Return Home</a>
				</div>
			</div>
		</div>

		<!-- Vertical -->
		<div class="container h-100 d-lg-none d-block" style="">
			<div class="row h-100 text-center" style="align-content: center;">
				<div class="col-12" style="height: 50%; margin-bottom: 1rem;">
					<img class="error-image" src="/assets/images/headers/404.png" alt="404 Error Icon" />
				</div>
				<hr />
				<div class="error-message-vertical col-12">
					<h1>404</h1>
					<p>This page is either missing or under construction...</p>
					<a href="/">Return Home</a>
				</div>
			</div>
		</div>

		<div class="error-spacer"></div>
	{/if}
</div>

<style>
	.error-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.error {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.error-message {
		height: fit-content;
		align-self: center;
	}

	.error-message p,
	.error-message-vertical p {
		font-family: var(--font-text);
	}

	.error-message-vertical {
		height: 30%;
		align-self: start;
	}

	.error-message-vertical a {
		color: var(--black-theme);
	}
	.error-message-vertical a:hover {
		color: var(--highlight-theme) !important;
	}

	.error-spacer {
		background-color: black;

		position: absolute;
		bottom: 0;
		left: 0;

		height: 100px;
		width: 100%;
	}
</style>
