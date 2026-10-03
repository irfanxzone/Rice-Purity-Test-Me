import { buildMetadata, PAGES } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/blog" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient articles={PAGES.filter((page) => !page.noindex && page.type === "article").map((page) => ({ href: page.path, title: page.title, desc: page.description, image: page.image, imageAlt: page.title, tag: page.type === "article" ? "Guide" : "Information" }))} />;
}
