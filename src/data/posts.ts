import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { formatDate, getSite } from './site';

export type Post = CollectionEntry<'posts'>;

export interface PostView extends Post {
  slug: string;
  formattedDate: string;
}

export const POSTS_PER_PAGE = 5;

export const slugOf = (id: string): string => String(id).replace(/\.(md|mdx)$/, '');

export async function getPosts(): Promise<PostView[]> {
  const site = await getSite();
  const posts = await getCollection('posts');
  return posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((post) => ({
      ...post,
      slug: slugOf(post.id),
      formattedDate: formatDate(post.data.date, site.siteLanguage),
    }));
}