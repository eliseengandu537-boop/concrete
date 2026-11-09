import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work/", "/services/", ...servicePages.map(service => `/services/${service.slug}/`), ...articles.map(article => `/journal/${article.slug}/`), "/privacy/"]
    .map(path => ({ url: absoluteUrl(path) }));
}
