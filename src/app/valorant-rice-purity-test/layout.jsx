import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Valorant Rice Purity Test";
const description = "A parody of the official rice purity test, but for Valorant players.";
const image = {
  url: "https://www.ricepuritytestme.com/valorant-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Valorant Rice Purity Test gaming quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/valorant-rice-purity-test",
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
      <ArticleJsonLd slug="valorant-rice-purity-test" />
      {children}
    </>
  );
}