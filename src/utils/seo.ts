export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
}

export const SEO = {
  // Helper to format title
  formatTitle: (title: string) => `${title} | DevbyCes4r`,

  // Helper to get canonical URL
  getCanonicalURL: (path: string, site: URL) => new URL(path, site),

  // Helper to get social image URL
  getSocialImageURL: (image: string | undefined, site: URL) => new URL(image || '/og-default.jpg', site),
};