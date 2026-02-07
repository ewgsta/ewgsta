
import { parseFrontmatter } from '../utils/content';

const projectFiles = import.meta.glob('../content/projects/*.md', { eager: true, query: '?raw', import: 'default' });

export const projects = Object.keys(projectFiles).map(key => {
    const slug = key.split('/').pop().replace(/\.md$/, '');
    const { frontmatter, content } = parseFrontmatter(projectFiles[key]);
    return {
        slug,
        name: frontmatter.title || slug,
        desc: frontmatter.description || '',
        ...frontmatter,
        content
    };
});
