import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "AI Purity Test 2026";
const description = "AI Purity Test is a self-assessment or self-graded quiz that measures the person's relationship with AI.";
const image = {
  url: "https://www.ricepuritytestme.com/AI-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "AI Purity Test artificial intelligence quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/ai-purity-test",
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
      <ArticleJsonLd slug="ai-purity-test" />
      {children}
    </>
  );
}