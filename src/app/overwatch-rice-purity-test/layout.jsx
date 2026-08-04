import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Overwatch Rice Purity Test 2026";
const description = "Check your Overwatch habits and community personality with this 100-question gaming quiz.";
const image = {
  url: "https://www.ricepuritytestme.com/overwatch-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Overwatch Rice Purity Test gaming quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/overwatch-rice-purity-test",
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