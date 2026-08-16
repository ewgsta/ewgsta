import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

export default defineConfig({
  site: 'https://www.ewgsta.me',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw, rehypeHighlight],
  },
});