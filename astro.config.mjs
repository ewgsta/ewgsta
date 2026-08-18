import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

const markdownProcessor = unified({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeRaw, rehypeHighlight],
});

export default defineConfig({
  site: 'https://www.ewgsta.me',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  markdown: {
    processor: markdownProcessor,
  },
});