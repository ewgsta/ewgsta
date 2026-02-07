import yaml from 'js-yaml';

export function parseYaml(yamlString) {
    try {
        return yaml.load(yamlString) || {};
    } catch (e) {
        console.error('Error parsing YAML:', e);
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
            console.error('Error parsing frontmatter:', e);
            return { data: {}, content: markdown };
        }
    }
    return { data: {}, content: markdown };
}

export async function getProjects() {
    const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default' });
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
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
    const posts = [];

    for (const path in modules) {
        try {
            const rawContent = await modules[path]();
            const { data = {} } = parseFrontmatter(rawContent);
            const filename = path.split('/').pop().replace('.md', '');

            // Try to extract date from filename if missing in frontmatter
            let dateObj;
            if (data.date) {
                dateObj = new Date(data.date);
            } else {
                // Try YYYY-MM-DD pattern
                const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (dateMatch) {
                    dateObj = new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`);
                } else {
                    // Fallback to now (or maybe stat mtime if possible, but not in browser)
                    dateObj = new Date();
                }
            }

            // Validate date
            if (isNaN(dateObj.getTime())) {
                dateObj = new Date();
            }

            posts.push({
                title: data.title || filename,
                date: dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                rawDate: dateObj,
                slug: filename,
                thumbnail: data.thumbnail,
                layout: data.layout || 'blog',
                description: data.description || '', // Add description if available
                ...data
            });
        } catch (e) {
            console.error("Error processing post:", path, e);
        }
    }

    // Sort by date descending
    return posts.sort((a, b) => b.rawDate - a.rawDate);
}
