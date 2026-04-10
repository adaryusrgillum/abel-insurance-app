import { mkdir, writeFile } from 'node:fs/promises';
import { blogPosts } from '../src/content/blogPosts.js';
import { defaultSiteUrl } from '../src/siteConfig.js';

const siteUrl = (process.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');
const noIndex = process.env.VITE_NOINDEX === 'true';

const buildPageUrl = (path = '/') => {
  const cleanPath = path === '/' ? '' : path.replace(/^\/+/, '');
  return cleanPath ? `${siteUrl}/${cleanPath}` : `${siteUrl}/`;
};

const pageEntries = [
  { path: '/', lastmod: '2026-04-09' },
  { path: '/personal', lastmod: '2026-04-09' },
  { path: '/business', lastmod: '2026-04-09' },
  { path: '/about', lastmod: '2026-04-09' },
  { path: '/claims', lastmod: '2026-04-09' },
  { path: '/blog', lastmod: '2026-04-09' },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.modifiedTime,
  })),
];

const sitemapXml = noIndex
  ? `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>
`
  : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageEntries
  .map(
    (entry) => `  <url>
    <loc>${buildPageUrl(entry.path)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robotsTxt = noIndex
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\nSitemap: ${buildPageUrl('/sitemap.xml')}\n`;

await mkdir('public', { recursive: true });
await writeFile('public/sitemap.xml', sitemapXml, 'utf8');
await writeFile('public/robots.txt', robotsTxt, 'utf8');
