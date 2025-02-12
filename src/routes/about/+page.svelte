<script>
	import { base } from '$app/paths';
	import CenterBackground from '$lib/components/CenterBackground.svelte';

	let experienceItems = [
		{
			company: 'What If? Games',
			companySite: 'https://www.whatifgames.net/',
			title: '<div>Generalist Programmer</div> <div>at What If? Games</div>',
			logo: '/assets/images/logos/company/whatifgames_logo.svg',
			start: 'Sep 3 2024',
			end: 'Current',
			description:
				'Working on "<a href="https://store.steampowered.com/app/3370960/KINSHFT/" target="_blank">Kinshift</a>"'
		},
		// {
		// 	company: 'Tiny Entertainment',
		// 	companySite: '',
		// 	title: '<div>Founder & Programmer</div> <div>At Tiny Entertainment</div>',
		// 	logo: '/assets/images/logos/company/brass_token_icon.svg',
		// 	start: 'March 31 2023',
		// 	end: 'Current',
		// 	description: 'Working on two <b>unannounced projects</b>'
		// },
		{
			company: 'Brass Token',
			companySite: 'https://brasstoken.com/',
			title: '<div>Generalist Programmer</div> <div>at Brass Token</div>',
			logo: '/assets/images/logos/company/brass_token_icon.svg',
			start: 'Aug 31 2021',
			end: 'Nov 1 2023',
			description:
				'Worked on an <b>unannounced project</b>, <br> "<a class="about-me-link" href="https://store.steampowered.com/app/1577250/The_Chant/" target="_blank">The Chant</a>" & "<a href="https://store.steampowered.com/app/2190430/The_Chant__The_Gloom_Below/" target="_blank">The Gloom Below</a>"'
		},
		{
			company: 'Vancouver Film School',
			companySite: 'https://vfs.edu/programs/game-design-workshops',
			title: 'VFS Connect Instructor',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: 'July 1 2023',
			end: 'Current',
			description:
				'Created & Running "<a href="https://vfs.edu/programs/online/AI-programming" target="_blank">Unreal A.I Workshop</a>"'
		},
		{
			company: 'Vancouver Film School',
			companySite: 'https://vfs.edu/programs/game-design-workshops',
			title: 'VFS Ambassador',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: 'Feb 2022',
			end: 'Current',
			description:
				'Supporting "<a href="https://vfs.edu/programs/online/game-design-workshops" target="_blank">Intro to Unreal Workshop</a>", <br> "<a href="https://vfs.edu/programs/online/unity#adv" target="_blank">Advanced Unity Workshop</a>", & "<a href="https://vfs.edu/programs/online/game-design-certificate#lighting" target="_blank">Lighting Masterclass</a>"'
		}
	];

	let educationItems = [
		{
			educationSite: 'https://vfs.edu/programs/game-design',
			company: 'Brass Token',
			title: 'Vancouver Film School',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: '2020',
			end: '2021',
			description: 'Game Design Diploma',
			subDescription: 'Honour Roll'
		}
	];

	/**
	 * @param {string} start
	 * @param {string} end
	 */
	function calculateDuration(start, end) {
		// Parse the start date
		const startDate = new Date(start + ' 01');

		// Check if end date is 'Current' and use the current date if so
		const endDate = end.toLowerCase() === 'current' ? new Date() : new Date(end + ' 01');

		// Calculate the difference in years and months
		let years = endDate.getFullYear() - startDate.getFullYear();
		let months = endDate.getMonth() - startDate.getMonth();

		// Always round up the months if there is any difference in days
		months += 1;

		// Adjust if months exceed 12
		if (months >= 12) {
			years++;
			months -= 12;
		}

		// Adjust if months are negative (i.e., end date's month is earlier in the year than the start date's month)
		if (months < 0) {
			years--;
			months += 12;
		}

		// Format the result
		let duration = '';
		if (years > 0) {
			duration += `${years} year${years > 1 ? 's' : ''}`;
		}
		if (months > 0) {
			if (duration) duration += ' ';
			duration += `${months} month${months > 1 ? 's' : ''}`;
		}

		return duration;
	}

	/**
	 * @param {string} dateString
	 */
	function removeDateFromString(dateString) {
		// Use a regular expression to match and remove the day (the two-digit number)
		return dateString.replace(/\d{1,2} /, '');
	}
</script>

<svelte:head>
	<title>Felipe Lara - About</title>
	<meta name="description" content="Portfolio - About" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="about-header">
	<img
		src="{base + '/assets/images/headers/AboutMeHeader.jpg'}"
		alt="About Me Decorative Background"
		loading="lazy"
	/>
</div>

