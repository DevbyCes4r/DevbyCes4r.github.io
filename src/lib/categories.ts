// Helper functions for categories collection
import { getCollection } from 'astro:content';

export async function getAllCategories() {
    const categories = await getCollection('categories');
    return categories.sort((a, b) => a.data.order - b.data.order);
}

export async function getCategoryBySlug(slug: string) {
    const categories = await getCollection('categories');
    return categories.find(cat => cat.slug === slug);
}

// Legacy type for backward compatibility
export type CategoryKey = string;
