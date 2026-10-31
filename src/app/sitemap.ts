import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/data";
import { BASE_URL, OG_IMAGE } from "@/lib/seo";
import { SERVICES } from "./data";

const LAST_UPDATED = new Date("2026-10-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${BASE_URL}${encodeURI(post.image)}`],
  }));

  return [
    { url: BASE_URL, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1.0, images: [`${BASE_URL}${OG_IMAGE}`] },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [`${BASE_URL}${service.image}`],
    })),
    { url: `${BASE_URL}/contact`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    ...blogRoutes,
    { url: `${BASE_URL}/terms-and-condition`, lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
