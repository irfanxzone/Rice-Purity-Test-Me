import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";

const SEO_TIMESTAMP = getArticleTimestamp("brown-rice-purity-test");

const title = "Brown Rice Purity Test: Food & Culture Quiz";
const description = "The Brown Rice Purity Test is a playful food and culture quiz. It consists of a lighthearted mix of questions about everyday habits, fun, and food.";
const image = {
  url: "https://ricepuritytestme.com/brown-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Brown Rice Purity Test food quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://ricepuritytestme.com/brown-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/brown-rice-purity-test",
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
      <ArticleJsonLd slug="brown-rice-purity-test" />
      {children}
    </>
  );
}