import { parseFrontmatter } from './content';

export async function getAllSearchableContent() {
    const modules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });

    const items = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = parseFrontmatter(rawContent);

        let type = 'page';
        if (path.includes('/posts/')) type = 'post';
        else if (path.includes('/projects/')) type = 'project';

        const filename = path.split('/').pop().replace('.md', '');
        const slug = filename;

        items.push({
            title: data.title || filename,
            slug: slug,
            type: type,
            description: data.description || '',
            content: content
        });
    }

    return items;
}
