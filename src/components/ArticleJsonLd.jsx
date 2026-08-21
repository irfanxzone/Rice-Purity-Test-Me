export const SEO_TIMESTAMP = "2026-08-21T10:40:32+05:00";

const ARTICLES = {
  "gay-rice-purity-test": {
    title: "Gay Rice Purity Test",
    description: "The gay rice purity test is a complete checklist of 100 questions that revolve around queer life instead of straight life.",
    image: "https://www.ricepuritytestme.com/gay-rice-purity-test.webp",
  },
  "nyu-rice-purity-test": {
    title: "NYU rice purity test",
    description: "The NYU Rice Purity Test is specially designed for NYU students.",
    image: "https://www.ricepuritytestme.com/NYU-rice-purity-test.webp",
  },
  "question-69-mean": {
    title: "What is Question 69 on the Rice Purity test",
    description: "If you have ever taken the Rice Purity Test, you might have wondered what question 69 means.",
    image: "https://www.ricepuritytestme.com/Questio-69-mean.webp",
  },
  "ai-purity-test": {
    title: "AI Purity Test 2026",
    description: "AI Purity Test is a self-assessment or self-graded quiz that measures the person's relationship with AI.",
    image: "https://www.ricepuritytestme.com/AI-purity-test.webp",
  },
  "byu-rice-purity-test": {
    title: "BYU Rice Purity Test",
    description: "The BYU Rice Purity Test is an updated and a customized version of the original Rice Purity Test.",
    image: "https://www.ricepuritytestme.com/BYU-rice-purity-test.webp",
  },
  "bdsm-test": {
    title: "Updated BDSM Test 2026",
    description: "The BDSM Test is a unique and modern way to check how kinky you really are.",
    image: "https://www.ricepuritytestme.com/BDSM-test.webp",
  },
  "76-rice-purity-test": {
    title: "76 Rice Purity Test",
    description: "If you have taken the Rice Purity Test and scored 76, you might be wondering what this score means or what it says about your personality.",
    image: "https://www.ricepuritytestme.com/76-rice-purity-test.webp",
  },
  "ao3-rice-purity-test": {
    title: "AO3 Rice Purity Test",
    description: "A fun and interactive fandom purity score quiz for AO3 and fanfiction lovers.",
    image: "https://www.ricepuritytestme.com/ao3-rice-purity-test.webp",
  },
  "brown-rice-purity-test": {
    title: "Brown Rice Purity Test 2026",
    description: "A playful food-themed quiz that gives the Rice Purity Test a funny brown rice twist.",
    image: "https://www.ricepuritytestme.com/brown-rice-purity-test.webp",
  },
  "fortnite-rice-purity-test": {
    title: "Fortnite Rice Purity Test 2026",
    description: "Are you a Fortnite player who wants to check how pure your Fortnite habits are?",
    image: "https://www.ricepuritytestme.com/Fortnite-rice-purity-test.webp",
  },
  "kink-rice-purity-test": {
    title: "Kink Rice Purity Test 2026",
    description: "A personal, age-specific 100-question test exploring preferences, boundaries, and consent.",
    image: "https://www.ricepuritytestme.com/kink-rice-purity-test.webp",
  },
  "rice-purity-test-for-girls": {
    title: "Rice Purity Test for Girls 2026",
    description: "The Rice Purity Test for Girls is not just a quiz for many girls; it serves as a mirror reflecting what they experienced, avoided, and learned throughout their lives.",
    image: "https://www.ricepuritytestme.com/rice-purity-test-for-girls.webp",
  },
  "mps-meaning-rice-purity-test": {
    title: "MPS Meaning Rice Purity Test",
    description: "Learn what MPS means in the Rice Purity Test and how to answer related questions honestly.",
    image: "https://www.ricepuritytestme.com/mps-meaning-purity-test.webp",
  },
  "overwatch-rice-purity-test": {
    title: "Overwatch Rice Purity Test 2026",
    description: "Check your Overwatch habits and community personality with this 100-question gaming quiz.",
    image: "https://www.ricepuritytestme.com/overwatch-rice-purity-test.webp",
  },
  "performative-rice-purity-test": {
    title: "Performative Rice Purity Test 2026",
    description: "The Performative Rice Purity Test is a modern trend that started on social media, where purity is no longer the subject.",
    image: "https://www.ricepuritytestme.com/perfprmative-rice-purity-test.webp",
  },
  "racism-rice-purity-test": {
    title: "The Racism Rice Purity Test 2026",
    description: "Check your racial bias and self-awareness with this 100-question anonymous test.",
    image: "https://www.ricepuritytestme.com/Racism-rice-purity-test.webp",
  },
  "rice-purity-test-for-14-years-old": {
    title: "Rice Purity Test for 14 Years Old",
    description: "A safe, relatable purity test for teens with 20 questions tailored to 14-year-olds.",
    image: "https://www.ricepuritytestme.com/rice-purity-test-for-14-years-old.webp",
  },
  "rice-purity-test-for-teens": {
    title: "Rice Purity Test for Teens 2026",
    description: "The Rice Purity Test for teens is an age-specific version of the famous Purity Test, which young people take for fun, curiosity, and self-reflection.",
    image: "https://www.ricepuritytestme.com/rice-purity-test-for-teens.webp",
  },
  "tests-like-rice-purity-test": {
    title: "Tests Like the Rice Purity Test in 2026",
    description: "Try popular tests like the Rice Purity Test, compare scores with friends, and discover surprising results.",
    image: "https://www.ricepuritytestme.com/tests-like-rice-purity-test.webp",
  },
  "valorant-rice-purity-test": {
    title: "Valorant Rice Purity Test",
    description: "A parody of the official rice purity test, but for Valorant players.",
    image: "https://www.ricepuritytestme.com/valorant-rice-purity-test.webp",
  },
  "weighted-rice-purity-test": {
    title: "Weighted Rice Purity Test | Rice Purity Quiz",
    description: "Try the Weighted Rice Purity Test: a more realistic 100-question purity score with weighted scoring and deeper meaning.",
    image: "https://www.ricepuritytestme.com/weighted-rice-purity-test.webp",
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
    image: article.image,
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
        {article.image && <meta itemProp="image" content={article.image} />}
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
