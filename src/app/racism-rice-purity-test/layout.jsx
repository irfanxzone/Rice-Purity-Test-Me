import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "The Racism Rice Purity Test 2026";
const description = "Check your racial bias and self-awareness with this 100-question anonymous test.";
const image = {
  url: "https://www.ricepuritytestme.com/Racism-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Racism Rice Purity Test racial bias quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/racism-rice-purity-test",
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
      <ArticleJsonLd slug="racism-rice-purity-test" />
      {children}
    </>
  );
}