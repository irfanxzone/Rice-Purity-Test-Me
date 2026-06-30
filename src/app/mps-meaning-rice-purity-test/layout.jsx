import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

export const metadata = {
  openGraph: {
    type: "article",
    publishedTime: SEO_TIMESTAMP,
    modifiedTime: SEO_TIMESTAMP,
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
