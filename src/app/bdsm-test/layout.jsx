import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Updated BDSM Test 2026";
const description = "The BDSM Test is a unique and modern way to check how kinky you really are.";
const image = {
  url: "https://www.ricepuritytestme.com/BDSM-test.webp",
  width: 1200,
  height: 630,
  alt: "Updated BDSM Test adult kink quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/bdsm-test",
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
      <ArticleJsonLd slug="bdsm-test" />
      {children}
    </>
  );
}