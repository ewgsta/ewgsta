import { parseFrontmatter } from '../utils/content';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function formatDate(date) {
    if (!date) return 'April 22, 2012';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return 'April 22, 2012';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
