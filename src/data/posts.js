import { parseFrontmatter } from '../utils/content';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function formatDate(date) {
    if (!date) return '2025-01-01';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '2025-01-01';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function toDate(date) {
    if (!date) return new Date('2025-01-01');
    if (date instanceof Date) return date;
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date('2025-01-01') : d;
}

export const posts = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(postFiles[key]);

    const rawDate = toDate(data.date);

    return {
        id: slug,
        slug,
        title: data.title || slug,
        description: data.description || '',
        thumbnail: data.thumbnail,
        layout: data.layout || 'blog',
        date: formatDate(data.date),
        rawDate: rawDate,
        content
    };
}).sort((a, b) => b.rawDate - a.rawDate);
