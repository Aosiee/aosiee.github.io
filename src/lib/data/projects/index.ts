import type { Project, ProjectCategory } from './types';

import alienFireteamElite2 from './professional-project/alien-fireteam-elite-2';
import kinshft from './professional-project/kinshft';
import unannouncedProject from './professional-project/unannounced-project';
import theChantDlc from './professional-project/the-chant-dlc';
import theChant from './professional-project/the-chant';
import shiftVfsFinalProject from './professional-project/shift---vfs-final-project';
import proceduralVoxelGeneration from './coding-adventure/procedural-voxel-generation';
import multithreadedAINavigation from './coding-adventure/multithreaded-a.i-navigation';
import totem from './game-jam/totem';
import helloDarkness from './game-jam/hello-darkness';
import poppet from './game-jam/poppet';
import getAGrip from './game-jam/get-a-grip';

export * from './types';

export const projectCategories: { key: ProjectCategory; title: string }[] = [
	{ key: 'professional-project', title: 'PROFESSIONAL PROJECTS' },
	{ key: 'coding-adventure', title: 'CODING ADVENTURES' },
	{ key: 'game-jam', title: 'GAME JAMS' }
];

// Display ordering of the projects
export const projects: Project[] = [
	alienFireteamElite2,
	kinshft,
	unannouncedProject,
	theChantDlc,
	theChant,
	shiftVfsFinalProject,
	proceduralVoxelGeneration,
	multithreadedAINavigation,
	totem,
	helloDarkness,
	poppet,
	getAGrip
];
