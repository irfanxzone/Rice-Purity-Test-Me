import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Overwatch Rice Purity Test: Player Quiz 2026";
const description = "Take the Overwatch Rice Purity Test to explore the gaming habits you have as a player.";
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