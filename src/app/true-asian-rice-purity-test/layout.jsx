import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "True Asian Rice Purity Test";
const description = "The True Asian Test is a parody quiz built on the format of the original Rice Purity Test. It was created by Liang Pan.";
const image = {
  url: "https://www.ricepuritytestme.com/true-asian-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "True Asian Rice Purity Test Asian upbringing quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://www.ricepuritytestme.com/true-asian-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/true-asian-rice-purity-test",
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
      <ArticleJsonLd slug="true-asian-rice-purity-test" />
      {children}
    </>
  );
}