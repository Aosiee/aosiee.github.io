<script context="module" lang="ts">
	import { base } from '$app/paths';

	type SrcsetEntry = string | { file: string; descriptor?: string };

	type RawItem = {
		title: string;
		page: string; // "/projects/…"
		position?: string;
		folder: string; // "/assets/images/…/"

		// Background (single + optional srcset list)
		background_src?: string;
		background_srcset?: SrcsetEntry[];
		background_sizes?: string[]; // string[]

		// Logo (single + optional srcset list)
		logo_src?: string;
		logo_srcset?: SrcsetEntry[];
		logo_sizes?: string[]; // string[]

		// legacy convenience (will be normalized if present)
		src?: string;
		logo?: string;
	};

	// ---------- Author your raw items here (sizes are always string[]) ----------
	const rawItems: RawItem[] = [
		{
			title: 'The Chant DLC',
			page: '/projects/professional-project/the-chant-dlc',
			position: 'left top',

			folder: '/assets/images/professional/the-chant-dlc/',
			background_src: 'TheChantDLCHeader-NoLogo.jpg',
			background_srcset: [
				{ file: 'TheChantDLCHeader-NoLogo-1600w.avif', descriptor: '1600w' },
				{ file: 'TheChantDLCHeader-NoLogo-2000w.avif', descriptor: '2000w' },
				{ file: 'TheChantDLCHeader-NoLogo.avif', descriptor: '2160w' }
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
				{ file: 'TheChantDLCHeader_Logo.avif', descriptor: '1920w' }
			],
			logo_sizes: ['(min-width: 801px) 800px', '40vw']
		},
		{
			title: 'The Chant',
			page: '/projects/professional-project/the-chant',
			position: 'top',

			folder: '/assets/images/professional/the-chant/',
			background_src: 'TheChantHeader_NoLogo.jpg',
			background_srcset: [
				{ file: 'TheChantHeader_NoLogo-1600w.avif', descriptor: '1600w' },
				{ file: 'TheChantHeader_NoLogo-2000w.avif', descriptor: '2000w' },
				{ file: 'TheChantHeader_NoLogo.avif', descriptor: '2160w' }
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
				{ file: 'TheChantHeader_Logo.avif', descriptor: '1920w' }
			],
			logo_sizes: ['(min-width: 801px) 800px', '40vw']
		},
		{
			title: 'Kinshft',
			page: '/projects/professional-project/kinshft',
			position: 'top',

			folder: '/assets/images/professional/kinshft/',
			background_src: 'Kinshift_NoLogo_2.jpg',
			background_srcset: [
				{ file: 'Kinshift_NoLogo_2-1600w.avif', descriptor: '1600w' },
				{ file: 'Kinshift_NoLogo_2-2000w.avif', descriptor: '2000w' },
				{ file: 'Kinshift_NoLogo_2.avif', descriptor: '2160w' }
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
		{
			title: 'Poppet',
			page: '/projects/game-jam/poppet',
			position: '80% 50%',

			folder: '/assets/images/game-jams/poppet/',
			background_src: 'Poppet_Header.jpg',
			background_srcset: [
				{ file: 'Poppet_Header-800w.avif', descriptor: '800w' },
				{ file: 'Poppet_Header-1000w.avif', descriptor: '1000w' },
				{ file: 'Poppet_Header.avif', descriptor: '1600w' }
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
				{ file: 'Poppet.avif', descriptor: '1600w' }
			],
			logo_sizes: ['(min-width: 801px) 800px', '(min-width: 1201px) 1000px', '40vw']
		},
		{
			title: 'Get A Grip',
			page: '/projects/game-jam/get-a-grip',
			position: '50% 25%',

			folder: '/assets/images/game-jams/get-a-grip/',
			background_src: 'GAG_Header2.png',
			background_srcset: [
				{ file: 'GAG_Header2-1600w.avif', descriptor: '1600w' },
				{ file: 'GAG_Header2-2000w.avif', descriptor: '2000w' },
				{ file: 'GAG_Header2.avif', descriptor: '2160w' }
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
				{ file: 'GAG_Logo.avif', descriptor: '2000w' }
			],
			logo_sizes: ['(min-width: 801px) 1000px', '(min-width: 1201px) 1200px', '40vw']
		}
	];

	// ----------------- baking helpers -----------------
	const join = (folder: string, file?: string | null) => (file ? `${base}${folder}${file}` : null);

	// infer "###w" from name like "...-800w.avif"
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

	// ----------------- baked output types -----------------
	export type BakedItem = {
		title: string;
		page: string; // with base
		position?: string;

		background_src?: string | null;
		background_srcset?: string | null;
		background_sizes: string; // joined from string[]

		logo_src?: string | null;
		logo_srcset?: string | null;
		logo_sizes: string; // joined from string[]

		folder: string; // keep if needed elsewhere
	};

	// ----------------- BAKED at import time -----------------
	export const items: BakedItem[] = rawItems.map((it) => ({
		title: it.title,
		page: `${base}${it.page}`,
		position: it.position,
		folder: it.folder,

		background_src: join(it.folder, it.background_src ?? it.src ?? null),
		background_srcset: buildSrcset(it.folder, it.background_srcset),
		background_sizes: joinSizes(it.background_sizes),

		logo_src: join(it.folder, it.logo_src ?? it.logo ?? null),
		logo_srcset: buildSrcset(it.folder, it.logo_srcset),
		logo_sizes: joinSizes(it.logo_sizes)
	}));
</script>
