import { parseFrontmatter } from '../utils/content';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const posts = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(postFiles[key]);
    return {
        id: slug,
        slug,
        title: data.title || slug,
        date: data.date || '2025-01-01',
        description: data.description || '',
        ...data,
        content
    };
}).sort((a, b) => new Date(b.date) - new Date(a.date));
