export const prerender = true

import { base } from '$app/paths';

import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const slug = params.slug;
  const category = params.category;

  try {
    const file = await fetch(`/data/projects/${category}/${slug}.json`);

    if (!file.ok) {
      throw redirect(307, base + '/404');
    }

    const project = await file.json();
    console.log(project);
    return {
      project  // Return the post in an object
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    throw redirect(307, base + '/404'); // Ensures proper redirection
  };
}