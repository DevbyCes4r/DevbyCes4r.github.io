import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.date(),
        updatedDate: z.date().optional(),
        author: z.string(),
        image: z.string().optional(),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        featured: z.boolean().default(false),
        readingTime: z.string(),
        // AI SEO Specific Fields
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
        prerequisites: z.array(z.string()).optional(),
        learningOutcomes: z.array(z.string()).optional(),
        faqs: z.array(z.object({
            question: z.string(),
            answer: z.string(),
            keywords: z.array(z.string()).optional()
        })).optional(),
    }),
});

const resourcesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        affiliateLink: z.string(),
        price: z.string().optional(),
        category: z.string().optional(),
        group: z.string().default('10-cursos-gratuitos-para-web-developer'),
    }),
});

export const collections = {
    'blog': blogCollection,
    'resources': resourcesCollection,
};
