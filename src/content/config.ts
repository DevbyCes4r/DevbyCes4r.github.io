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
        // Content type for AIOptimizedContent wrapper
        contentType: z.enum(['guide', 'tutorial', 'reference', 'article', 'review']).default('guide'),
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

const coursesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        affiliateLink: z.string(),
        price: z.string().optional(),
        // Main category for broad classification
        mainCategory: z.enum([
            'programacion',
            'inteligencia-artificial',
            'datos',
            'idiomas',
            'diseno',
            'devops-cloud',
            'productividad',
            'negocios'
        ]).optional(),
        // Subcategory for more specific classification (kept for backward compatibility)
        category: z.string().optional(),
        // Group for custom study plans
        group: z.union([
            z.string(),
            z.array(z.string())
        ]).transform(val => Array.isArray(val) ? val : [val]).default(['10 cursos gratuitos para web developer']),
        videoId: z.string().optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
    'courses': coursesCollection,
};
