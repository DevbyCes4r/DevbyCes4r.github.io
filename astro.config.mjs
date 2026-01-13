import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://devbyces4r.me',
  output: 'static',
  integrations: [
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
      extendMarkdownConfig: true,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Personalizar URLs del sitemap
      serialize(item) {
        // Priorizar páginas importantes
        if (item.url.includes('/blog/')) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        if (item.url.includes('/cursos/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        }
        if (item.url.includes('/links/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],

  // Optimizaciones de rendimiento
  build: {
    inlineStylesheets: 'auto'
  },

  // SEO IA: Mejora el crawling
  compressHTML: true,

  scopedStyleStrategy: 'where',

  vite: {
    plugins: [tailwindcss()]
  }
});