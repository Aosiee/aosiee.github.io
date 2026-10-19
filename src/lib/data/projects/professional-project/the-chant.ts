import type { Project } from '../types';

const theChant: Project = {
	category: 'professional-project',
	slug: 'the-chant',
	title: 'The Chant',
	thumbnail: '/assets/images/professional/the-chant/TheChantHeader_NoLogo.avif',
	logo: '/assets/images/professional/the-chant/TheChantHeader_Logo.avif',
	platforms: [
		{ platform: 'steam', link: 'https://store.steampowered.com/app/1577250/The_Chant/' },
		{ platform: 'playstation', link: 'https://store.playstation.com/en-us/concept/10002823' },
		{ platform: 'xbox', link: 'https://www.xbox.com/en-CA/games/store/the-chant/9NX008DVW20T' }
	],
	art: {
		background: '/assets/images/professional/the-chant/TheChantHeader_NoLogo.avif',
		background_position: 'top',
		logo: '/assets/images/professional/the-chant/TheChantHeader_Logo.avif'
	},
	hero: {
		position: 'top',
		folder: '/assets/images/professional/the-chant/',
		background_src: 'TheChantHeader_NoLogo.jpg',
		background_srcset: [
			{ file: 'TheChantHeader_NoLogo-1600w.avif', descriptor: '1600w' },
			{ file: 'TheChantHeader_NoLogo-2000w.avif', descriptor: '2000w' },
			{ file: 'TheChantHeader_NoLogo-2160w.avif', descriptor: '2160w' }
		],
		background_sizes: [
			'(min-width: 1600px) 1600px',
			'(min-width: 2000px) 2000px',
			'(min-width: 4000px) 2160px'
		],
		logo_src: 'TheChantHeader_Logo.png',
		logo_srcset: [
			{ file: 'TheChantHeader_Logo-800w.avif', descriptor: '800w' },
			{ file: 'TheChantHeader_Logo-1000w.avif', descriptor: '1000w' },
			{ file: 'TheChantHeader_Logo-1200w.avif', descriptor: '1200w' },
			{ file: 'TheChantHeader_Logo-1600w.avif', descriptor: '1600w' },
			{ file: 'TheChantHeader_Logo-1920w.avif', descriptor: '1920w' }
		],
		logo_sizes: ['(min-width: 801px) 800px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'Brass Token',
			title: 'Generalist Programmer',
			duration: 'Aug 2021 - December 2022'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'The Chant - New Age Cult Trailer',
						position: 'top',
						src: 'fn953CkOzH0',
						type: 'youtube'
					},
					{
						title: 'The Chant - Official Teaser Trailer',
						position: 'top',
						src: '8-_F8lx4rfw',
						type: 'youtube'
					},
					{
						title: 'The Chant - Launch Trailer',
						position: 'top',
						src: 'i2x45LEoU0E',
						type: 'youtube'
					},
					{
						title: 'The Chant - Gameplay Trailer',
						position: 'top',
						src: 'F-Uyokj8xHA',
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
						text: 'Optimization for PC, Playstation, & Xbox'
					},
					{
						text: 'Steam, Playstation Network, & Xbox Live OSS Integration'
					},
					{
						text: 'Gameplay Programming'
					},
					{
						text: 'Created 16 Tools to Speed Up Pipelines'
					},
					{
						text: 'PlayFab Integration & Telemetry'
					},
					{
						text: 'Main Cinematics Support & Cinematic Tech for 37 Cinematics'
					},
					{
						text: 'Automated Testing / Profiling'
					},
					{
						text: 'Main U.I Tech for Title'
					}
				]
			}
		]
	}
};

export default theChant;
