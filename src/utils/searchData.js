
import yaml from 'js-yaml';

/**
 * Extracts frontmatter and content from a markdown string.
 * @param {string} markdown 
 * @returns {{ data: any, content: string }}
 */
function parseFrontmatter(markdown) {
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

/**
 * Fetches all searchable content (posts and projects).
 * @returns {Promise<Array<{ title: string, slug: string, type: 'post' | 'project', description?: string, content: string }>>}
 */
export async function getAllSearchableContent() {
    // Import all markdown files from content directory as raw strings
    const modules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });

    const items = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = parseFrontmatter(rawContent);

        // Determine type based on path
        let type = 'page';
        if (path.includes('/posts/')) type = 'post';
        else if (path.includes('/projects/')) type = 'project';

        // Generate slug from filename if not in frontmatter
        // Standard Decap naming is usually slug based on filename or frontmatter
        // We'll extract slug from filename for now as fallback, but rely on path structure
        const filename = path.split('/').pop().replace('.md', '');
        // For posts, filenames might be date-slug. Let's start with simple filename.
        // If slug is in frontmatter, use it? Decap config uses {{slug}} so usually consistent.
        // But for routing, we need the slug to match the route.
        // Posts route is /posts/:slug
        // Projects route is /projects/:slug (I assume, check App.jsx routes)

        // Clean slug for posts (remove date prefix if present, e.g. 2024-01-01-my-post -> my-post)
        let slug = filename;
        // if (type === 'post') {
        //     // Remove YYYY-MM-DD- prefix if it exists
        //     slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
        // }

        items.push({
            title: data.title || filename,
            slug: slug,
            type: type,
            description: data.description || '', // Projects often have description
            content: content, // Full content for search indexing
            rawRequest: rawContent // Just mostly for debug if needed
        });
    }

    return items;
}
