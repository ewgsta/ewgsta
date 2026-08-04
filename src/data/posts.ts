import { parseFrontmatter } from '../utils/content';
import { siteLanguage } from '../data/siteData';
import type { Post } from '../types';

const postFiles: Record<string, string> = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function formatDate(date: string | Date | null | undefined): string {
    const locale = siteLanguage === 'tr' ? 'tr-TR' : 'en-US';
    const defaultDate = siteLanguage === 'tr' ? '22 Nisan 2012' : 'April 22, 2012';

    if (!date) return defaultDate;
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return defaultDate;

    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function toTimestamp(date: string | Date | null | undefined): number {
    if (!date) return 0;
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? 0 : d.getTime();
}

export const posts: Post[] = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop()?.replace(/\.md$/, '') || '';
    const { data, content } = parseFrontmatter(postFiles[key]);

    return {
        id: slug,
        slug,
        title: data.title || slug,
        description: data.description || '',
        thumbnail: data.thumbnail || null,
        layout: data.layout || 'blog',
        date: formatDate(data.date),
        timestamp: toTimestamp(data.date),
        content
    };
}).sort((a, b) => b.timestamp - a.timestamp);
