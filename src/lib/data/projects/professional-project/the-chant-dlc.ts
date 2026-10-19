import type { Project } from '../types';

const theChantDlc: Project = {
	category: 'professional-project',
	slug: 'the-chant-dlc',
	title: 'The Chant DLC',
	pageTitle: 'The Chant - The Gloom Below',
	thumbnail: '/assets/images/professional/the-chant-dlc/TheChantDLCHeader-NoLogo.avif',
	logo: '/assets/images/professional/the-chant-dlc/TheChantDLCHeader_Logo.avif',
	platforms: [
		{
			platform: 'steam',
			link: 'https://store.steampowered.com/app/2190430/The_Chant__The_Gloom_Below/'
		},
		{
			platform: 'playstation',
			link: 'https://store.playstation.com/en-us/product/UP6714-PPSA03619_00-THEGLOOMBELOW000'
		},
		{
			platform: 'xbox',
			link: 'https://www.xbox.com/en-CA/games/store/the-chant-the-gloom-below/9NRBKCHLNKX6/0010'
		}
	],
	art: {
		background: '/assets/images/professional/the-chant-dlc/TheChantDLCHeader-NoLogo.avif',
		background_position: '0% 10%',
		logo: '/assets/images/professional/the-chant-dlc/TheChantDLCHeader_Logo.avif'
	},
	hero: {
		position: 'left top',
		folder: '/assets/images/professional/the-chant-dlc/',
		background_src: 'TheChantDLCHeader-NoLogo.jpg',
		background_srcset: [
			{ file: 'TheChantDLCHeader-NoLogo-1600w.avif', descriptor: '1600w' },
			{ file: 'TheChantDLCHeader-NoLogo-2000w.avif', descriptor: '2000w' },
			{ file: 'TheChantDLCHeader-NoLogo-2160w.avif', descriptor: '2160w' }
		],
		background_sizes: [
			'(min-width: 1600px) 1600px',
			'(min-width: 2000px) 2000px',
			'(min-width: 4000px) 2160px'
		],
		logo_src: 'TheChantDLCHeader_Logo.png',
		logo_srcset: [
			{ file: 'TheChantDLCHeader_Logo-800w.avif', descriptor: '800w' },
			{ file: 'TheChantDLCHeader_Logo-1000w.avif', descriptor: '1000w' },
			{ file: 'TheChantDLCHeader_Logo-1200w.avif', descriptor: '1200w' },
			{ file: 'TheChantDLCHeader_Logo-1600w.avif', descriptor: '1600w' },
			{ file: 'TheChantDLCHeader_Logo-1920w.avif', descriptor: '1920w' }
		],
		logo_sizes: ['(min-width: 801px) 800px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'Brass Token',
			title: 'Generalist Programmer',
			duration: 'February 2023 - August 2023'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'The Chant: The Gloom Below - Launch Trailer',
						position: 'top',
						src: 'u9h8j_wSLnI',
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
						text: 'Core Game Loop Prototyping'
					},
					{
						text: 'Created, Setup, & Owned Telemetry Systems'
					},
					{
						text: 'Main U.I Tech for Title'
					},
					{
						text: 'Automated Memory Report and Analytics System'
					},
					{
						text: 'Owned and Maintained Jenkins & Build Machines'
					}
				]
			}
		]
	}
};

export default theChantDlc;
