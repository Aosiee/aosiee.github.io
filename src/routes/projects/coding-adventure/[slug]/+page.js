export const prerender = true

import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;

  try {
    const project = await fetchPostData(slug);
    return {
      project  // Return the post in an object
    };
  } catch (error) {
    // Redirect to 404 if not found
    return {
      status: 307,
      redirect: '/404'
    };
  }
}

  
// Helper function to fetch post data
/**
 * @param {any} slug
 */
async function fetchPostData(slug) {
  const response = await fetch(`/data/projects/coding-adventure/${slug}.json`);

  console.log(slug)

  if (!response.ok) {
    throw new Error('Post not found');
  }

  return await response.json();
}