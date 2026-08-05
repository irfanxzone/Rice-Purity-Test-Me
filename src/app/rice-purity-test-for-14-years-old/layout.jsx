import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "Rice Purity Test for 14 Years Old";
const description = "A safe, relatable purity test for teens with 20 questions tailored to 14-year-olds.";
const image = {
  url: "https://www.ricepuritytestme.com/rice-purity-test-for-14-years-old.webp",
  width: 1200,
  height: 630,
  alt: "Rice Purity Test for 14 Years Old teen quiz featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/rice-purity-test-for-14-years-old",
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
      <ArticleJsonLd slug="rice-purity-test-for-14-years-old" />
      {children}
    </>
  );
}