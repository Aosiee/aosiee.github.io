<script lang="ts">
	import { base } from '$app/paths';
	import type { WorkProject } from '$lib/data/about';

	export let logo: string;
	export let logoStyle = '';
	export let rotateLogo = '';
	export let company: string;
	export let site = '';
	export let title = '';
	export let sub = '';
	export let location = '';
	export let start = '';
	export let end = '';
	export let projects: WorkProject[] | null = null;
	export let description = '';
	export let list: string[] = [];
	export let desktopAnchorStyle = '';
	export let desktopTarget = '_blank';

	function removeDateFromString(dateString: string) {
		// Use a regular expression to match and remove the day (the two-digit number)
		return dateString.replace(/\d{1,2} /, '');
	}

	// The teaching/education logos are rotated on mobile, but not on desktop
	const rotateDeg = -(parseInt(rotateLogo, 10) || 0) * 90;
	const mobileLogoStyle =
		rotateDeg !== 0 ? `transform: rotate(${rotateDeg}deg);` + logoStyle : logoStyle;
</script>

<div class="rowItem">
	<!-- Mobile -->
	<div class="d-sm-none d-block w-100" style="height: fit-content">
		<div class="w-100" style="height: 100px; place-items: center">
			{#if site !== ''}
				<a style="width: fit-content;" class="d-flex h-100" href={site} target="_blank">
					<img style={mobileLogoStyle} src={base + logo} alt={company + ' Logo'} loading="lazy" />
				</a>
			{:else}
				<!-- svelte-ignore a11y-missing-attribute -->
				<div class="no-link">
					<img style={mobileLogoStyle} src={base + logo} alt={company + ' Logo'} loading="lazy" />
				</div>
			{/if}
		</div>

		<br />

		<div class="bottom">
			<div class="no-margin">
				<h3 class="text-uppercase">{@html title}</h3>
				<h6 style="display: flex;">
					{#if site !== ''}
						<a class="sub-link" href={site} target="_blank">{@html sub}</a>
					{:else}
						{@html sub}
					{/if}
					<div style="margin: 0rem 0.5rem;">|</div>
					{@html location}
				</h6>
				<h6>
					{removeDateFromString(start)} - {removeDateFromString(end)}
				</h6>
			</div>
			{#if projects}
				{#each projects as project}
					<p class="about-me-item">
						{@html project.desc}
					</p>
					<ul>
						{#each project.list as listItem}
							<li class="about-me-item">{@html listItem}</li>
						{/each}
					</ul>
				{/each}
			{:else}
				<p class="about-me-item no-margin">
					{@html description}
				</p>
				<ul>
					{#each list as listItem}
						<li class="about-me-item">{@html listItem}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<!-- Desktop -->
	<div class="d-sm-flex d-none">
		<div class="left">
			{#if site !== ''}
				<a style={desktopAnchorStyle || null} href={site} target={desktopTarget || null}>
					<img style={logoStyle} src={base + logo} alt={company + ' Logo'} loading="lazy" />
				</a>
			{:else}
				<!-- svelte-ignore a11y-missing-attribute -->
				<div class="no-link">
					<img style={logoStyle} src={base + logo} alt={company + ' Logo'} loading="lazy" />
				</div>
			{/if}
		</div>
		<div class="right">
			<div class="no-margin">
				<h3 class="text-uppercase">{@html title}</h3>
				<h6 style="display: flex;">
					{#if site !== ''}
						<a class="sub-link" href={site} target={desktopTarget || null}>{@html sub}</a>
					{:else}
						{@html sub}
					{/if}
					<div style="margin: 0rem 0.5rem;">|</div>
					{@html location}
				</h6>
				<h6>
					{removeDateFromString(start)} - {removeDateFromString(end)}
				</h6>
			</div>
			{#if projects}
				{#each projects as project}
					<p class="about-me-item no-margin">
						{@html project.desc}
					</p>
					<ul>
						{#each project.list as listItem}
							<li class="about-me-item">{@html listItem}</li>
						{/each}
					</ul>
				{/each}
			{:else}
				<p class="about-me-item no-margin">
					{@html description}
				</p>
				<ul>
					{#each list as listItem}
						<li class="about-me-item">{@html listItem}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<style>
	.rowItem {
		display: flex;
		height: fit-content;

		margin-bottom: 1.75rem;
	}

	.rowItem .left {
		display: flex;

		width: 97.5px;
		height: 97.5px;
	}

	.rowItem .left a,
	.rowItem .left a img,
	.rowItem .left .no-link,
	.rowItem .left .no-link img {
		height: 100%;
		width: 85px;
		object-fit: contain;
		transition: 0.3s;
	}

	.rowItem .left a:hover {
		transform: scale(1.1) rotate(-6deg);
		transition: 0.3s;
	}

	.rowItem .right {
		width: 100%;
		height: 100%;

		overflow: hidden;
		align-content: center;
		padding-left: 1rem;

		text-align: left;
	}

	.rowItem .bottom {
		width: 100%;
		height: 100%;

		align-content: center;
		padding-left: 1rem;

		text-align: left;
	}

	.rowItem p,
	.rowItem ul * {
		font-family: var(--font-text);
		font-weight: 470;
	}

	/* Company "at X" link: match the surrounding h6 text colour, not the link colour */
	.sub-link {
		color: var(--grey-theme);
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.8rem;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.rowItem .right h3 {
			font-size: 1.15rem;
		}
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.8rem;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		/* For screens between 768px and 991.98px wide (medium devices) */
		.rowItem .right h3 {
			font-size: 1.25rem;
		}
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.95rem;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		/* For screens between 992px and 1199.98px wide (large devices) */
		.rowItem .right h3 {
			font-size: 1.25rem;
		}
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.9rem;
		}
	}

	@media (min-width: 1200px) {
		/* For screens 1200px and wider (extra large devices) */
		.rowItem .right h3 {
			font-size: 1.35rem;
		}
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.9rem;
		}
	}
</style>
