import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    thumbnail: z.string().nullable().optional(),
    layout: z.string().default('blog'),
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    link: z.string().default('#'),
    featured: z.boolean().default(false),
    tech: z.array(z.string()).default([]),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/site' }),
  schema: z
    .object({
      postsLabel: z.string().optional(),
      backToPostsLabel: z.string().optional(),
      mail: z.string().optional(),
      siteTitle: z.string().optional(),
      siteDescription: z.string().optional(),
      siteUrl: z.string().optional(),
      siteLanguage: z.string().optional(),
      siteAuthor: z.string().optional(),
      siteKeywords: z.string().optional(),
      ogImage: z.string().optional(),
      logoUrl: z.string().optional(),
      logoText: z.string().optional(),
      footerText: z.string().optional(),
      heroTitle: z.string().optional(),
      quoteText: z.string().optional(),
      findMeOnLabel: z.string().optional(),
      projectsLabel: z.string().optional(),
      readMoreLabel: z.string().optional(),
      viewAllProjectsLabel: z.string().optional(),
      viewAllPostsLabel: z.string().optional(),
      postsSlug: z.string().optional(),
      projectsSlug: z.string().optional(),
      searchPlaceholder: z.string().optional(),
      searchNoResults: z.string().optional(),
      searchEmptyState: z.string().optional(),
      backToHomeLabel: z.string().optional(),
      backToProjectsLabel: z.string().optional(),
      links: z
        .array(
          z.object({
            platform: z.string(),
            url: z.string(),
            isCopyable: z.boolean().optional(),
            copyValue: z.string().optional(),
          })
        )
        .optional(),
    })
    .passthrough(),
});

export const collections = { posts, projects, site };