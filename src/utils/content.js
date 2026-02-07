import yaml from 'js-yaml';

export function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = frontmatterRegex.exec(markdown);

    if (match) {
        try {
            const data = yaml.load(match[1]);
            return { data, content: match[2] };
        } catch (e) {
            console.error('Error parsing frontmatter:', e);
            return { data: {}, content: markdown };
        }
    }
    return { data: {}, content: markdown };
}

export async function getProjects() {
    const modules = import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default' });
    const projects = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data } = parseFrontmatter(rawContent);
        // Map to component props format
        projects.push({
            name: data.title || 'Untitled Project',
            desc: data.description || '',
            link: data.link || '#',
            isPinned: data.featured === true, // Map Decap 'featured' field to 'isPinned' used in components
            tech: data.tech || [],
            // Keep original data just in case
            ...data
        });
    }

    // Sort pinned first? Or just usage based.
    return projects;
}

export async function getPosts() {
    const modules = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default' });
    const posts = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data } = parseFrontmatter(rawContent);
        const filename = path.split('/').pop().replace('.md', '');
        // Clean slug for date prefix if needed, though usually handled by filename convention in Decap slug pattern.
        // slug: "{{year}}-{{month}}-{{day}}-{{slug}}" -> e.g., 2024-01-01-my-post.md

        // We can use the filename as slug directly, which matches the route /posts/:slug

        posts.push({
            title: data.title || filename,
            date: data.date ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
            rawDate: data.date ? new Date(data.date) : new Date(), // For sorting
            slug: filename,
            thumbnail: data.thumbnail,
            layout: data.layout || 'blog',
            // ...data
        });
    }

    // Sort by date descending
    return posts.sort((a, b) => b.rawDate - a.rawDate);
}
