import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Weighted Rice Purity Test | Rice Purity Quiz";
const description = "Try the Weighted Rice Purity Test: a more realistic 100-question purity score with weighted scoring and deeper meaning.";
const image = {
  url: "https://www.ricepuritytestme.com/weighted-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Weighted Rice Purity Test scoring quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/weighted-rice-purity-test",
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
      <ArticleJsonLd slug="weighted-rice-purity-test" />
      {children}
    </>
  );
}