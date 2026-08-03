import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Rice Purity Test for Teens 2026";
const description = "The Rice Purity Test for teens is an age-specific version of the famous Purity Test, which young people take for fun, curiosity, and self-reflection.";
const image = {
  url: "https://www.ricepuritytestme.com/rice-purity-test-for-teens.webp",
  width: 1200,
  height: 630,
  alt: "Rice Purity Test for Teens safe quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/rice-purity-test-for-teens",
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
      <ArticleJsonLd slug="rice-purity-test-for-teens" />
      {children}
    </>
  );
}