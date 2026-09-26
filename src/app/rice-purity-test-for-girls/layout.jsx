import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";

const SEO_TIMESTAMP = getArticleTimestamp("rice-purity-test-for-girls");

const title = "Rice Purity Test for Girls: 100 Questions";
const description = "The Rice Purity Test for Girls is a 100-question quiz reflecting what girls experienced, avoided, and learned throughout their lives.";
const image = {
  url: "https://www.ricepuritytestme.com/rice-purity-test-for-girls.webp",
  width: 1200,
  height: 630,
  alt: "Rice Purity Test for Girls quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/rice-purity-test-for-girls",
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
      <ArticleJsonLd slug="rice-purity-test-for-girls" />
      {children}
    </>
  );
}