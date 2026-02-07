import { parseFrontmatter } from '../utils/content';

const projectFiles = import.meta.glob('../content/projects/*.md', { eager: true, query: '?raw', import: 'default' });

export const projects = Object.keys(projectFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(projectFiles[key]);
    return {
        slug,
        name: data.title || slug,
        desc: data.description || '',
        link: data.link || '#',
        tech: data.tech || [],
        ...data,
        content
    };
});
