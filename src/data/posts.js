import { parseFrontmatter } from '../utils/content';
import { siteLanguage } from '../data/siteData';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function formatDate(date) {
    const locale = siteLanguage === 'tr' ? 'tr-TR' : 'en-US';
    const defaultDate = siteLanguage === 'tr' ? '22 Nisan 2012' : 'April 22, 2012';

    if (!date) return defaultDate;
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return defaultDate;

    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function toTimestamp(date) {
    if (!date) return 0;
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? 0 : d.getTime();
}

export const posts = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
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
