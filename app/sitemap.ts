import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return PAGES.map(({ path, priority }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
