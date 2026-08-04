import { parseYaml } from '../utils/content';
import type { SiteConfig, SocialLink } from '../types';

const configFile: Record<string, string> = import.meta.glob('../content/site/config.yaml', { eager: true, query: '?raw', import: 'default' });

let siteData: SiteConfig = {};

const key = '../content/site/config.yaml';
if (configFile[key]) {
    siteData = parseYaml(configFile[key]);
}

// SEO Settings
export const siteTitle: string = siteData.siteTitle || 'Site Title Here';
export const siteDescription: string = siteData.siteDescription || 'Personal website and blog';
export const siteUrl: string = siteData.siteUrl || 'https://example.com';
export const siteLanguage: string = siteData.siteLanguage || 'en';
export const siteAuthor: string = siteData.siteAuthor || 'Author';
export const siteKeywords: string = siteData.siteKeywords || '';
export const ogImage: string = siteData.ogImage || '';

// Branding
export const logoUrl: string = siteData.logoUrl || 'https://github.com/ewgsta.png';
export const logoText: string = siteData.logoText !== undefined ? siteData.logoText : 'Logo Text Here';
export const footerText: string = siteData.footerText || '© 2026 Site Title Here. All rights reserved.';

export const heroTitle: string = siteData.heroTitle || 'Hero Title Here';
export const quoteText: string = siteData.quoteText || 'Quote Text Here';

// Labels
export const findMeOnLabel: string = siteData.findMeOnLabel || 'Find me on';
export const projectsLabel: string = siteData.projectsLabel || 'Projects';
export const postsLabel: string = siteData.postsLabel || 'Posts';
export const readMoreLabel: string = siteData.readMoreLabel || 'Read More';
export const viewAllProjectsLabel: string = siteData.viewAllProjectsLabel || 'View All Projects';
export const viewAllPostsLabel: string = siteData.viewAllPostsLabel || 'View All Posts';

export const backToHomeLabel: string = siteData.backToHomeLabel || '← Back to Home';
export const backToProjectsLabel: string = siteData.backToProjectsLabel || '← Back to Projects';
export const backToPostsLabel: string = siteData.backToPostsLabel || '← Back to Posts';

// Search Labels
export const searchPlaceholder: string = siteData.searchPlaceholder || 'Search posts and projects...';
export const searchNoResults: string = siteData.searchNoResults || 'No results found for "{query}"';
export const searchEmptyState: string = siteData.searchEmptyState || 'Type to start searching...';

// Social Links
export const socialLinks: SocialLink[] = siteData.links || [];

// Route Slugs
export const postsSlug: string = siteData.postsSlug || 'posts';
export const projectsSlug: string = siteData.projectsSlug || 'projects';
