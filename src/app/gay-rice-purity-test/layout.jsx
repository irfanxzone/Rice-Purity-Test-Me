import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Gay Rice Purity Test";
const description = "The gay rice purity test is a complete checklist of 100 questions that revolve around queer life instead of straight life.";
const image = {
  url: "https://www.ricepuritytestme.com/gay-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Gay Rice Purity Test LGBTQ quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://www.ricepuritytestme.com/gay-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/gay-rice-purity-test",
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
      <ArticleJsonLd slug="gay-rice-purity-test" />
      {children}
    </>
  );
}
