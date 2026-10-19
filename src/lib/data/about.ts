export type WorkProject = {
	desc: string;
	list: string[];
};

export type WorkExperience = {
	company: string;
	companySite: string;
	title: string;
	sub: string;
	location: string;
	logo: string;
	logoStyle: string;
	start: string;
	end: string;
	projects: WorkProject[];
};

export type TeachingExperience = {
	company: string;
	companySite: string;
	title: string;
	sub: string;
	location: string;
	logo: string;
	logoStyle: string;
	start: string;
	end: string;
	description: string;
	list: string[];
	rotateLogo: string;
};

export type Education = {
	educationSite: string;
	company: string;
	title: string;
	sub: string;
	location: string;
	logo: string;
	logoStyle: string;
	start: string;
	end: string;
	description: string;
	rotateLogo: string;
};

export const gameExperienceItems: WorkExperience[] = [
	{
		company: 'Cold Iron Studios',
		companySite: 'https://coldironstudios.com',
		title: '<div>Build & Systems Programmer</div>',
		sub: 'at Cold Iron Studios',
		location: 'Vancouver, Canada',
		logo: '/assets/images/logos/company/coldiron.jpg',
		logoStyle: 'border: 2.5px black solid; border-radius: 7.5px',
		start: 'Aug 25 2025',
		end: 'Present',
		projects: [
			{
				desc: 'Worked on "<a class="font-bolder" href="https://store.steampowered.com/app/3448650/" target="_blank">Aliens: Fireteam Elite 2</a>"',
				list: [
					'Systems Programming (Game-flow)',
					'Owned the end-to-end DLC pipeline, from portals, to packaging, through entitlements and runtime integration.',
					'Developed and maintained UI systems in both UMG and Slate.',
					'Architected and owned the FTUE framework and tutorialization systems',
					'Reworked and improved reward systems',
					'Setup automated performance profiling & visualization',
					'Integrated Steamworks and Epic Online Service (EOS/EGS) features and tie-ins for supporting all platform features in parity.',
					'Platform programmer & portal support for all of our platforms.',
					'Owned demo and media builds and their curated gameplay flows for events, press, and marketing',
					'Built an automated chunk/pak generation and parsing tool, streamlining content packaging and dependency chain detection/tracking',
					'Worked directly with the publisher on automated testing and profiling Gauntlet based framework',
					'Owned, and maintained PGO workflows, intakes, and processing',
					'Owned, managed, and maintained Oodlee optimizations',
					'Owned the entirety of our build pipelines and agents',
					'Owned and implemented localization with/through publisher (Daybreak)',
					'Main perforce administrator and owner (branching/releases/support)',
					'Reworked and updated inherited legacy build system to support all modern console platforms across several parallel streams and automated processes.',
					'Worked, improved, and maintained progression systems and save systems.',
					'Narrative support for title, supporting Articy and novel storyline system',
					'Supported Daybreak with entitlement and portal support for their existing legacy titles.'
				]
			}
		]
	},
	{
		company: 'What If? Games',
		companySite: 'https://www.whatifgames.net/',
		title: '<div>Generalist Programmer</div>',
		sub: 'at What If? Games',
		location: 'North Vancouver, Canada',
		logo: '/assets/images/logos/company/whatifgames_logo.svg',
		logoStyle: '',
		start: 'Sep 3 2024',
		end: 'Aug 1 2025',
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
	{
		company: 'Brass Token',
		companySite: 'https://brasstoken.com/',
		title: '<div>Generalist Programmer</div>',
		sub: 'at Brass Token',
		location: 'Vancouver, Canada',
		logo: '/assets/images/logos/company/brass_token_icon.svg',
		logoStyle: 'scale: 1.1',
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

export const eduExperienceItems: TeachingExperience[] = [
	{
		company: 'Vancouver Film School',
		companySite: 'https://vfs.edu/programs/game-design-workshops',
		title: '<div>VFS Connect Instructor</div>',
		sub: 'at Vancouver Film School',
		location: 'Vancouver, Canada',
		logo: '/assets/images/logos/company/vfs_logo.svg',
		logoStyle: 'height: 85px; width: 85px; object-fit: contain;',
		start: 'July 1 2023',
		end: 'Jan 1 2026',
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
		sub: 'at Vancouver Film School',
		location: 'Vancouver, Canada',
		logo: '/assets/images/logos/company/vfs_logo.svg',
		logoStyle: 'height: 85px; width: 85px; object-fit: contain;',
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

export const educationItems: Education[] = [
	{
		educationSite: 'https://vfs.edu/programs/game-design',
		company: 'Vancouver Film School',
		title: 'Game Design Diploma',
		sub: 'From Vancouver Film School',
		location: 'Vancouver, Canada',
		logo: '/assets/images/logos/company/vfs_logo.svg',
		logoStyle: 'height: 85px; width: 85px; object-fit: contain;',
		start: '2020',
		end: '2021',
		description: '<a>Honour Roll</a>',
		rotateLogo: '1'
	}
];
