export async function GET() {
    // Redirect to sitemap-index.xml for GitHub Pages compatibility
    return new Response(null, {
        status: 301,
        headers: {
            'Location': '/sitemap-index.xml'
        }
    });
}
