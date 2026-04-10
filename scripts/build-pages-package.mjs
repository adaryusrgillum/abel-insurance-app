import fs from 'node:fs/promises';
import path from 'node:path';
import { deploymentAssetPaths } from '../src/assetPaths.js';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const pagesDir = path.join(rootDir, 'pages-dist');

const ensureFile = async (relativePath) => {
  const sourcePath = path.join(distDir, relativePath);
  await fs.access(sourcePath);

  const destinationPath = path.join(pagesDir, relativePath);
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  await fs.copyFile(sourcePath, destinationPath);
};

const distHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
const cssBundle = distHtml.match(/assets\/(index-[^"]+\.css)/)?.[1];
const jsBundle = distHtml.match(/assets\/(index-[^"]+\.js)/)?.[1];

if (!cssBundle || !jsBundle) {
  throw new Error('Unable to find the built Vite asset bundle references in dist/index.html.');
}

await fs.rm(pagesDir, { recursive: true, force: true });
await fs.mkdir(pagesDir, { recursive: true });

const filesToCopy = [
  'index.html',
  `assets/${cssBundle}`,
  `assets/${jsBundle}`,
  ...deploymentAssetPaths,
];

for (const relativePath of [...new Set(filesToCopy)]) {
  await ensureFile(relativePath);
}
