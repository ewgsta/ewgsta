import yaml from 'js-yaml';
import type { Project, PostSummary } from '../types';

// Config'den dil ayarını al
const configFile: Record<string, string> = import.meta.glob('../content/site/config.yaml', { eager: true, query: '?raw', import: 'default' });
let siteLanguage = 'tr';
const configKey = '../content/site/config.yaml';
if (configFile[configKey]) {
    try {
        const config = yaml.load(configFile[configKey]) as Record<string, unknown>;
        siteLanguage = (config.siteLanguage as string) || 'tr';
    } catch (e) { }
}

export function parseYaml(yamlString: string): Record<string, any> {
    try {
        return (yaml.load(yamlString) as Record<string, any>) || {};
    } catch (e) {
        return {};
    }
}

export function parseFrontmatter(markdown: string): { data: Record<string, any>; content: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = frontmatterRegex.exec(markdown);

    if (match) {
        try {
            const data = yaml.load(match[1]) as Record<string, any>;
            return { data, content: match[2] };
        } catch (e) {
            return { data: {}, content: markdown };
        }
    }
    return { data: {}, content: markdown };
}

function formatDate(date: string | Date | null | undefined): string {
    const locale = siteLanguage === 'tr' ? 'tr-TR' : 'en-US';
    const defaultDate = siteLanguage === 'tr' ? '22 Nisan 2012' : 'April 22, 2012';

    if (!date) return defaultDate;
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return defaultDate;

    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function toTimestamp(date: string | Date | null | undefined): number {
    if (!date) return 0;
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? 0 : d.getTime();
}

export async function getProjects(): Promise<Project[]> {
    const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
    const projects: Project[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = parseFrontmatter(rawContent);
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        projects.push({
            name: data.title || 'Untitled Project',
            desc: data.description || '',
            link: data.link || '#',
            featured: data.featured === true,
            isPinned: data.featured === true,
            tech: Array.isArray(data.tech) ? data.tech : [],
            slug: filename,
            body: content,
            content: content
        });
    }

    return projects;
}

export async function getPosts(): Promise<PostSummary[]> {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
    const posts: PostSummary[] = [];

    for (const path in modules) {
        try {
            const rawContent = await modules[path]();
            const { data = {}, content } = parseFrontmatter(rawContent);
            const filename = path.split('/').pop()?.replace('.md', '') || '';

            let dateValue: string | undefined = data.date;
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
