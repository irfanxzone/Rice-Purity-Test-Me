import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Rice Purity Test for Girls 2026";
const description = "The Rice Purity Test for Girls is not just a quiz for many girls; it serves as a mirror reflecting what they experienced, avoided, and learned throughout their lives.";
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