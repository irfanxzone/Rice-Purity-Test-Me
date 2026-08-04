import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "76 Rice Purity Test";
const description = "If you have taken the Rice Purity Test and scored 76, you might be wondering what this score means or what it says about your personality.";
const image = {
  url: "https://www.ricepuritytestme.com/76-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "76 Rice Purity Test score meaning featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/76-rice-purity-test",
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
      <ArticleJsonLd slug="76-rice-purity-test" />
      {children}
    </>
  );
}