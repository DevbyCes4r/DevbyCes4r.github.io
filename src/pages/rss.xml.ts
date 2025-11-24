import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const blog = await getCollection('blog');
    return rss({
        title: 'DevbyCes4r Blog',
        description: 'Recursos de desarrollo web, tutoriales y cursos.',
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            // Custom data for AI parsers
            customData: `
        <author>${post.data.author}</author>
        <category>${post.data.categories.join(',')}</category>
      `,
        })),
        customData: `<language>es-ES</language>`,
    });
}
