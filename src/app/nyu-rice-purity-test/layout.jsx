import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "NYU rice purity test";
const description = "The NYU Rice Purity Test is specially designed for NYU students.";
const image = {
  url: "https://www.ricepuritytestme.com/NYU-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "NYU Rice Purity Test student life quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/nyu-rice-purity-test",
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
      <ArticleJsonLd slug="nyu-rice-purity-test" />
      {children}
    </>
  );
}