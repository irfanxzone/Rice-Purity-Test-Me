import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "AO3 Rice Purity Test";
const description = "Take the AO3 Rice Purity Test and check how deep you are into fanfiction culture. Answer 100 fandom questions and get your purity score.";
const image = {
  url: "https://www.ricepuritytestme.com/ao3-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "AO3 Rice Purity Test fanfiction quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://www.ricepuritytestme.com/ao3-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/ao3-rice-purity-test",
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
      <ArticleJsonLd slug="ao3-rice-purity-test" />
      {children}
    </>
  );
}