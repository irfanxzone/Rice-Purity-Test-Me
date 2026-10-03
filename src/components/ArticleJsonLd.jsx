import { getPage, SITE_URL, SITE_NAME } from "@/lib/seo";

export default function ArticleJsonLd({ slug }) {
  const page = getPage(`/${slug}`);
  const url = new URL(page.path, SITE_URL).href;
  const organization = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: page.title, description: page.description, url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(page.image ? { image: new URL(page.image, SITE_URL).href } : {}),
    ...(page.published ? { datePublished: page.published } : {}),
    ...(page.modified ? { dateModified: page.modified } : {}),
    author: organization, publisher: organization,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
