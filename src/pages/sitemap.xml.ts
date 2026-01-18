// Este archivo ya no es necesario.
// Astro genera automáticamente el sitemap en sitemap-index.xml
// mediante la integración @astrojs/sitemap en astro.config.mjs

export async function GET() {
    // Redirect permanente al sitemap generado por Astro
    return new Response(null, {
        status: 301,
        headers: {
            'Location': '/sitemap-index.xml'
        }
    });
}
