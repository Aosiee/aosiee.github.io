import { base } from '$app/paths';
import { projects } from '../projects';
import type { HeroEntry, SrcsetEntry } from '../projects';

export type BakedHeroItem = {
	title: string;
	page: string;
	position?: string;

	background_src?: string | null;
	background_srcset?: string | null;
	background_sizes: string;

	logo_src?: string | null;
	logo_srcset?: string | null;
	logo_sizes: string;

	folder: string;
	preload: string[];
};

const join = (folder: string, file?: string | null) => (file ? `${base}${folder}${file}` : null);

const inferDescriptor = (filename: string): string | null => {
	const m = filename.match(/-(\d+)w\.(avif|webp|jpe?g|png)$/i);
	return m ? `${m[1]}w` : null;
};

const buildSrcset = (folder: string, entries?: SrcsetEntry[] | null): string | null => {
	if (!entries || entries.length === 0) return null;
	const parts = entries
		.map((e) =>
			typeof e === 'string'
				? { file: e, descriptor: inferDescriptor(e) ?? '1x' }
				: { file: e.file, descriptor: e.descriptor ?? inferDescriptor(e.file) ?? '1x' }
		)
		.map(({ file, descriptor }) => `${join(folder, file)} ${descriptor}`);
	return parts.join(', ');
};

const joinSizes = (sizes: string[] | undefined): string =>
	(sizes && sizes.length ? sizes : ['100vw']).join(', ');

const widthOf = (descriptor: string): number => {
	const match = descriptor.match(/(\d+)w/);
	return match ? Number(match[1]) : 0;
};

// The highest-resolution srcset candidates, used to preload the slide.
const preloadFiles = (folder: string, entries?: SrcsetEntry[] | null): string[] => {
	if (!entries || entries.length === 0) return [];
	const files = entries.map((e) =>
		typeof e === 'string'
			? { file: e, width: widthOf(inferDescriptor(e) ?? '0w') }
			: { file: e.file, width: widthOf(e.descriptor ?? inferDescriptor(e.file) ?? '0w') }
	);
	const largest = files.reduce(
		(best, current) => (current.width > best.width ? current : best),
		files[0]
	);
	const url = join(folder, largest.file);
	return url ? [url] : [];
};

const bake = (project: (typeof projects)[number], hero: HeroEntry): BakedHeroItem => ({
	title: project.title,
	page: `${base}/projects/${project.category}/${project.slug}/`,
	position: hero.position,
	folder: hero.folder,

	background_src: join(hero.folder, hero.background_src),
	background_srcset: buildSrcset(hero.folder, hero.background_srcset),
	background_sizes: joinSizes(hero.background_sizes),

	logo_src: join(hero.folder, hero.logo_src),
	logo_srcset: buildSrcset(hero.folder, hero.logo_srcset),
	logo_sizes: joinSizes(hero.logo_sizes),

	preload: [
		...preloadFiles(hero.folder, hero.background_srcset),
		...preloadFiles(hero.folder, hero.logo_srcset)
	]
});

const heroSlugOrder = [
	'alien-fireteam-elite-2',
	'the-chant-dlc',
	'the-chant',
	'kinshft',
	'poppet',
	'get-a-grip'
];

export const heroCarouselItems: BakedHeroItem[] = heroSlugOrder.flatMap((slug) => {
	const project = projects.find((p) => p.slug === slug && p.hero);
	return project && project.hero ? [bake(project, project.hero)] : [];
});
