
import { parseYaml } from '../utils/content';

const configFile = import.meta.glob('../content/site/config.yaml', { eager: true, query: '?raw', import: 'default' });

let siteData = {};

const key = '../content/site/config.yaml';
if (configFile[key]) {
    siteData = parseYaml(configFile[key]);
}

export const siteTitle = siteData.siteTitle || 'Site Title Here';
export const logoUrl = siteData.logoUrl || 'https://github.com/ewgsta.png';
export const logoText = siteData.logoText || 'Logo Text Here';
export const footerText = siteData.footerText || '© 2026 Site Title Here. All rights reserved.';

export const heroTitle = siteData.heroTitle || 'Hero Title Here';
export const quoteText = siteData.quoteText || 'Quote Text Here';

export const findMeOnLabel = siteData.findMeOnLabel || 'Find me on';
export const projectsLabel = siteData.projectsLabel || 'Projects';
export const postsLabel = siteData.postsLabel || 'Posts';
export const readMoreLabel = siteData.readMoreLabel || 'Read More';
export const viewAllProjectsLabel = siteData.viewAllProjectsLabel || 'View All Projects';
export const viewAllPostsLabel = siteData.viewAllPostsLabel || 'View All Posts';

export const socialLinks = siteData.links || [];
