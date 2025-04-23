<script>
	import { base } from '$app/paths';
	import CenterBackground from '$lib/components/CenterBackground.svelte';

	let gameExperienceItems = [
		{
			company: 'What If? Games',
			companySite: 'https://www.whatifgames.net/',
			title: '<div>Generalist Programmer</div>',
			sub: 'at What If? Games',
			location: 'North Vancouver, Canada',
			logo: '/assets/images/logos/company/whatifgames_logo.svg',
			start: 'Sep 3 2024',
			end: 'Present',
			projects: [
				{
					desc: 'Working on "<a class="font-bolder" href="https://store.steampowered.com/app/3370960/KINSHFT/" target="_blank">Kinshift</a>"',
					list: [
						'Created Core Gameplay Systems',
						'Developed Near-Isometric ARPG Combat System',
						'Created Inventory System & Equipment System',
						'Developed Scalable & Modular Stat / Modifier System',
						'Created Scriptable Task Based A.I Framework / System For Designers',
						'Created ARPG Combat A.I With An Emergent Stealth System',
						'Created Debug Framework & System',
						'Main U.I Tech for Title',
						'Developed Cinematics System',
						'Created Novel Split Screen Camera System',
						'Setup, Administrated, and Owned Perforce Version Control',
						'Managed Google Cloud Services'
					]
				}
			]
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
			title: '<div>Generalist Programmer</div>',
			sub: 'at Brass Token',
			location: 'Vancouver, Canada',
			logo: '/assets/images/logos/company/brass_token_icon.svg',
			start: 'Aug 31 2021',
			end: 'Nov 1 2023',
			projects: [
				{
					desc: 'Worked on an <b>unannounced project</b>',
					list: [
						'Gameplay Programming & Prototyping (Character, Camera, & Gameflow)',
						'Performance Profiling & Optimization',
						'Main U.I Tech for Title',
						'Created Brass Token’s Debug System / Plugin',
						'Cinematic Prototyping and Implementation',
						'Created Custom Music Manager System',
						'Wwise Prototyping, Implementation, and Maintenance',
						'Created Automated Playthrough System',
						'Started and Developed Brass Token’s Unreal Q.O.L Plugin'
					]
				},
				{
					desc: 'Worked on "<a class="font-bolder" href="https://store.steampowered.com/app/2190430/The_Chant__The_Gloom_Below/" target="_blank">The Gloom Below</a>"',
					list: [
						'Core Game Loop Prototyping',
						'Created, Setup, & Owned Telemetry Systems',
						'Main U.I Tech for Title',
						'Automated Memory Report and Analytics System',
						'Owned and Maintained Jenkins & Build Machines'
					]
				},
				{
					desc: 'Worked on "<a class="font-bolder" href="https://store.steampowered.com/app/1577250/The_Chant/" target="_blank">The Chant</a>"',
					list: [
						'Optimization for PC, Playstation, & Xbox',
						'Gameplay Programming',
						'Created 17 Specialized Tools to Speed Up Pipelines',
						'Steam, Playstation Network, & Xbox Live Integration',
						'PlayFab Integration & Telemetry Implementation',
						'Main Cinematics Support & Cinematic Tech for 37 Cinematics',
						'Created and Owned Backend Database',
						'Created Frontend for Automated Testing and Profiling Results',
						'Owned and Created Input Rebind System for Keyboard & Controllers',
						'General A.I Behaviour & A.I Maintenance',
						'Specialized Particle Based Swarming A.I',
						'Main U.I Tech for Title'
					]
				}
			]
		}
	];

	let eduExperienceItems = [
		{
			company: 'Vancouver Film School',
			companySite: 'https://vfs.edu/programs/game-design-workshops',
			title: '<div>VFS Connect Instructor</div>',
			sub: 'At Vancouver Film School',
			location: 'Vancouver, Canada',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: 'July 1 2023',
			end: 'Present',
			description: '',
			list: [
				'Created, Proposed, & Pitched Workshop From Scratch',
				'Taught "<a class="font-bolder" href="https://vfs.edu/programs/online/AI-programming" target="_blank">Unreal A.I Workshop</a>"'
			],
			rotateLogo: '1'
		},
		{
			company: 'Vancouver Film School',
			companySite: 'https://vfs.edu/programs/game-design-workshops',
			title: '<div>VFS Ambassador</div><div>',
			sub: 'At Vancouver Film School',
			location: 'Vancouver, Canada',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: 'Feb 2022',
			end: 'Jan 2025',
			description: '',
			list: [
				'Supported VFS’ "<a class="font-bolder" href="https://vfs.edu/programs/online/game-design-workshops" target="_blank">Intro to Unreal Engine Workshop”</a>',
				'Supported VFS’ "<a class="font-bolder" href="https://vfs.edu/programs/online/unity#adv" target="_blank">Advanced Unity Workshop</a>"',
				'Supported VFS’ "<a class="font-bolder" href="https://vfs.edu/programs/online/game-design-certificate#lighting" target="_blank">Unreal Lighting Masterclass</a>"'
			],
			rotateLogo: '1'
		}
	];

	let educationItems = [
		{
			educationSite: 'https://vfs.edu/programs/game-design',
			company: 'Vancouver Film School',
			title: 'Game design Diploma',
			sub: 'From Vancouver Film School',
			location: 'Vancouver, Canada',
			logo: '/assets/images/logos/company/vfs_logo.svg',
			start: '2020',
			end: '2021',
			description: '<a>Honour Roll</a>',
			rotateLogo: '1'
		}
	];

	/**
	 * @param {string} start
	 * @param {string} end
	 */
	function calculateDuration(start, end) {
		// Parse the start date
		const startDate = new Date(start + ' 01');

		// Check if end date is 'Present' and use the current date if so
		const endDate = end.toLowerCase() === 'present' ? new Date() : new Date(end + ' 01');

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
		src={base + '/assets/images/headers/AboutMeHeader.jpg'}
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
					src={base + '/assets/images/headers/self-image-2.jpg'}
					alt="Portfolio Head Shot"
					loading="lazy"
				/>
			</div>

			<div class="category-title">
				<h3>About Me</h3>
			</div>

			<div class="text-block">
				<p style="line-height: 1.5">
					I've always wanted to make things that made people happy. Video games ended up being a
					great passion of mine which allowed me to make people smile. I'm always looking for
					opportunities in programming where I can use my skill set, grow & develop, and reach my
					best potential.
				</p>
			</div>

			<hr />

			<div class="category-title">
				<h3>Programming Experience</h3>
			</div>
			<br />
			{#each gameExperienceItems as experience}
				<div class="rowItem">
					<!-- Mobile -->
					<div class="d-sm-none d-block w-100" style="height: fit-content">
						<div class="w-100" style="height: 100px; place-items: center">
							{#if experience.companySite != ''}
								<a
									style="width: fit-content;"
									class="d-flex h-100"
									href={experience.companySite}
									target="_blank"
								>
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</a>
							{:else}
								<!-- svelte-ignore a11y-missing-attribute -->
								<div class="no-link">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</div>
							{/if}
						</div>

						<br />

						<div class="bottom">
							<div class="no-margin">
								<h3>{@html experience.title}</h3>
								<h6 style="display: flex;">
									{@html experience.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html experience.location}
								</h6>
								<h6>
									{removeDateFromString(experience.start)} - {removeDateFromString(experience.end)}
								</h6>
							</div>
							{#each experience.projects as project}
								<p class="about-me-item">
									{@html project.desc}
								</p>
								<ul>
									{#each project.list as listItem}
										<li class="about-me-item">{@html listItem}</li>
									{/each}
								</ul>
							{/each}
						</div>
					</div>

					<!-- Desktop -->
					<div class="d-sm-flex d-none">
						<div class="left">
							{#if experience.companySite != ''}
								<a style="height: fit-content;" href={experience.companySite} target="_blank">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</a>
							{:else}
								<!-- svelte-ignore a11y-missing-attribute -->
								<div class="no-link">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</div>
							{/if}
						</div>
						<div class="right">
							<div class="no-margin">
								<h3>{@html experience.title}</h3>
								<h6 style="display: flex;">
									{@html experience.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html experience.location}
								</h6>
								<h6>
									{removeDateFromString(experience.start)} - {removeDateFromString(experience.end)}
								</h6>
							</div>
							{#each experience.projects as project}
								<p class="about-me-item no-margin">
									{@html project.desc}
								</p>
								<ul>
									{#each project.list as listItem}
										<li class="about-me-item">{@html listItem}</li>
									{/each}
								</ul>
							{/each}
						</div>
					</div>
				</div>
			{/each}

			<hr />

			<div class="category-title">
				<h4>Teaching Experience</h4>
			</div>
			<br />
			{#each eduExperienceItems as experience}
				<div class="rowItem">
					<!-- Mobile -->
					<div class="d-sm-none d-block w-100" style="height: fit-content">
						<div class="w-100" style="height: 100px; place-items: center">
							{#if experience.companySite != ''}
								<a
									style="width: fit-content;"
									class="d-flex h-100"
									href={experience.companySite}
									target="_blank"
								>
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
										style={`transform: rotate(${-(parseInt(experience.rotateLogo) || 0) * 90}deg);`}
									/>
								</a>
							{:else}
								<!-- svelte-ignore a11y-missing-attribute -->
								<div class="no-link">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
										style={`transform: rotate(${-(parseInt(experience.rotateLogo) || 0) * 90}deg);`}
									/>
								</div>
							{/if}
						</div>

						<br />

						<div class="bottom">
							<div class="no-margin">
								<h3>{@html experience.title}</h3>
								<h6 style="display: flex;">
									{@html experience.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html experience.location}
								</h6>
								<h6>
									{removeDateFromString(experience.start)} - {removeDateFromString(experience.end)}
								</h6>
							</div>
							<p class="about-me-item no-margin">
								{@html experience.description}
							</p>
							<ul>
								{#each experience.list as listItem}
									<li class="about-me-item">{@html listItem}</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- Desktop -->
					<div class="d-sm-flex d-none">
						<div class="left">
							{#if experience.companySite != ''}
								<a href={experience.companySite} target="_blank">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</a>
							{:else}
								<!-- svelte-ignore a11y-missing-attribute -->
								<div class="no-link">
									<img
										src={base + experience.logo}
										alt={experience.company + ' Logo'}
										loading="lazy"
									/>
								</div>
							{/if}
						</div>
						<div class="right">
							<div class="no-margin">
								<h3>{@html experience.title}</h3>
								<h6 style="display: flex;">
									{@html experience.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html experience.location}
								</h6>
								<h6>
									{removeDateFromString(experience.start)} - {removeDateFromString(experience.end)}
								</h6>
							</div>
							<p class="about-me-item no-margin">
								{@html experience.description}
							</p>
							<ul>
								{#each experience.list as listItem}
									<li class="about-me-item">{@html listItem}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/each}

			<hr />

			<div class="category-title">
				<h4>Education</h4>
			</div>
			<br />
			{#each educationItems as education}
				<div class="rowItem">
					<!-- Mobile -->
					<div class="d-sm-none d-block w-100" style="height: fit-content">
						<div class="w-100" style="height: 100px; place-items: center">
							{#if education.educationSite != ''}
								<a
									style="width: fit-content;"
									class="d-flex h-100"
									href={education.educationSite}
									target="_blank"
								>
									<img
										src={base + education.logo}
										alt={education.company + ' Logo'}
										loading="lazy"
										style={`transform: rotate(${-(parseInt(education.rotateLogo) || 0) * 90}deg);`}
									/>
								</a>
							{:else}
								<!-- svelte-ignore a11y-missing-attribute -->
								<div class="no-link">
									<img
										src={base + education.logo}
										alt={education.company + ' Logo'}
										loading="lazy"
									/>
								</div>
							{/if}
						</div>

						<br />

						<div class="bottom">
							<div class="no-margin">
								<h3>{@html education.title}</h3>
								<h6 style="display: flex;">
									{@html education.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html education.location}
								</h6>
								<h6>
									{removeDateFromString(education.start)} - {removeDateFromString(education.end)}
								</h6>
							</div>
							<p class="about-me-item no-margin">
								{@html education.description}
							</p>
						</div>
					</div>

					<!-- Desktop -->
					<div class="d-sm-flex d-none">
						<div class="left">
							<a href={education.educationSite}>
								<img src={base + education.logo} alt={education.company + ' Logo'} loading="lazy" />
							</a>
						</div>
						<div class="right">
							<div class="no-margin">
								<h3>{@html education.title}</h3>
								<h6 style="display: flex;">
									{@html education.sub}
									<div style="margin: 0rem 0.5rem;">|</div>
									{@html education.location}
								</h6>
								<h6>
									{removeDateFromString(education.start)} - {removeDateFromString(education.end)}
								</h6>
							</div>
							<p class="about-me-item no-margin">
								{@html education.description}
							</p>
						</div>
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
		height: fit-content;

		margin-bottom: 1.75rem;
		/* background-color: aqua; */
	}

	.rowItem .left {
		display: flex;

		width: 97.5px;
		height: 97.5px;

		/* width: 15%; */
		/* background-color: red; */
	}

	.rowItem .left a,
	.rowItem .left a img,
	.rowItem .left .no-link,
	.rowItem .left .no-link img {
		height: 100%;
		width: 100%;
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
		/* background-color: yellow; */
	}

	.rowItem .bottom {
		width: 100%;
		height: 100%;

		align-content: center;
		padding-left: 1rem;

		text-align: left;
		/* background-color: yellow; */
	}

	.rowItem p,
	.rowItem ul * {
		font-family: var(--font-text);
		font-weight: 470;
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

	.text-block,
	.text-block p {
		width: 100%;
		margin-bottom: 2rem;
		font-family: var(--font-text);
		font-weight: 470 !important;
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
		.rowItem .right h6,
		.about-me-item {
			font-size: 0.8rem;
		}
		.about-me-column {
			width: 100%;
			max-width: 80%;
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
		.about-me-column {
			width: 100%;
			max-width: 80%;
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
		.about-me-column {
			width: 100%;
			max-width: 80%;
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
		.about-me-column {
			width: 100%;
			max-width: 70%;
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
