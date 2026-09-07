import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Valorant Rice Purity Test for Players";
const description = "Do you want to check how familiar you are with Valorant's in-game habits, memorable experiences, and everyday gameplay? Take this test.";
const image = {
  url: "https://ricepuritytestme.com/valorant-rice-purity-test.webp",
  width: 1200,
  height: 630,
  alt: "Valorant Rice Purity Test gaming quiz featured image",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://ricepuritytestme.com/valorant-rice-purity-test" },
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/valorant-rice-purity-test",
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