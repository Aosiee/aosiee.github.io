import type { Project } from '../types';

const alienFireteamElite2: Project = {
	category: 'professional-project',
	slug: 'alien-fireteam-elite-2',
	title: 'Aliens: Fireteam 2',
	thumbnail: '/assets/images/professional/afe2/AFE2_Background.png',
	logo: '/assets/images/professional/afe2/AFE2_Logo.png',
	platforms: [
		{ platform: 'steam', link: 'https://store.steampowered.com/app/3448650' },
		{ platform: 'epic', link: 'https://store.epicgames.com/p/aliens-fireteam-elite-2-0363fe' },
		{ platform: 'playstation', link: 'https://store.playstation.com/en-us/concept/10014695' },
		{
			platform: 'xbox',
			link: 'https://www.xbox.com/en-US/games/store/aliens-fireteam-elite-2/9MTP6NRFJBGR'
		}
	],
	art: {
		background: '/assets/images/professional/afe2/AFE2_Background.png',
		background_position: '80% 0%',
		logo: '/assets/images/professional/afe2/AFE2_Logo.png'
	},
	hero: {
		position: 'center top',
		folder: '/assets/images/professional/afe2/',
		background_src: 'AFE2_Background_High.jpg',
		background_srcset: [
			{ file: 'AFE2_Background_High-800w.avif', descriptor: '800w' },
			{ file: 'AFE2_Background_High-1200w.avif', descriptor: '1200w' },
			{ file: 'AFE2_Background_High-1600w.avif', descriptor: '1600w' },
			{ file: 'AFE2_Background_High-1920w.avif', descriptor: '1920w' }
		],
		background_sizes: [
			'(min-width: 1600px) 1600px',
			'(min-width: 2000px) 1920px',
			'(min-width: 4000px) 1920px'
		],
		logo_src: 'AFE2_Logo.png',
		logo_srcset: [{ file: 'AFE2_Logo-895w.avif', descriptor: '895w' }],
		logo_sizes: ['(min-width: 801px) 600px', '(min-width: 1201px) 800px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'Cold Iron Studios',
			title: 'Build & Systems Engineer',
			duration: 'August 2025 - Current'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'Aliens: Fireteam Elite 2 - Launch Trailer',
						position: 'top',
						src: 'zjQaSsZJm54',
						type: 'youtube'
					},
					{
						title: 'Aliens: Fireteam Elite 2 - Announcement Trailer',
						position: 'top',
						src: 'PwtBqmAXDAE',
						type: 'youtube'
					},
					{
						title: 'Aliens: Fireteam Elite 2 - Official Co-Op Showcase Trailer',
						position: 'top',
						src: 'zQt9TgK4feA',
						type: 'youtube'
					},
					{
						title: 'Aliens: Fireteam Elite 2 - Official Xenomorph Showcase Trailer',
						position: 'top',
						src: 'Kzo4d00v84U',
						type: 'youtube'
					}
				]
			},
			{
				blockTitle: 'Summary',
				description: [
					{
						type: 'text',
						text: 'Under Construction...'
					}
				]
			},
			{
				blockTitle: 'Accomplishments',
				list: [
					{
						text: 'Systems Programming (Game-flow)'
					},
					{
						text: 'Owned the end-to-end DLC pipeline, from portals, to packaging, through entitlements and runtime integration.'
					},
					{
						text: 'Developed and maintained UI systems in both UMG and Slate.'
					},
					{
						text: 'Architected and owned the FTUE framework and tutorialization systems'
					},
					{
						text: 'Reworked and improved reward systems'
					},
					{
						text: 'Setup automated performance profiling & visualization'
					},
					{
						text: 'Integrated Steamworks and Epic Online Service (EOS/EGS) features and tie-ins for supporting all platform features in parity. '
					},
					{
						text: 'Platform programmer & portal support for all of our platforms.'
					},
					{
						text: 'Owned demo and media builds and their curated gameplay flows for events, press, and marketing'
					},
					{
						text: 'Built an automated chunk/pak generation and parsing tool, streamlining content packaging and dependency chain detection/tracking'
					},
					{
						text: 'Worked directly with the publisher on automated testing and profiling Gauntlet based framework'
					},
					{
						text: 'Owned, and maintained PGO workflows, intakes, and processing'
					},
					{
						text: 'Owned, managed, and maintained Oodlee optimizations'
					},
					{
						text: 'Owned the entirety of our build pipelines and agents'
					},
					{
						text: 'Owned and implemented localization with/through publisher (Daybreak)'
					},
					{
						text: 'Main perforce administrator and owner (branching/releases/support)'
					},
					{
						text: 'Reworked and updated inherited legacy build system to support all modern console platforms across several parallel streams and automated processes.'
					},
					{
						text: 'Worked, improved, and maintained progression systems and save systems.'
					},
					{
						text: 'Narrative support for title, supporting Articy and novel storyline system'
					},
					{
						text: 'Supported Daybreak with entitlement and portal support for their existing legacy titles.'
					}
				]
			}
		]
	}
};

export default alienFireteamElite2;
