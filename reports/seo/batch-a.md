# Batch A: template SEO fixes

Implemented against the supplied checklist. The named XLSX and audit Markdown were not present in this workspace or its Downloads parent.

## Acceptance results

- A1: WebPage schema is present on all 25 variant/guide pages. Quiz schema is present on the 21 actual quizzes, using their existing question text verbatim. AO3 has 100 questions; the 14-year-olds, virgins, and lesbian versions have 20, 65, and 76. The four guide-only pages have no fabricated quiz. This exception was explicitly confirmed by the user. Existing BlogPosting blocks remain, with the requested metadata wording/title changes flowing through the registry.
- A2-A5: AO3 has one H1; kink starts its question section with H2; the two MPS topics are H2s; Pages/Follow footer labels are styled paragraphs with their existing classes.
- A6: Homepage Article and one-item BreadcrumbList removed. Organization, WebPage, WebApplication, Quiz, and FAQPage remain.
- A7: All 32 pages use website for og:type. The registry's article category still controls which 25 pages appear in the blog; it is distinct from the Open Graph type.
- A8: Blog has one JSON-LD script containing CollectionPage and ItemList, with exactly 25 named, linked entries matching the cards.
- A9: Homepage and Spanish page have reciprocal English/Spanish hreflang links.
- A10: /ads.txt returns HTTP 200 with the exact requested publisher line.
- A11: Unknown routes return HTTP 404 and exactly one robots tag with noindex. The inherited root index/follow directive was removed; normal pages keep their own robots metadata.
- A12: All pages reference a 180x180 PNG Apple touch icon.
- A13: The two renamed image files and every source reference use performative-rice-purity-test.webp and question-69-mean.webp. Both return HTTP 200.
- A14: Removed original/official claims from page copy, badges, and metadata. Four occurrences remain only in protected quiz question text about relationships, Overwatch, and YouTubers. Questions were not edited.
- A15-A17: Variant page titles exactly match the 25 requested base titles and blog cards, without the brand suffix. The homepage title is evergreen. MPS/BDSM/blog descriptions match the supplied copy in description, OG, and Twitter tags.
- A18: Anchor casing normalized and the homepage checklist-preview image alt updated.

## Verified locally

- npm run build: zero errors; all pages statically generated.
- node scripts/check-seo.mjs http://127.0.0.1:3100: all 32 URLs pass.
- scripts/check-batch-a.cjs: all 32 rendered pages pass, including source-visible question/schema parity, requested heading order, footer semantics, hreflang, descriptions, titles, 25 blog entries, assets, and 404 robots. Machine-readable results: batch-a-results.json.
- Protected-source comparison against 9ac9707: every question array, weight, scoring handler, homepage quiz implementation, and AdSense loader is unchanged. FAQ copy is treated as page content, not scoring logic.
- Existing homepage browser smoke checks pass at 375px, 768px, and 1280px, including scores, reset/retake, keyboard input, FAQ, images, print, and pre-JavaScript input.
- Homepage first-load JavaScript remains 98.2 kB in the production build. Generated quiz-schema data stays in the server-rendered layout.

## Google validation and release

Local schema/HTML checks are not a Google Rich Results Test approval. Google's documented Quiz rich-result feature is for educational flashcards with question/answer pairs, not these self-assessment questionnaires:
https://developers.google.com/search/docs/appearance/structured-data/education-qa
No fabricated answers or Flashcard labels were added to imply eligibility. Run Google's live test after deployment, and interpret any educational-Q&A eligibility result separately from the verified 100-question AO3 schema.

After deployment, verify /, /ao3-rice-purity-test, /kink-rice-purity-test, /mps-meaning-rice-purity-test, /blog, /ads.txt, and a nonexistent URL. Production deployment and the live Google test are separate from the completed local checks.

Release status: committed on seo/batch-a-template-fixes. GitHub publishing failed because no credential was available (could not read Username; terminal prompts disabled), so no remote PR or main/Vercel deployment was performed. The user confirmed main pushes automatically deploy to Vercel. Google Rich Results Test was attempted in code mode with the built AO3 HTML, but returned "Something went wrong. Log in and try again." See batch-a-google-test.txt; external validation remains pending.
