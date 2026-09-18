import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";

const SEO_TIMESTAMP = getArticleTimestamp("rice-purity-test-for-virgins");

const title = "Rice Purity Test For virgins 2026";
const description = "Rice Purity Test for virgins is a special variant that is made for those who do not need sexual experience or have never had it before.";
const image = {
  url: "https://ricepuritytestme.com/rice-purity-test-for-virgin.webp",
  alt: "Rice Purity Test for Virgins: 65-question personal experiences quiz",
};

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://ricepuritytestme.com/rice-purity-test-for-virgins" },
  openGraph: {
    title,
    description,
    url: "https://ricepuritytestme.com/rice-purity-test-for-virgins",
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
      <ArticleJsonLd slug="rice-purity-test-for-virgins" />
      {children}
    </>
  );
}
