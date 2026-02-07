
import { parseFrontmatter } from '../utils/content';

const postFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const posts = Object.keys(postFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { frontmatter, content } = parseFrontmatter(postFiles[key]);
    return {
        id: slug,
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '2025-01-01',
        ...frontmatter,
        content
    };
}).sort((a, b) => new Date(b.date) - new Date(a.date));
