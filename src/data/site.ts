import { getCollection } from 'astro:content';

export interface SocialLink {
  platform: string;
  url: string;
  isCopyable?: boolean;
  copyValue?: string;
  label?: string;
}

export interface SiteData {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  siteLanguage: string;
  siteAuthor: string;
  siteKeywords: string;
  ogImage: string;
  logoUrl: string;
  logoText: string;
  footerText: string;
  heroTitle: string;
  quoteText: string;
  findMeOnLabel: string;
  projectsLabel: string;
  postsLabel: string;
  readMoreLabel: string;
  viewAllProjectsLabel: string;
  viewAllPostsLabel: string;
  backToHomeLabel: string;
  backToProjectsLabel: string;
  backToPostsLabel: string;
  searchPlaceholder: string;
  searchNoResults: string;
  searchEmptyState: string;
  postsSlug: string;
  projectsSlug: string;
  mail: string;
  socialLinks: SocialLink[];
}

let cached: Record<string, any> | null = null;

async function loadRaw(): Promise<Record<string, any>> {
  if (cached) return cached;
  const entries = await getCollection('site');
  const entry = entries.find((e) => e.id === 'config');
  cached = entry?.data ?? {};
  return cached;
}

function str(raw: Record<string, any>, key: string, def: string): string {
  const v = raw[key];
  return typeof v === 'string' && v.length > 0 ? v : def;
}

export async function getSite(): Promise<SiteData> {
  const raw = await loadRaw();
  const siteTitle = str(raw, 'siteTitle', 'Site Title Here');
  return {
    siteTitle,
    siteDescription: str(raw, 'siteDescription', 'Personal website and blog'),
    siteUrl: str(raw, 'siteUrl', 'https://example.com'),
    siteLanguage: str(raw, 'siteLanguage', 'en'),
    siteAuthor: str(raw, 'siteAuthor', 'Author'),
    siteKeywords: str(raw, 'siteKeywords', ''),
    ogImage: str(raw, 'ogImage', ''),
    logoUrl: str(raw, 'logoUrl', 'https://github.com/ewgsta.png'),
    logoText: str(raw, 'logoText', ''),
    footerText: str(raw, 'footerText', ''),
    heroTitle: str(raw, 'heroTitle', 'Hero Title Here'),
    quoteText: str(raw, 'quoteText', 'Quote Text Here'),
    findMeOnLabel: str(raw, 'findMeOnLabel', 'Find me on'),
    projectsLabel: str(raw, 'projectsLabel', 'Projects'),
    postsLabel: str(raw, 'postsLabel', 'Posts'),
    readMoreLabel: str(raw, 'readMoreLabel', 'Read More'),
    viewAllProjectsLabel: str(raw, 'viewAllProjectsLabel', 'View All Projects'),
    viewAllPostsLabel: str(raw, 'viewAllPostsLabel', 'View All Posts'),
    backToHomeLabel: str(raw, 'backToHomeLabel', '← Back to Home'),
    backToProjectsLabel: str(raw, 'backToProjectsLabel', '← Back to Projects'),
    backToPostsLabel: str(raw, 'backToPostsLabel', '← Back to Posts'),
    searchPlaceholder: str(raw, 'searchPlaceholder', 'Search posts and projects...'),
    searchNoResults: str(raw, 'searchNoResults', 'No results found for "{query}"'),
    searchEmptyState: str(raw, 'searchEmptyState', 'Type to start searching...'),
    postsSlug: str(raw, 'postsSlug', 'posts'),
    projectsSlug: str(raw, 'projectsSlug', 'projects'),
    mail: str(raw, 'mail', ''),
    socialLinks: resolveLinks(raw),
  };
}

function parseLinks(raw: any[]): SocialLink[] {
  return raw
    .filter((l) => l && typeof l === 'object')
    .map((l) => ({
      platform: String(l.platform ?? ''),
      url: String(l.url ?? '#'),
      isCopyable: Boolean(l.isCopyable),
      copyValue: l.copyValue ? String(l.copyValue) : String(l.url ?? ''),
    }));
}

function resolveLinks(raw: Record<string, any>): SocialLink[] {
  const mail = str(raw, 'mail', '');
  const links = parseLinks(Array.isArray(raw.links) ? raw.links : []);
  if (mail) {
    for (const link of links) {
      if (
        link.platform === 'fa-solid fa-envelope' &&
        (!link.url || link.url === '#')
      ) {
        link.url = `mailto:${mail}`;
        link.label = 'Email';
      }
    }
  }
  return links;
}

/** Builds a BASE-aware absolute-ish URL (works on GitHub Pages and custom domains). */
export function url(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/${String(path).replace(/^\//, '')}`;
}

export function formatDate(date: Date, siteLanguage: string): string {
  const locale = siteLanguage === 'tr' ? 'tr-TR' : 'en-US';
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}