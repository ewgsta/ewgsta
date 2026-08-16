import type { APIRoute } from 'astro';
import { getPosts } from '../data/posts';
import { getProjects } from '../data/projects';

export const GET: APIRoute = async () => {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const items = [
    ...posts.map((post) => ({
      type: 'post',
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      content: post.body.slice(0, 2000),
    })),
    ...projects.map((project) => ({
      type: 'project',
      slug: project.slug,
      title: project.data.title,
      description: project.data.description,
      content: project.body.slice(0, 2000),
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};