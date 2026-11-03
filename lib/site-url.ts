// The public address of the site, used for canonical links, the sitemap and social previews.
// Set NEXT_PUBLIC_SITE_URL once you have a custom domain (e.g. https://www.eximeria.com).
// Until then Vercel's production domain is used automatically.
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

// Only the production deployment should be indexed; previews and local runs stay out of search.
export const isIndexable = () =>
  !!process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_ENV === "production";
