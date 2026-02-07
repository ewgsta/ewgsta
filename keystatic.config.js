import { config, fields, collection, singleton } from '@keystatic/core';
import { socialIcons } from './src/data/socialIcons';

// Helper to safely check environment
const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;

export default config({
    storage: isProd
        ? {
            kind: 'github',
            repo: 'ewgsta/keystatic',
        }
        : {
            kind: 'local',
        },
    singletons: {
        site: singleton({
            label: 'Site Config',
            path: 'src/content/site/config',
            schema: {
                // General
                siteTitle: fields.text({ label: 'Site Title (Browser Tab)', defaultValue: 'Houtarou Oreki' }),
                logoUrl: fields.text({ label: 'Logo URL (also used as Favicon)', defaultValue: 'https://github.com/ewgsta.png' }),
                logoText: fields.text({ label: 'Logo Text (Header)', defaultValue: 'Houtarou Oreki' }),
                footerText: fields.text({ label: 'Footer Text', defaultValue: '© 2026 Houtarou Oreki. All rights reserved.' }),

                // Hero Section
                heroTitle: fields.text({ label: 'Hero Title', defaultValue: 'Houtarou Oreki' }),
                quoteText: fields.text({ label: 'Quote', defaultValue: 'What is meant to be will be, what is not meant to be should not be forced.' }),

                // Section Labels
                findMeOnLabel: fields.text({ label: '"Find me on" Label', defaultValue: 'Find me on' }),
                projectsLabel: fields.text({ label: '"Projects" Section Label', defaultValue: 'Projects' }),
                postsLabel: fields.text({ label: '"Posts" Section Label', defaultValue: 'Posts' }),
                readMoreLabel: fields.text({ label: '"Read More" Button Text', defaultValue: 'Read More' }),
                viewAllProjectsLabel: fields.text({ label: '"View All Projects" Button Text', defaultValue: 'View All Projects' }),
                viewAllPostsLabel: fields.text({ label: '"View All Posts" Button Text', defaultValue: 'View All Posts' }),

                // Social Links
                links: fields.array(
                    fields.object({
                        platform: fields.select({
                            label: 'Platform',
                            options: socialIcons.map(icon => ({ label: icon.label, value: icon.value })),
                            defaultValue: 'fa-brands fa-github'
                        }),
                        url: fields.url({ label: 'URL' }),
                    }),
                    {
                        label: 'Social Links',
                        itemLabel: (props) => {
                            const icon = socialIcons.find(icon => icon.value === props.fields.platform.value);
                            return icon ? icon.label : 'Link';
                        }
                    }
                ),
            },
        }),
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date', validation: { isRequired: true } }),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            },
        }),
        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description' }),
                link: fields.url({ label: 'Project URL' }),
                tech: fields.array(fields.text({ label: 'Tech Stack' }), {
                    label: 'Technologies',
                    itemLabel: (props) => props.value,
                }),
                content: fields.markdoc({ label: 'Additional Details', extension: 'md' }),
            },
        }),
    },
});
