# SEO and content verification

Implemented in the existing JavaScript App Router project, using src/lib/seo.js and src/app/sitemap.js rather than introducing a TypeScript migration. Nothing has been deployed.

## Changes

- One registry covers all 32 page routes, metadata, menu entries, sitemap URLs, and article schema.
- Root metadata has no canonical, OG URL, keywords, or article dates. Every page exports its own buildMetadata call; client quizzes retain their interaction code behind server page wrappers.
- Production canonicals and OG URLs use https://ricepuritytestme.com. The kink page title is "Kink Rice Purity Test ? RicePurityTestMe".
- Next.js permanently redirects the www host to non-www, preserving the path and query string. The existing forwarded-HTTP redirect remains. No second nginx redirect configuration was added.
- The build checks that every page file is registered and declares metadata for its own route. An unknown getPage/buildMetadata path throws.
- The old public/sitemap.xml and unused metadata.js files were removed. /sitemap.xml is generated from the registry.
- FAQ answers render in native details elements, with JSON-LD generated from the same content array. Navigation links and all test/guide blog cards exist in the server HTML; pagination hides cards without removing their links. The blog excludes homepage, blog, about/contact, and legal-page cards as requested.
- The 14-year-olds quiz now has 20 non-sexual questions about school, friendships, crushes, hobbies, and phones. Its explanations and score ranges match the new questions. Unsupported teen average figures were removed. Per the latest instruction, it is indexable and included in the sitemap, blog, and menu.
- Corrected the homepage instruction: checked answers subtract points, not unchecked answers.
- Lists are excluded from content-visibility paint containment, which clipped outside bullets and numbers. Other offscreen rendering optimizations and existing analytics/AdSense loading strategies remain.

## Dates

See date-provenance.json for Git sources and commits. Publication dates are first-added Git dates as requested; known timestamp-only updates were excluded from modified dates. The newly rewritten teen page has no modified date yet: add its content commit date after it is committed. Unknown dates are omitted rather than using the build time.

## Verification completed

- npm run build: successful; all page routes statically generated.
- node scripts/check-seo.mjs http://127.0.0.1:3100: PASS, all 32 URLs.
- Checker covers unique canonical/title/description, OG/Twitter titles, robots, dates, schema parsing, sitemap coverage, robots.txt, FAQ HTML/schema agreement, menu/blog links, 404 metadata, and www redirects including a query string.
- scripts/browser-seo-smoke.cjs: PASS at 375px and 1280px for markers, teen scores 20/18/0, reset/retake, menus, pagination, overflow, and runtime errors. FAQ and link checks also pass with JavaScript disabled.
- scripts/browser-smoke.cjs: PASS at 375px, 768px, and 1280px for existing homepage scoring, reset/retake, keyboard input, print, FAQ, images, contact validation, and pre-JavaScript input.
- Focused ESLint: zero errors; two existing plain-img warnings in Header/blog.
- No new Lighthouse score was measured in this SEO pass. Earlier performance evidence is in ../performance/.

## Recheck and deploy

1. Run npm run build, then npm run start in another terminal.
2. Run node scripts/check-seo.mjs http://localhost:3000. Current local result: all 32 URLs pass.
3. Deploy through the site's existing hosting workflow.
4. Check https://www.ricepuritytestme.com/bdsm-test returns 301 or 308 to the non-www URL. The proxy must forward the original Host for the Next.js redirect to run; if it terminates www itself, implement the redirect there instead.
5. Verify the live kink page source has the non-www self-canonical and the title quoted above. Verify the rewritten teen questions and index, follow directive are live.
6. Resubmit sitemap.xml in Search Console and request indexing for the corrected pages. Monitor canonical exclusions over the next few weeks; indexing and ranking improvements are not guaranteed.

The earlier homepage country table still has no supplied source or reporting period. Its figures have not been given an invented attribution.
