import type { APIRoute } from 'astro';
import { getPosts } from '../data/posts';
import { getProjects } from '../data/projects';
import { getSite, url } from '../data/site';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export const GET: APIRoute = async () => {
  const [site, posts, projects] = await Promise.all([
    getSite(),
    getPosts(),
    getProjects(),
  ]);

  const base = site.siteUrl.replace(/\/$/, '');
  const absUrl = (path: string) =>
    `${base}${url(path)}${path === '/' ? '' : '/'}`;
  const now = new Date().toISOString();

  const entries: SitemapEntry[] = [
    { loc: absUrl('/'), lastmod: now, changefreq: 'weekly', priority: '1.0' },
    {
      loc: absUrl(`/${site.projectsSlug}`),
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.9',
    },
    ...projects.map((project) => ({
      loc: absUrl(`/${site.projectsSlug}/${project.slug}`),
      lastmod: now,
      changefreq: 'yearly',
      priority: '0.7',
    })),
    {
      loc: absUrl(`/${site.postsSlug}`),
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.9',
    },
    ...posts.map((post) => ({
      loc: absUrl(`/${site.postsSlug}/${post.slug}`),
      lastmod: post.data.date.toISOString(),
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const items = entries
    .map(
      (e) =>
        `<url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
