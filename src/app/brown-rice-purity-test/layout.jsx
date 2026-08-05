import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Brown Rice Purity Test 2026";
const description = "A playful food-themed quiz that gives the Rice Purity Test a funny brown rice twist.";
const image = {
  url: "https://www.ricepuritytestme.com/brown-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Brown Rice Purity Test food quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/brown-rice-purity-test",
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