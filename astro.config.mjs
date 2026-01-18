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
      filter: (page) => {
        // Excluir páginas que no queremos en el sitemap
        return !page.includes('/404') && 
               !page.includes('/_') &&
               !page.includes('/admin');
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Personalizar URLs del sitemap con prioridades SEO optimizadas
      serialize(item) {
        // Homepage - Máxima prioridad
        if (item.url === 'https://devbyces4r.me/' || item.url === 'https://devbyces4r.me') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Blog posts - Alta prioridad para contenido
        else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Blog index
        else if (item.url.includes('/blog')) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        // Cursos individuales - Alta prioridad para conversión
        else if (item.url.includes('/cursos/') && !item.url.endsWith('/cursos/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        }
        // Cursos index
        else if (item.url.includes('/cursos')) {
          item.priority = 0.95;
          item.changefreq = 'weekly';
        }
        // Herramientas
        else if (item.url.includes('/herramientas')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Links
        else if (item.url.includes('/links')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Rutas de estudio
        else if (item.url.includes('/rutas')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      },
      // Generar sitemap index para mejor organización
      i18n: undefined,
      entryLimit: 45000,
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