import type { Project } from '../types';

const poppet: Project = {
	category: 'game-jam',
	slug: 'poppet',
	title: 'Poppet',
	thumbnail: '/assets/images/game-jams/poppet/Poppet_Header.avif',
	logo: '/assets/images/game-jams/poppet/Poppet.avif',
	platforms: [],
	art: {
		background: '/assets/images/game-jams/poppet/Poppet_Header.avif',
		background_position: '62% 38%',
		logo: '/assets/images/game-jams/poppet/Poppet.avif'
	},
	hero: {
		position: '80% 50%',
		folder: '/assets/images/game-jams/poppet/',
		background_src: 'Poppet_Header.jpg',
		background_srcset: [
			{ file: 'Poppet_Header-800w.avif', descriptor: '800w' },
			{ file: 'Poppet_Header-1000w.avif', descriptor: '1000w' },
			{ file: 'Poppet_Header-1090w.avif', descriptor: '1090w' }
		],
		background_sizes: [
			'(min-width: 1600px) 800px',
			'(min-width: 2000px) 1000px',
			'(min-width: 4000px) 1600w'
		],
		logo_src: 'Poppet.png',
		logo_srcset: [
			{ file: 'Poppet-800w.avif', descriptor: '800w' },
			{ file: 'Poppet-1000w.avif', descriptor: '1000w' },
			{ file: 'Poppet-1200w.avif', descriptor: '1200w' },
			{ file: 'Poppet-1366w.avif', descriptor: '1366w' }
		],
		logo_sizes: ['(min-width: 801px) 800px', '(min-width: 1201px) 1000px', '40vw']
	},
	page_data: {
		headerBlock: {
			company: 'Ludum Dare 56 - Game Jam | Godot',
			title: 'Team Size 4 | Programmer',
			duration: 'Oct 2024'
		},
		projectBlocks: [
			{
				projectCarousel: [
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/poppet/game-image-1.jpg',
						type: 'image'
					},
					{
						title: 'Gameplay Screenshot',
						position: 'top',
						src: '/assets/images/game-jams/poppet/game-image-2.jpg',
						type: 'image'
					}
				]
			},
			{
				blockTitle: 'Summary',
				description: [
					{
						type: 'text',
						text: 'Use a combination of investigative tools and deduction skills to identify the nature of malevolent spirits possessing Poppets before the entities become too powerful to control.'
					}
				]
			},
			{
				blockTitle: 'Accomplishments',
				list: [
					{
						text: 'First Project In Godot'
					},
					{
						text: 'Emergent Gameplay'
					},
					{
						text: 'Stylized Pixel Shader'
					},
					{
						text: 'Sole Programmer'
					}
				]
			}
		]
	}
};

export default poppet;
