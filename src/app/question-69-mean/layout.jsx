import ArticleJsonLd, { SEO_TIMESTAMP } from "@/components/ArticleJsonLd";

const title = "What is Question 69 on the Rice Purity test";
const description = "If you have ever taken the Rice Purity Test, you might have wondered what question 69 means.";
const image = {
  url: "https://www.ricepuritytestme.com/Questio-69-mean.webp",
  width: 1200,
  height: 630,
  alt: "Question 69 Rice Purity Test meaning guide featured image",
};

export const metadata = {
  openGraph: {
    title,
    description,
    url: "https://www.ricepuritytestme.com/question-69-mean",
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
      <ArticleJsonLd slug="question-69-mean" />
      {children}
    </>
  );
}