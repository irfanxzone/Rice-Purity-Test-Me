export const SEO_TIMESTAMP = "2026-07-17T02:47:37+05:00";

const ARTICLES = {
  "nyu-rice-purity-test": {
    title: "NYU rice purity test",
    description: "The NYU Rice Purity Test is specially designed for NYU students.",
  },
  "question-69-mean": {
    title: "What is Question 69 on the Rice Purity test",
    description: "If you have ever taken the Rice Purity Test, you might have wondered what question 69 means.",
  },
  "ai-purity-test": {
    title: "AI Purity Test 2026",
    description: "AI Purity Test is a self-assessment or self-graded quiz that measures the person's relationship with AI.",
  },
  "byu-rice-purity-test": {
    title: "BYU Rice Purity Test",
    description: "The BYU Rice Purity Test is an updated and a customized version of the original Rice Purity Test.",
  },
  "bdsm-test": {
    title: "Updated BDSM Test 2026",
    description: "The BDSM Test is a unique and modern way to check how kinky you really are.",
  },
  "76-rice-purity-test": {
    title: "76 Rice Purity Test",
    description: "If you have taken the Rice Purity Test and scored 76, you might be wondering what this score means or what it says about your personality.",
  },
  "ao3-rice-purity-test": {
    title: "AO3 Rice Purity Test",
    description: "A fun and interactive fandom purity score quiz for AO3 and fanfiction lovers.",
  },
  "brown-rice-purity-test": {
    title: "Brown Rice Purity Test 2026",
    description: "A playful food-themed quiz that gives the Rice Purity Test a funny brown rice twist.",
  },
  "fortnite-rice-purity-test": {
    title: "Fortnite Rice Purity Test 2026",
    description: "Are you a Fortnite player who wants to check how pure your Fortnite habits are?",
  },
  "kink-rice-purity-test": {
    title: "Kink Rice Purity Test 2026",
    description: "A personal, age-specific 100-question test exploring preferences, boundaries, and consent.",
  },
  "rice-purity-test-for-girls": {
    title: "Rice Purity Test for Girls 2026",
    description: "The Rice Purity Test for Girls is not just a quiz for many girls; it serves as a mirror reflecting what they experienced, avoided, and learned throughout their lives.",
  },
  "mps-meaning-rice-purity-test": {
    title: "MPS Meaning Rice Purity Test",
    description: "Learn what MPS means in the Rice Purity Test and how to answer related questions honestly.",
  },
  "overwatch-rice-purity-test": {
    title: "Overwatch Rice Purity Test 2026",
    description: "Check your Overwatch habits and community personality with this 100-question gaming quiz.",
  },
  "performative-rice-purity-test": {
    title: "Performative Rice Purity Test 2026",
    description: "The Performative Rice Purity Test is a modern trend that started on social media, where purity is no longer the subject.",
  },
  "racism-rice-purity-test": {
    title: "The Racism Rice Purity Test 2026",
    description: "Check your racial bias and self-awareness with this 100-question anonymous test.",
  },
  "rice-purity-test-for-14-years-old": {
    title: "Rice Purity Test for 14 Years Old",
    description: "A safe, relatable purity test for teens with 20 questions tailored to 14-year-olds.",
  },
  "rice-purity-test-for-teens": {
    title: "Rice Purity Test for Teens 2026",
    description: "The Rice Purity Test for teens is an age-specific version of the famous Purity Test, which young people take for fun, curiosity, and self-reflection.",
  },
  "tests-like-rice-purity-test": {
    title: "Tests Like the Rice Purity Test in 2026",
    description: "Try popular tests like the Rice Purity Test, compare scores with friends, and discover surprising results.",
  },
  "valorant-rice-purity-test": {
    title: "Valorant Rice Purity Test",
    description: "A parody of the official rice purity test, but for Valorant players.",
  },
  "weighted-rice-purity-test": {
    title: "Weighted Rice Purity Test | Rice Purity Quiz",
    description: "Try the Weighted Rice Purity Test: a more realistic 100-question purity score with weighted scoring and deeper meaning.",
  },
};

export default function ArticleJsonLd({ slug }) {
  const article = ARTICLES[slug];
  if (!article) return null;

  const url = `https://ricepuritytestme.com/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: SEO_TIMESTAMP,
    dateModified: SEO_TIMESTAMP,
    author: {
      "@type": "Organization",
      name: "Rice Purity Test",
      url: "https://ricepuritytestme.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Rice Purity Test",
      url: "https://ricepuritytestme.com/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="sr-only" itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={article.title} />
        <meta itemProp="description" content={article.description} />
        <meta itemProp="url" content={url} />
        <time itemProp="datePublished" dateTime={SEO_TIMESTAMP}>
          Published {SEO_TIMESTAMP}
        </time>
        <time itemProp="dateModified" dateTime={SEO_TIMESTAMP}>
          Modified {SEO_TIMESTAMP}
        </time>
      </div>
    </>
  );
}
