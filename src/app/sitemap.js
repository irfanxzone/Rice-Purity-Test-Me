import { PAGES, SITE_URL } from "@/lib/seo";
export default function sitemap() {
  return PAGES.filter((page) => !page.noindex).map((page) => ({
    url: new URL(page.path, SITE_URL).href,
    ...(page.modified ? { lastModified: page.modified } : {}),
  }));
}
