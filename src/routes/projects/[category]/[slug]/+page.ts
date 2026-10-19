import { error } from '@sveltejs/kit';
import { projects, getProjectTitle } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const meta = projects.find(
		(project) => project.category === params.category && project.slug === params.slug
	);
	if (!meta) {
		error(404, 'Project not found');
	}

	return {
		project: {
			title: getProjectTitle(meta),
			art: meta.art,
			page_data: meta.page_data
		}
	};
};
