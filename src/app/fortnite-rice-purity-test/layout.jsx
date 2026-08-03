import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Fortnite Rice Purity Test 2026";
const description = "Are you a Fortnite player who wants to check how pure your Fortnite habits are?";
const image = {
  url: "https://www.ricepuritytestme.com/Fortnite-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Fortnite Rice Purity Test gaming quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/fortnite-rice-purity-test",
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
      <ArticleJsonLd slug="fortnite-rice-purity-test" />
      {children}
    </>
  );
}