import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const PROJECTS_PER_PAGE = 5;

export interface ProjectView extends Project {
  slug: string;
}

export const slugOf = (id: string): string => String(id).replace(/\.(md|mdx)$/, '');

export async function getProjects(): Promise<ProjectView[]> {
  const projects = await getCollection('projects');
  return projects
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((project) => ({ ...project, slug: slugOf(project.id) }));
}