import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const courses = await getCollection('courses');

    return rss({
        title: 'DevbyCes4r - Cursos Gratuitos',
        description: 'Cursos gratuitos de desarrollo web, inteligencia artificial y ciencia de datos. Contenido educativo de alta calidad.',
        site: context.site,
        items: courses.map((course) => ({
            title: course.data.title,
            pubDate: new Date('2024-01-01'), // Fecha base para cursos
            description: course.data.description,
            link: `/cursos/${course.slug}/`,
            // Custom data optimized for AI educational bots
            customData: `
        <category>${course.data.category}</category>
        <type>educational-course</type>
        <price>free</price>
        <language>es-ES</language>
        <format>online</format>
        <keywords>${course.data.title}, ${course.data.category}, curso gratis, tutorial</keywords>
      `,
        })),
        customData: `
      <language>es-ES</language>
      <category>Education</category>
      <category>Technology</category>
    `,
    });
}
