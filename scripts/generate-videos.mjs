/**
 * Bake source media from the unified, unserved `source-media/` folder into
 * web-friendly assets under `static/assets/videos/`.
 *
 * Every source is baked into multiple quality levels so the browser can fetch
 * only what the element actually needs:
 *
 *   - `source-media/<rel>.gif`
 *   - `source-media/<rel>.mp4|.webm`
 *
 * both produce, for each level width (see QUALITY_LEVELS below):
 *   - static/assets/videos/<rel>-<width>.mp4   (H.264 + faststart)
 * and a frame-1 placeholder at the smallest level:
 *   - static/assets/videos/<rel>-poster.avif
 *
 * Levels never upscale beyond the source's own width.
 *
 * The script then (re)writes `src/lib/data/video-manifest.ts`, a single map
 * keyed by the path the site references (original `/assets/images/...` path
 * for GIFs, `/assets/videos/...` for videos) so components can automatically
 * upgrade any media reference to a responsive <video> element.
 *
 * Outputs are skipped when they already exist and are newer than the source.
 * Stale outputs (whose source was removed) are pruned automatically.
 * Run with `--force` to rebuild everything.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_ROOT = path.join(ROOT, 'source-media');
const OUTPUT_ROOT = path.join(ROOT, 'static', 'assets', 'videos');
const MANIFEST_PATH = path.join(ROOT, 'src', 'lib', 'data', 'media-manifest.ts');

const FORCE = process.argv.includes('--force');

// Quality levels baked for every source, in ascending order. The largest
// level never exceeds 1920w unless the source itself is smaller.
const QUALITY_LEVELS = [640, 1280, 1920];

// Keys the site uses to reference the media.
const GIF_SITE_PREFIX = '/assets/images/';
const VIDEO_SITE_PREFIX = '/assets/videos/';

function collectFiles(dir, extensions) {
	let results = [];
	if (!fs.existsSync(dir)) return results;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results = results.concat(collectFiles(full, extensions));
		} else if (entry.isFile() && extensions.includes(path.extname(entry.name).toLowerCase())) {
			results.push(full);
		}
	}
	return results;
}

function ffprobeDimensions(mediaPath) {
	const output = execFileSync(
		'ffprobe',
		[
			'-v',
			'error',
			'-select_streams',
			'v:0',
			'-show_entries',
			'stream=width,height',
			'-of',
			'csv=p=0',
			mediaPath
		],
		{ encoding: 'utf8' }
	).trim();

	const [width, height] = output.split(',').map(Number);
	if (!width || !height) {
		throw new Error(`Could not probe dimensions for ${mediaPath}`);
	}
	// H.264 with yuv420p requires even dimensions.
	return { width: width - (width % 2), height: height - (height % 2) };
}

// Which widths to bake for a source of this width (never upscale).
function levelsFor(sourceWidth) {
	const levels = QUALITY_LEVELS.filter((w) => w < sourceWidth);
	if (levels.length === 0 || sourceWidth <= QUALITY_LEVELS[QUALITY_LEVELS.length - 1]) {
		levels.push(sourceWidth);
	}
	return [...new Set(levels)].sort((a, b) => a - b);
}

function levelHeight(sourceWidth, sourceHeight, levelWidth) {
	const height = Math.round((sourceHeight * levelWidth) / sourceWidth);
	return Math.max(2, height - (height % 2));
}

function isFresh(outputs, sourcePath) {
	if (FORCE) return false;
	const sourceMtime = fs.statSync(sourcePath).mtimeMs;
	return outputs.every((out) => fs.existsSync(out) && fs.statSync(out).mtimeMs > sourceMtime);
}

function runFfmpeg(args) {
	execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'ignore'] });
}

function encodeMp4(inputPath, width, height, outputPath) {
	runFfmpeg([
		'-y',
		'-i',
		inputPath,
		'-vf',
		`scale=${width}:${height}`,
		'-an',
		'-pix_fmt',
		'yuv420p',
		'-c:v',
		'libx264',
		'-preset',
		'veryfast',
		'-crf',
		'24',
		'-movflags',
		'+faststart',
		outputPath
	]);
}

async function encodePoster(sourcePath, width, height, outputPath) {
	const framePng = outputPath.replace(/\.avif$/, '-frame1.png');
	runFfmpeg(['-y', '-i', sourcePath, '-frames:v', '1', framePng]);
	await sharp(framePng)
		.resize({ width, height })
		.avif({ quality: 55, effort: 4 })
		.toFile(outputPath);
	fs.rmSync(framePng, { force: true });
}

// Bakes one source into all of its quality levels.
async function bakeSource(sourcePath) {
	const rel = path.relative(SOURCE_ROOT, sourcePath);
	const ext = path.extname(sourcePath).toLowerCase();
	const base = rel.slice(0, -ext.length);
	const outBase = path.join(OUTPUT_ROOT, base);

	const { width: sourceWidth, height: sourceHeight } = ffprobeDimensions(sourcePath);
	const levels = levelsFor(sourceWidth);

	const levelOutputs = levels.map((w) => ({
		width: w,
		height: levelHeight(sourceWidth, sourceHeight, w),
		file: `${outBase}-${w}.mp4`
	}));
	const posterFile = outBase + '-poster.avif';
	const posterLevel = levelOutputs[0];

	if (isFresh([...levelOutputs.map((l) => l.file), posterFile], sourcePath)) {
		return { skipped: true, rel, ext, sourceWidth, sourceHeight, levels: levelOutputs };
	}

	fs.mkdirSync(path.dirname(outBase), { recursive: true });

	console.log(
		`Baking ${path.relative(ROOT, sourcePath)} (${sourceWidth}x${sourceHeight}) -> ${levels.join(', ')}w`
	);

	// 1. Master encode at the source's full resolution; the level encodes are
	//    derived from it (much faster than re-decoding the source per level).
	const largestLevel = levelOutputs[levelOutputs.length - 1];
	const masterFile =
		largestLevel.width === sourceWidth
			? largestLevel.file // the master doubles as the largest level
			: path.join(path.dirname(outBase), `${path.basename(outBase)}-master.mp4`);

	encodeMp4(sourcePath, sourceWidth, sourceHeight, masterFile);

	// 2. Derive every level except the one the master already covers.
	for (const level of levelOutputs) {
		if (level.file === masterFile) continue;
		encodeMp4(masterFile, level.width, level.height, level.file);
	}

	// 3. Frame-1 poster at the smallest level.
	await encodePoster(masterFile, posterLevel.width, posterLevel.height, posterFile);

	if (masterFile.endsWith('-master.mp4')) {
		fs.rmSync(masterFile, { force: true });
	}

	return { skipped: false, rel, ext, sourceWidth, sourceHeight, levels: levelOutputs };
}

// Remove baked outputs whose source media no longer exists (or whose naming
// no longer matches the current output scheme), so the generated folder never
// accumulates orphans.
function pruneStaleOutputs(ownedBases) {
	if (!fs.existsSync(OUTPUT_ROOT)) return;

	const walk = (dir) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (/\.(mp4|avif)$/.test(entry.name)) {
				const rel = path.relative(OUTPUT_ROOT, full);
				const match = rel.match(/^(.*?)(-poster\.avif|-\d+\.mp4)$/);
				const owned = match && ownedBases.has(match[1]);
				if (!owned) {
					console.log(`Pruning stale ${path.relative(ROOT, full)}`);
					fs.rmSync(full, { force: true });
				}
			}
		}
	};
	walk(OUTPUT_ROOT);
}

function buildEntry(rel, sourceWidth, sourceHeight, levels) {
	const ext = path.extname(rel).toLowerCase();
	const base = rel.slice(0, -ext.length);
	const key = ext === '.gif' ? `${GIF_SITE_PREFIX}${rel}` : `${VIDEO_SITE_PREFIX}${rel}`;

	const levelLines = levels
		.map(
			({ width, height }) =>
				`\t\t\t{ width: ${width}, height: ${height}, src: '/assets/videos/${base}-${width}.mp4' },`
		)
		.join('\n');

	return (
		`\t'${key}': {\n` +
		`\t\tlevels: [\n${levelLines}\n\t\t],\n` +
		`\t\tposter: '/assets/videos/${base}-poster.avif',\n` +
		`\t\twidth: ${sourceWidth},\n` +
		`\t\theight: ${sourceHeight}\n` +
		`\t},`
	);
}

function writeManifest(entries) {
	const content = [
		'// AUTO-GENERATED by scripts/generate-videos.mjs — do not edit by hand.',
		'// Maps media site paths to their baked multi-quality video outputs.',
		'',
		'export type BakedLevel = {',
		'\twidth: number;',
		'\theight: number;',
		'\tsrc: string;',
		'};',
		'',
		'export type BakedMedia = {',
		'\tlevels: BakedLevel[];',
		'\tposter: string;',
		'\twidth: number;',
		'\theight: number;',
		'};',
		'',
		'export const bakedMedia: Record<string, BakedMedia> = {',
		entries.join('\n'),
		'};',
		''
	].join('\n');

	fs.writeFileSync(MANIFEST_PATH, content);
}

async function main() {
	const sources = collectFiles(SOURCE_ROOT, ['.gif', '.mp4', '.webm']).sort();
	const gifs = sources.filter((p) => path.extname(p).toLowerCase() === '.gif');
	const allVideos = sources.filter((p) =>
		['.mp4', '.webm'].includes(path.extname(p).toLowerCase())
	);

	// A video source whose basename collides with a GIF source would overwrite
	// the GIF's baked outputs, so skip it with a warning.
	const gifBases = new Set(gifs.map((p) => path.relative(SOURCE_ROOT, p).slice(0, -'.gif'.length)));
	const videos = [];
	for (const videoPath of allVideos) {
		const rel = path.relative(SOURCE_ROOT, videoPath);
		const base = rel.slice(0, -path.extname(videoPath).length);
		if (gifBases.has(base)) {
			console.warn(
				`Skipping ${path.relative(ROOT, videoPath)}: basename collides with a baked gif`
			);
		} else {
			videos.push(videoPath);
		}
	}

	// Everything under OUTPUT_ROOT must map back to one of these sources.
	const ownedBases = new Set();
	for (const sourcePath of [...gifs, ...videos]) {
		const rel = path.relative(SOURCE_ROOT, sourcePath);
		ownedBases.add(rel.slice(0, -path.extname(sourcePath).length));
	}
	pruneStaleOutputs(ownedBases);

	if (sources.length === 0) {
		console.warn('No source media found to bake.');
		writeManifest([]);
		return;
	}

	const baked = new Map(); // sourcePath -> bake result
	let generated = 0;
	let skipped = 0;

	for (const sourcePath of [...gifs, ...videos]) {
		try {
			const result = await bakeSource(sourcePath);
			result.skipped ? skipped++ : generated++;
			baked.set(sourcePath, result);
		} catch (error) {
			console.error(`FAILED ${path.relative(ROOT, sourcePath)}: ${error.message}`);
			process.exitCode = 1;
		}
	}

	// Build the manifest from every healthy source.
	const entries = [];
	for (const sourcePath of sources) {
		const result = baked.get(sourcePath);
		if (!result) continue;
		const rel = path.relative(SOURCE_ROOT, sourcePath);
		entries.push(buildEntry(rel, result.sourceWidth, result.sourceHeight, result.levels));
	}

	entries.sort();
	writeManifest(entries);

	console.log(`Done: ${generated} baked, ${skipped} skipped.`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
