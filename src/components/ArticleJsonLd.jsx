import quizQuestions from "@/data/quiz-schema.json";
import { getPage, SITE_URL, SITE_NAME } from "@/lib/seo";

export default function ArticleJsonLd({ slug }) {
  const page = getPage(`/${slug}`);
  const url = new URL(page.path, SITE_URL).href;
  const organization = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: page.title, description: page.description, url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(page.image ? { image: new URL(page.image, SITE_URL).href } : {}),
    ...(page.published ? { datePublished: page.published } : {}),
    ...(page.modified ? { dateModified: page.modified } : {}),
    author: organization, publisher: organization,
  };
  const questions = quizQuestions[page.path];
  const webpageId = url + '#webpage';
  const quizId = url + '#quiz';
  const graph = [{
    '@type': 'WebPage', '@id': webpageId, url,
    name: page.title, description: page.description,
    ...(questions ? { mainEntity: { '@id': quizId } } : {}),
  }];
  if (questions) graph.push({
    '@type': 'Quiz', '@id': quizId,
    name: page.title, headline: page.title, description: page.description,
    url: url + '#test', mainEntityOfPage: { '@id': webpageId },
    educationalUse: 'Self assessment', learningResourceType: 'Quiz',
    numberOfQuestions: questions.length, isAccessibleForFree: true,
    provider: organization,
    hasPart: questions.map((question, index) => ({
      '@type': 'Question', position: index + 1, name: question,
    })),
  });
  const serialize = value => JSON.stringify(value).replace(/</g, '\u003c');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize({ '@context': 'https://schema.org', '@graph': graph }) }} />
    </>
  );
}
