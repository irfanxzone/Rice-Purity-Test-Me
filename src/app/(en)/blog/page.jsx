import { buildMetadata, PAGES, SITE_URL } from "@/lib/seo";
import PageClient from "./PageClient";

export const metadata = buildMetadata({ path: "/blog" });

export default function Page() {
  const articles = PAGES.filter(page => !page.noindex && page.type === "article");
  const listId = SITE_URL + "/blog#tests";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage", "@id": SITE_URL + "/blog#webpage",
        url: SITE_URL + "/blog", name: metadata.title.absolute,
        description: metadata.description, mainEntity: { "@id": listId },
      },
      {
        "@type": "ItemList", "@id": listId,
        numberOfItems: articles.length,
        itemListElement: articles.map((page, index) => ({
          "@type": "ListItem", position: index + 1,
          name: page.title, url: new URL(page.path, SITE_URL).href,
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
      <PageClient articles={articles.map(page => ({
        href: page.path, title: page.title, desc: page.description,
        image: page.image, imageAlt: page.title, tag: "Guide",
      }))} />
    </>
  );
}
