export type PlatformLink = {
	platform: string;
	link: string;
};

export type SrcsetEntry = string | { file: string; descriptor?: string };

export type ProjectArt = {
	background: string;
	background_position?: string;
	logo?: string;
	style?: string;
	maxWidth?: string;
};

export type HeroEntry = {
	position?: string;
	folder: string;
	background_src: string;
	background_srcset?: SrcsetEntry[];
	background_sizes?: string[];
	logo_src?: string;
	logo_srcset?: SrcsetEntry[];
	logo_sizes?: string[];
};

export type ProjectCategory = 'professional-project' | 'coding-adventure' | 'game-jam';

export type CarouselItem = {
	title: string;
	position?: string;
	src: string;
	type: string;
};

export type DescriptionEntry = {
	type: 'text' | 'img';
	text: string;
	link?: string;
};

export type ListEntry = {
	text: string;
	nav?: string;
};

export type ProjectBlock = {
	nav?: string;
	blockTitle?: string;
	projectCarousel?: CarouselItem[];
	projectVideo?: string;
	projectGif?: string;
	description?: DescriptionEntry[];
	list?: ListEntry[];
};

export type ProjectPageData = {
	headerBlock?: {
		company?: string;
		title?: string;
		duration?: string;
	};
	projectBlocks: ProjectBlock[];
};

export type Project = {
	category: ProjectCategory;
	slug: string;
	title: string;
	pageTitle?: string;
	thumbnail: string;
	logo: string;
	platforms: PlatformLink[];
	art: ProjectArt;
	hero?: HeroEntry;
	page_data: ProjectPageData;
};

export const getProjectPage = (project: Project) => `/projects/${project.category}/${project.slug}`;

export const getProjectTitle = (project: Project) => project.pageTitle ?? project.title;
