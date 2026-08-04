import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Kink Rice Purity Test 2026";
const description = "A personal, age-specific 100-question test exploring preferences, boundaries, and consent.";
const image = {
  url: "https://www.ricepuritytestme.com/kink-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Kink Rice Purity Test adult quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/kink-rice-purity-test",
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
      <ArticleJsonLd slug="kink-rice-purity-test" />
      {children}
    </>
  );
}