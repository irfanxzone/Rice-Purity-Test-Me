import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";

const SEO_TIMESTAMP = getArticleTimestamp("76-rice-purity-test");

const title = "76 Rice Purity Test: Score Meaning";
const description = "If you have taken the Rice Purity Test and scored 76, learn what this score means and how 24 checked answers affect your result.";
const image = {
  url: "https://ricepuritytestme.com/76-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "76 Rice Purity Test score meaning featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/76-rice-purity-test",
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
      <ArticleJsonLd slug="76-rice-purity-test" />
      {children}
    </>
  );
}