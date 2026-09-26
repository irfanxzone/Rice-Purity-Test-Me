import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";

const SEO_TIMESTAMP = getArticleTimestamp("overwatch-rice-purity-test");

const title = "Overwatch Rice Purity Test: 100-Question Quiz";
const description = "Take the 100-question Overwatch Rice Purity Test to explore your gaming habits, hero choices, and experiences as a player.";
const image = {
  url: "https://ricepuritytestme.com/overwatch-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Overwatch Rice Purity Test gaming quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://ricepuritytestme.com/overwatch-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/overwatch-rice-purity-test",
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
      <ArticleJsonLd slug="overwatch-rice-purity-test" />
      {children}
    </>
  );
}