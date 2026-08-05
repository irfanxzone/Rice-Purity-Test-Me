import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Tests Like the Rice Purity Test in 2026";
const description = "Try popular tests like the Rice Purity Test, compare scores with friends, and discover surprising results.";
const image = {
  url: "https://www.ricepuritytestme.com/tests-like-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Tests Like the Rice Purity Test alternatives guide featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/tests-like-rice-purity-test",
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
      <ArticleJsonLd slug="tests-like-rice-purity-test" />
      {children}
    </>
  );
}