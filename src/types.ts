export type Theme = 'light' | 'dark';

export type ContentType = 'post' | 'project' | 'page';

export interface SocialIcon {
    label: string;
    value: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    isCopyable?: boolean;
    copyValue?: string;
}

export interface SiteConfig {
    siteTitle?: string;
    siteDescription?: string;
    siteUrl?: string;
    siteLanguage?: string;
    siteAuthor?: string;
    siteKeywords?: string;
    ogImage?: string;
    logoUrl?: string;
    logoText?: string;
    footerText?: string;
    heroTitle?: string;
    quoteText?: string;
    findMeOnLabel?: string;
    projectsLabel?: string;
    postsLabel?: string;
    readMoreLabel?: string;
    viewAllProjectsLabel?: string;
    viewAllPostsLabel?: string;
    backToHomeLabel?: string;
    backToProjectsLabel?: string;
    backToPostsLabel?: string;
    searchPlaceholder?: string;
    searchNoResults?: string;
    searchEmptyState?: string;
    postsSlug?: string;
    projectsSlug?: string;
    links?: SocialLink[];
    [key: string]: unknown;
}

export interface PostSummary {
    slug: string;
    title: string;
    description: string;
    thumbnail: string | null;
    layout: string;
    date: string;
    timestamp: number;
    content: string;
}

export interface Post extends PostSummary {
    id: string;
}

export interface Project {
    slug: string;
    name: string;
    desc: string;
    link: string;
    tech: string[];
    featured: boolean;
    isPinned?: boolean;
    body: string;
    content: string;
}

export interface SearchItem {
    title: string;
    slug: string;
    type: ContentType;
    description: string;
    content: string;
}
