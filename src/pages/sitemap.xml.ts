import type { APIRoute } from 'astro';
import { getPosts, POSTS_PER_PAGE } from '../data/posts';
import { getProjects } from '../data/projects';
import { getSite, url } from '../data/site';
import { totalPages } from '../data/pagination';

export const GET: APIRoute = async () => {
  const [site, posts, projects] = await Promise.all([
    getSite(),
    getPosts(),
    getProjects(),
  ]);

  const base = site.siteUrl.replace(/\/$/, '');
  const absUrl = (path: string) =>
    `${base}${url(path)}${path === '/' ? '' : '/'}`;

  const locs: string[] = [
    absUrl('/'),
    absUrl(`/${site.projectsSlug}`),
    ...projects.map((p) => absUrl(`/${site.projectsSlug}/${p.slug}`)),
    absUrl(`/${site.postsSlug}`),
    ...posts.map((p) => absUrl(`/${site.postsSlug}/${p.slug}`)),
  ];

  const pages = totalPages(posts.length, POSTS_PER_PAGE);
  for (let i = 2; i <= pages; i++) {
    locs.push(absUrl(`/${site.postsSlug}/page/${i}`));
  }

  const now = new Date().toISOString();
  const items = locs
    .map(
      (loc) =>
        `<url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};