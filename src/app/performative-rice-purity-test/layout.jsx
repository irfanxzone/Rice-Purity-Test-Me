import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Performative Rice Purity Test 2026";
const description = "The Performative Rice Purity Test is a modern trend that started on social media, where purity is no longer the subject.";
const image = {
  url: "https://www.ricepuritytestme.com/perfprmative-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Performative Rice Purity Test social trend quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/performative-rice-purity-test",
    type: "article",
    publishedTime: SEO_TIMESTAMP,
    modifiedTime: SEO_TIMESTAMP,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image.url],
  },
};

export default function ArticleLayout({ children }) {
  return (
    <>
      <ArticleJsonLd slug="performative-rice-purity-test" />
      {children}
    </>
  );
}