<div style="background-color: var(--main-bg-colour);">
	<CenterBackground />
	<div class="text-area">
		<div class="about-me-column">
			<div class="about-me-image-box">
				<img
					class="about-me-image"
					src="{base + '/assets/images/headers/self-image-2.jpg'}"
					alt="Portfolio Head Shot"
					loading="lazy"
				/>
			</div>

			<div class="category-title">
				<p>About Me</p>
			</div>

			<div class="text-block">
				<h6 style="line-height: 1.5">
					I've always wanted to make things that made people happy. Video games ended up being a
					great passion of mine which allowed me to make people smile. I'm always looking for
					opportunities in programming where I can use my skill set, grow & develop, and reach my
					best potential.
				</h6>
			</div>

			<hr />

			<div class="category-title">
				<p>Experience</p>
			</div>
			{#each experienceItems as experience}
				<div class="rowItem">
					<div class="left">
						{#if experience.companySite != ''}
							<a href={experience.companySite} target="_blank">
								<img src={base + experience.logo} alt={experience.company + ' Logo'} loading="lazy" />
							</a>
						{:else}
							<!-- svelte-ignore a11y-missing-attribute -->
							<div class="no-link">
								<img src={base + experience.logo} alt={experience.company + ' Logo'} loading="lazy" />
							</div>
						{/if}
					</div>
					<div class="right">
						<h4>{@html experience.title}</h4>
						<h6>
							{removeDateFromString(experience.start)} - {removeDateFromString(experience.end)} · {calculateDuration(
								experience.start,
								experience.end
							)}
						</h6>
						<h6 class="about-me-item">
							{@html experience.description}
						</h6>
					</div>
				</div>
			{/each}

			<hr />

			<div class="category-title">
				<p>Education</p>
			</div>
			{#each educationItems as education}
				<div class="rowItem">
					<div class="left">
						<a href={education.educationSite}>
							<img src={base + education.logo} alt={education.company + ' Logo'} loading="lazy" />
						</a>
					</div>
					<div class="right">
						<h4>{education.title}</h4>
						<h6>
							{education.start} - {education.end}
						</h6>
						{#if education.description}
							<h6>
								{@html education.description}
							</h6>
						{/if}
						{#if education.subDescription}
							<h6>
								{@html education.subDescription}
							</h6>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.category-title {
		font-size: 1.5rem;
	}

	.rowItem {
		display: flex;
		height: 8rem;

		margin-bottom: 1.75rem;
		/* background-color: aqua; */
	}

	.rowItem .left {
		width: 30%;
		display: flex;

		/* background-color: red; */
	}

	.rowItem .left a,
	.rowItem .left a img,
	.rowItem .left .no-link,
	.rowItem .left .no-link img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: 0.3s;
	}

	.rowItem .left a:hover {
		transform: scale(1.1) rotate(-6deg);
		transition: 0.3s;
	}

	.rowItem .right {
		width: 70%;
		height: 100%;

		align-content: center;
		padding-left: 1rem;

		/* background-color: yellow; */
	}

	.rowItem .right h4 {
		font-size: 1.15rem;
	}

	.text-block,
	.rowItem .right h6 {
		font-family: var(--font-text);
	}

	.about-header {
		height: 40vh;
	}

	.about-header img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-area {
		position: relative;
		z-index: 10;
		text-align: center;
		background-color: var(--main-bg-colour);

		width: 100%;
	}

	.about-me-column {
		width: 50%;
		max-width: 650px;
		margin-left: auto;
		margin-right: auto;
	}

	.text-block {
		width: 100%;
		margin-bottom: 2rem;
		/* background-color: brown; */
	}

	.about-me-image,
	.about-me-image-box {
		width: 100%;
		height: 100%;
	}

	.about-me-image {
		max-width: 50%;

		border-radius: 50%;
		border-style: solid;
		border-width: medium;
		border-color: var(--grey-theme);

		background-color: var(--grey-theme);

		filter: grayscale(1);
	}

	.about-me-image-box {
		max-width: 100%;
		padding: 0rem 2rem 2rem;
	}

	/* Use media queries to change the height based on Bootstrap breakpoints */
	@media (max-width: 575.98px) {
		/* For screens up to 575.98px wide (extra small devices) */
		.rowItem .right h4 {
			font-size: 1rem;
		}
		.rowItem .right h6,
		.text-block h6 {
			font-size: 0.8rem;
		}
		.about-me-column {
			width: 100%;
			max-width: 80%;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		/* For screens between 576px and 767.98px wide (small devices) */
		.rowItem .right h6,
		.text-block h6 {
			font-size: 0.8rem;
		}
		.about-me-column {
			width: 100%;
			max-width: 80%;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		/* For screens between 768px and 991.98px wide (medium devices) */
		.rowItem .right h6,
		.text-block h6 {
			font-size: 0.8rem;
		}
		.about-me-column {
			width: 100%;
			max-width: 60%;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		/* For screens between 992px and 1199.98px wide (large devices) */
		.rowItem .right h6,
		.text-block h6 {
			font-size: 0.9rem;
		}
	}

	@media (min-width: 1200px) {
		/* For screens 1200px and wider (extra large devices) */
		.rowItem .right h4 {
			font-size: 1.15rem;
		}
		.rowItem .right h6,
		.text-block h6 {
			font-size: 1rem;
		}
	}
</style>
