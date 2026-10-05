The shared SEO template lacked quiz/page schema, inherited an indexing directive on 404s, and emitted article Open Graph types on tools. Batch A fixes the metadata, heading, footer, hreflang, blog schema, ads.txt, touch icon, image filenames, and requested wording/title issues without changing quiz behavior or the visual design.

Quiz schema is generated from existing question literals: 21 quizzes retain their actual counts and questions, and four guide-only pages receive WebPage schema only. This departure from the checklist's assumed 25 ? 100 questions was confirmed by the user. All 25 variant/guide cards remain in the blog, with exact matching titles. Existing BlogPosting schema is retained.

Validation: production build passes; all 32 URLs pass SEO checks; Batch A rendered-HTML checks pass; protected-source checks confirm questions, weights, scoring handlers, and AdSense loading are unchanged; homepage browser checks pass at mobile/tablet/desktop sizes.

Google's Quiz rich results target educational flashcards; local schema checks do not claim Google rich-result eligibility. See reports/seo/batch-a.md for acceptance details and release spot checks.
