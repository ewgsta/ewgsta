
import load from 'js-yaml';

export function parseFrontmatter(text) {
    if (typeof text !== 'string') {
        return {
            frontmatter: {},
            content: ''
        };
    }
    const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(pattern);

    if (!match) {
        return {
            frontmatter: {},
            content: text
        };
    }

    try {
        const frontmatter = load.load(match[1]);
        return {
            frontmatter,
            content: match[2]
        };
    } catch (e) {
        console.error('Error parsing frontmatter:', e);
        return {
            frontmatter: {},
            content: text
        };
    }
}

export function parseYaml(text) {
    if (typeof text !== 'string') return {};
    try {
        return load.load(text) || {};
    } catch (e) {
        console.error('Error parsing YAML:', e);
        return {};
    }
}
