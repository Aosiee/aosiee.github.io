import type { Project } from '../types';

const kinshft: Project = {
	category: 'professional-project',
	slug: 'kinshft',
	title: 'Kinshft',
	thumbnail: '/assets/images/professional/kinshft/Kinshift_NoLogo_2.avif',
	logo: '/assets/images/professional/kinshft/Kinshift_Logo.avif',
	platforms: [
		{ platform: 'steam', link: 'https://store.steampowered.com/app/3370960/KINSHFT/' },
		{
			platform: 'kickstarter',
			link: 'https://www.kickstarter.com/projects/gabrielfrizzera/kinshft'
		},
		{
			platform: 'indiegogo',
			link: 'https://www.indiegogo.com/projects/kinshft-a-time-bending-adventure#/'
		}
	],
	art: {
		background: '/assets/images/professional/kinshft/Kinshift_NoLogo.avif',
		background_position: '50% 15%',
		logo: '/assets/images/professional/kinshft/Kinshift_Logo.avif'
	},
	hero: {
		position: 'top',
		folder: '/assets/images/professional/kinshft/',
		background_src: 'Kinshift_NoLogo_2.jpg',
		background_srcset: [
			{ file: 'Kinshift_NoLogo_2-1600w.avif', descriptor: '1600w' },
			{ file: 'Kinshift_NoLogo_2-2000w.avif', descriptor: '2000w' },
			{ file: 'Kinshift_NoLogo_2-2160w.avif', descriptor: '2160w' }
		],
		background_sizes: [
			'(min-width: 1600px) 1600px',
			'(min-width: 2000px) 2000px',
			'(min-width: 4000px) 2160px'
		],
		logo_src: 'Kinshift_Logo.png',
		logo_srcset: [
			{ file: 'Kinshift_Logo-600w.avif', descriptor: '600w' },
			{ file: 'Kinshift_Logo-800w.avif', descriptor: '800w' },
			{ file: 'Kinshift_Logo-1000w.avif', descriptor: '1000w' },
			{ file: 'Kinshift_Logo-1200w.avif', descriptor: '1200w' },
			{ file: 'Kinshift_Logo-1600w.avif', descriptor: '1600w' }
		],
		logo_sizes: ['(min-width: 801px) 600px', '(min-width: 1201px) 800px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'What If? Games',
			title: 'Generalist Programmer',
			duration: 'September 2024 - Aug 2025'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'Kinshft',
						position: 'top',
						src: 'Jt9BXTl1MKU',
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
						text: 'Created Core Gameplay Systems'
					},
					{
						text: 'Developed Near-Isometric ARPG Combat System'
					},
					{
						text: 'Created Inventory System & Equipment System'
					},
					{
						text: 'Developed Scalable & Modular Stat / Modifier System'
					},
					{
						text: 'Created Scriptable A.I System For Designers'
					},
					{
						text: 'Created Debug Framework & System'
					},
					{
						text: 'Main U.I Tech for Title'
					},
					{
						text: 'Developed Cinematics System'
					},
					{
						text: 'Created Novel Split Screen Camera System'
					},
					{
						text: 'Setup, Administrated, and Owned Perforce Version Control'
					},
					{
						text: 'Managed Google Cloud Services'
					}
				]
			}
		]
	}
};

export default kinshft;
