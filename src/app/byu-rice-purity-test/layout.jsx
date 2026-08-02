import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "BYU Rice Purity Test";
const description = "The BYU Rice Purity Test is an updated and a customized version of the original Rice Purity Test.";
const image = {
  url: "https://www.ricepuritytestme.com/BYU-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "BYU Rice Purity Test student quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/byu-rice-purity-test",
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
      <ArticleJsonLd slug="byu-rice-purity-test" />
      {children}
    </>
  );
}