import { singleton, fields } from '@keystatic/core';
import { socialIcons } from './src/data/socialIcons';

export const siteConfig = singleton({
    label: 'Site Config',
    path: 'src/content/site/config',
    schema: {
        siteName: fields.text({ label: 'Site Name', defaultValue: 'Site Name Here' }),
        quoteText: fields.text({ label: 'Quote', defaultValue: 'Quote Here' }),
        socialLinks: fields.array(
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
                itemLabel: props => props.fields.platform.value ? socialIcons.find(icon => icon.value === props.fields.platform.value)?.label : 'Link'
            }
        ),
    },
});
