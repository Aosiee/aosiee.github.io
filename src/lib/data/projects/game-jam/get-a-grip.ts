import type { Project } from '../types';

const getAGrip: Project = {
	category: 'game-jam',
	slug: 'get-a-grip',
	title: 'Get A Grip',
	thumbnail: '/assets/images/game-jams/get-a-grip/GAG_Header2.avif',
	logo: '/assets/images/game-jams/get-a-grip/GAG_Logo.avif',
	platforms: [],
	art: {
		background: '/assets/images/game-jams/get-a-grip/GAG_Header2.avif',
		background_position: '35% 65%',
		logo: '/assets/images/game-jams/get-a-grip/GAG_Logo.avif'
	},
	hero: {
		position: '50% 25%',
		folder: '/assets/images/game-jams/get-a-grip/',
		background_src: 'GAG_Header2.png',
		background_srcset: [
			{ file: 'GAG_Header2-1600w.avif', descriptor: '1600w' },
			{ file: 'GAG_Header2-2000w.avif', descriptor: '2000w' },
			{ file: 'GAG_Header2-2160w.avif', descriptor: '2160w' }
		],
		background_sizes: [
			'(min-width: 1600px) 1600px',
			'(min-width: 2000px) 2000px',
			'(min-width: 4000px) 2160px'
		],
		logo_src: 'GAG_Logo.png',
		logo_srcset: [
			{ file: 'GAG_Logo-1000w.avif', descriptor: '1000w' },
			{ file: 'GAG_Logo-1200w.avif', descriptor: '1200w' },
			{ file: 'GAG_Logo-1600w.avif', descriptor: '1600w' },
			{ file: 'GAG_Logo-1920w.avif', descriptor: '1920w' }
		],
		logo_sizes: ['(min-width: 801px) 1000px', '(min-width: 1201px) 1200px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'GMTK 2024 - Game Jam | Unreal Engine 5',
			title: 'Team Size 5 | Programmer',
			duration: 'Aug 2024'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'Gameplay Video',
						position: 'top',
						src: 'HlCSyVX66rg',
						type: 'youtube'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/get-a-grip/GAG_Header2.png',
						type: 'image'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/get-a-grip/screenshot1.png',
						type: 'image'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/get-a-grip/screenshot2.png',
						type: 'image'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/get-a-grip/screenshot3.png',
						type: 'image'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/get-a-grip/headImage.jpg',
						type: 'image'
					}
				]
			},
			{
				blockTitle: 'Summary',
				description: [
					{
						type: 'text',
						text: 'GET A GRIP is a physics-based climbing game where players take on the role of a once-advanced robot, now damaged and stranded in a colossal robot graveyard. With limited functionality, scale the treacherous mountain of scrap through the use of interchangeable arms found scattered across the metallic wasteland. Reach the peak or rust forever.'
					}
				]
			},
			{
				blockTitle: 'Accomplishments',
				list: [
					{
						text: 'Physics Based Gameplay'
					},
					{
						text: 'Interchangeable Hands'
					},
					{
						text: 'Stylized Cel-Shader'
					},
					{
						text: 'Sole Programmer'
					}
				]
			}
		]
	}
};

export default getAGrip;
