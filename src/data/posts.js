import { parseFrontmatter } from '../utils/content';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function formatDate(date) {
    if (!date) return '2025-01-01';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '2025-01-01';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const posts = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(postFiles[key]);
    return {
        id: slug,
        slug,
        title: data.title || slug,
        date: formatDate(data.date),
        rawDate: data.date instanceof Date ? data.date : new Date(data.date || '2025-01-01'),
        description: data.description || '',
        thumbnail: data.thumbnail,
        ...data,
        content
    };
}).sort((a, b) => b.rawDate - a.rawDate);
