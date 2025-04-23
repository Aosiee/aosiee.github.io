export const prerender = true;

export function load({ url }) {
  // Only return static serializable values
  return {
    url: url.pathname
  };
}