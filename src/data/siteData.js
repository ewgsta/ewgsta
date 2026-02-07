import { parseYaml } from '../utils/content';

const configFile = import.meta.glob('../content/site/config.yaml', { eager: true, query: '?raw', import: 'default' });

let siteData = {};

const key = '../content/site/config.yaml';
if (configFile[key]) {
    siteData = parseYaml(configFile[key]);
}

// SEO Settings
export const siteTitle = siteData.siteTitle || 'Site Title Here';
export const siteDescription = siteData.siteDescription || 'Personal website and blog';
export const siteUrl = siteData.siteUrl || 'https://example.com';
export const siteLanguage = siteData.siteLanguage || 'en';
export const siteAuthor = siteData.siteAuthor || 'Author';
export const siteKeywords = siteData.siteKeywords || '';
export const ogImage = siteData.ogImage || '';

// Branding
export const logoUrl = siteData.logoUrl || 'https://github.com/ewgsta.png';
export const logoText = siteData.logoText || 'Logo Text Here';
export const footerText = siteData.footerText || '© 2026 Site Title Here. All rights reserved.';

export const heroTitle = siteData.heroTitle || 'Hero Title Here';
export const quoteText = siteData.quoteText || 'Quote Text Here';

// Labels
export const findMeOnLabel = siteData.findMeOnLabel || 'Find me on';
export const projectsLabel = siteData.projectsLabel || 'Projects';
export const postsLabel = siteData.postsLabel || 'Posts';
export const readMoreLabel = siteData.readMoreLabel || 'Read More';
export const viewAllProjectsLabel = siteData.viewAllProjectsLabel || 'View All Projects';
export const viewAllPostsLabel = siteData.viewAllPostsLabel || 'View All Posts';

// Search Labels
export const searchPlaceholder = siteData.searchPlaceholder || 'Search posts and projects...';
export const searchNoResults = siteData.searchNoResults || 'No results found for "{query}"';
export const searchEmptyState = siteData.searchEmptyState || 'Type to start searching...';

// Social Links
export const socialLinks = siteData.links || [];

// Route Slugs
export const postsSlug = siteData.postsSlug || 'posts';
export const projectsSlug = siteData.projectsSlug || 'projects';
