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
        // Optional cover image for the course page and social sharing
        coverImage: z.string().optional(),
        documentUrl: z.string().optional(),
        // Main category for broad classification
        category: z.enum([
            'programacion',
            'inteligencia-artificial',
            'datos',
            'idiomas',
            'diseno',
            'devops-cloud',
            'productividad',
            'negocios'
        ]).optional(),
        // Tags for more specific classification
        tags: z.array(z.string()).optional(),
        // Group for custom study plans
        group: z.union([
            z.string(),
            z.array(z.string())
        ]).transform(val => Array.isArray(val) ? val : [val]).default(['Web Developer']),
        videoId: z.string().optional(),
        // Order within study plans
        orderGroup: z.number().default(1),
        // Date for sorting in category lists
        publishDate: z.date().default(() => new Date()),
    }),
});

const categoriesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        icon: z.string(),
        description: z.string(),
        order: z.number().default(1),
        moreCoursesLink: z.string().url().optional(),
    }),
});

const routesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        group: z.string(),
        order: z.number().default(1),
        objectives: z.array(z.string()).optional(),
        faqs: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        })).optional(),
    }),
});

const linksCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        emoji: z.string().optional(),
        publishDate: z.date().default(() => new Date()),
        links: z.array(z.object({
            title: z.string(),
            url: z.string(),
            icon: z.string().optional(),
        })),
    }),
});

export const collections = {
    'blog': blogCollection,
    'courses': coursesCollection,
    'categories': categoriesCollection,
    'routes': routesCollection,
    'links': linksCollection,
};
