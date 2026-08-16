import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../data/posts';
import { getProjects } from '../data/projects';
import { getSite, url } from '../data/site';

export async function GET(context: APIContext) {
  const [site, posts, projects] = await Promise.all([
    getSite(),
    getPosts(),
    getProjects(),
  ]);

  return rss({
    title: site.siteTitle,
    description: site.siteDescription,
    site: context.site ?? site.siteUrl,
    items: [
      ...posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: url(`/${site.postsSlug}/${post.slug}`),
      })),
      ...projects.map((project) => ({
        title: project.data.title,
        description: project.data.description,
        link: url(`/${site.projectsSlug}/${project.slug}`),
      })),
    ],
  });
}