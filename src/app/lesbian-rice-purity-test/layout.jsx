import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Lesbian Rice Purity Test 2026";
const description = "What a lesbian rice purity test asks, how scores work, and how it differs from an LGBT purity test. Find out what your result can actually tell you.";
const image = {
  url: "https://ricepuritytestme.com/lesbian-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Lesbian Rice Purity Test 2026: 76-question relationship experiences quiz",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://ricepuritytestme.com/lesbian-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/lesbian-rice-purity-test",
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
      <ArticleJsonLd slug="lesbian-rice-purity-test" />
      {children}
    </>
  );
}
