// Helper functions for study plans collection
import { getCollection } from 'astro:content';

export async function getAllRoutes() {
    const plans = await getCollection('routes');
    return plans.sort((a, b) => a.data.order - b.data.order);
}

export async function getRouteBySlug(slug: string) {
    const plans = await getCollection('routes');
    return plans.find(plan => plan.slug === slug);
}

export async function getRouteByGroup(group: string) {
    const plans = await getCollection('routes');
    return plans.find(plan => plan.data.group === group);
}

// Legacy type for backward compatibility
export type StudyPlanKey = string;
