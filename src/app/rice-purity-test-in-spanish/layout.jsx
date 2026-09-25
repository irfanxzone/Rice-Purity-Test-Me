import ArticleJsonLd, { getArticleTimestamp } from "@/components/ArticleJsonLd";
import { metadata as pageMetadata } from "./metadata";

const timestamp = getArticleTimestamp("rice-purity-test-in-spanish");
const image = {
  url: "https://ricepuritytestme.com/rice-purity-test-in-spanish.webp",
  alt: "Rice Purity Test in Spanish: 100-question test de pureza",
};

export const metadata = {
  ...pageMetadata,
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.alternates.canonical,
    type: "article",
    publishedTime: timestamp,
    modifiedTime: timestamp,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.title,
    description: pageMetadata.description,
    images: [image.url],
  },
};

export default function ArticleLayout({ children }) {
  return <><ArticleJsonLd slug="rice-purity-test-in-spanish" />{children}</>;
}
