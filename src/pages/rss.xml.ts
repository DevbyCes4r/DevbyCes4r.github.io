import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const blog = await getCollection('blog');
    const courses = await getCollection('courses');

    return rss({
        title: 'DevbyCes4r - Blog y Cursos',
        description: 'Recursos de desarrollo web, tutoriales, cursos gratuitos y contenido sobre IA.',
        site: context.site,
        items: [
            // Blog posts
            ...blog.map((post) => ({
                title: post.data.title,
                pubDate: post.data.publishDate,
                description: post.data.description,
                link: `/blog/${post.slug}/`,
                customData: `
          <author>${post.data.author}</author>
          <category>${post.data.categories.join(',')}</category>
        `,
            })),
            // Courses
            ...courses.map((course) => ({
                title: `Curso: ${course.data.title}`,
                pubDate: new Date(),
                description: course.data.description,
                link: `/cursos/${course.slug}/`,
                customData: `
          <category>${course.data.category}</category>
          <type>course</type>
          <price>free</price>
        `,
            })),
        ],
        customData: `<language>es-ES</language>`,
    });
}
