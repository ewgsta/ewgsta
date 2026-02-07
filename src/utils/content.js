import yaml from 'js-yaml';

export function parseYaml(yamlString) {
    try {
        return yaml.load(yamlString) || {};
    } catch (e) {
        return {};
    }
}

export function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = frontmatterRegex.exec(markdown);

    if (match) {
        try {
            const data = yaml.load(match[1]);
            return { data, content: match[2] };
        } catch (e) {
            return { data: {}, content: markdown };
        }
    }
    return { data: {}, content: markdown };
}

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

export async function getProjects() {
    const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default' });
    const projects = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = parseFrontmatter(rawContent);
        const filename = path.split('/').pop().replace('.md', '');

        projects.push({
            name: data.title || 'Untitled Project',
            desc: data.description || '',
            link: data.link || '#',
            isPinned: data.featured === true,
            tech: Array.isArray(data.tech) ? data.tech : [],
            slug: filename,
            body: content,
            content: content
        });
    }

    return projects;
}

export async function getPosts() {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
    const posts = [];

    for (const path in modules) {
        try {
            const rawContent = await modules[path]();
            const { data = {}, content } = parseFrontmatter(rawContent);
            const filename = path.split('/').pop().replace('.md', '');

            let dateValue = data.date;
            if (!dateValue) {
                const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (dateMatch) {
                    dateValue = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
                }
            }

            posts.push({
                title: data.title || filename,
                date: formatDate(dateValue),
                timestamp: toTimestamp(dateValue),
                slug: filename,
                thumbnail: data.thumbnail || null,
                layout: data.layout || 'blog',
                description: data.description || '',
                content: content
            });
        } catch (e) {
            // Post işleme hatası - sessizce atla
        }
    }

    return posts.sort((a, b) => b.timestamp - a.timestamp);
}
