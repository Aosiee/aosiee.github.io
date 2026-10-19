## Actions
[![Deploy to GitHub Pages](https://github.com/Aosiee/aosiee.github.io/actions/workflows/static.yml/badge.svg)](https://github.com/Aosiee/aosiee.github.io/actions/workflows/static.yml)

## create-svelte
Powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Setting Up Project
Run `npm install` to install dependencies

## Developing
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Images

Responsive image variants (e.g. `name-800w.avif`) are generated at build time from the
highest-resolution sources. Sources are listed in `scripts/image-manifest.json` and processed by
`scripts/generate-images.mjs` (requires `sharp`).

- `npm run images` — generate/refresh variants (incremental; use `npm run images -- --force` to regenerate everything)
- `npm run build` and `npm run dev` run this automatically
- Generated files are gitignored; commit only the high-resolution sources and add new variants to the manifest
