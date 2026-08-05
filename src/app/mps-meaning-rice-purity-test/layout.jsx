import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "MPS Meaning Rice Purity Test";
const description = "Learn what MPS means in the Rice Purity Test and how to answer related questions honestly.";
const image = {
  url: "https://www.ricepuritytestme.com/mps-meaning-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "MPS Meaning Rice Purity Test guide featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/mps-meaning-rice-purity-test",
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
      <ArticleJsonLd slug="mps-meaning-rice-purity-test" />
      {children}
    </>
  );
}