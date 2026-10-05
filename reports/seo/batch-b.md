# Batch B: internal linking repair

## Prerequisite

Batch A was verified directly on https://ricepuritytestme.com before editing: /, /ao3-rice-purity-test, /kink-rice-purity-test, /mps-meaning-rice-purity-test, /blog, /ads.txt, the PNG touch icon, and a nonexistent URL. The live titles/schema, exact ads.txt publisher line, and single noindex on the 404 matched Batch A. A cached search-tool response was stale; the gate used fresh HTTP responses instead.

## Changes

- B0: Demoted the second H1 on the racism and Valorant pages to H2. Promoted the early Overwatch H3 to H2, preserving CSS classes.
- B0: Spanish now receives a server-rendered html lang="es". English and Spanish use route-group root layouts sharing SiteDocument, including the unchanged AdSense loader and fonts. Group folder names do not appear in URLs. All 32 existing public pages remain static. Crossing English/Spanish root layouts performs a full document navigation, verified in browser checks.
- A dedicated catch-all invokes the existing branded not-found component under the English root. Unknown paths still return HTTP 404 with one noindex; they are not added to the page registry or sitemap.
- B1: A server-rendered All Rice Purity Test Versions grid appears after the homepage content and before its footer. Its 25 links use the standardized registry titles. Cards use existing colors, border radii, and typography, with one/two/three responsive columns.
- B2: Every variant has a closing You may also like section inside main, with two or three curated sibling links. Spanish uses Spanish introductory wording. Anchors use descriptive page titles. Relationships live in src/data/related-tests.json; targets must be other registered variants.
- B3: Blog listing behavior/content is unchanged and still links all 25 variants.
- Route discovery, question-schema generation, and protected-code checks understand the URL-neutral route groups. Question generation also tolerates Windows checkout line endings.

## Verification

- npm run build: passed with zero errors; all 32 existing pages remain statically generated. Only unmatched-path handling is dynamic.
- scripts/check-batch-b.cjs: passed all 32 pages, source-language tags, requested heading outlines, 25 homepage links, 25 related sections, blog coverage, and representative 404s.
- The JavaScript-disabled crawl finds every variant one click from / and all 32 pages reachable. No orphan pages. See batch-b-results.json for page results and click depths.
- Responsive checks at 375px, 768px, and 1280px: correct grid columns, no horizontal overflow, English-to-Spanish and Spanish-to-English navigation with correct document language, and no runtime errors.
- scripts/check-batch-a.cjs: passed; original questions/weights, scoring handlers, homepage quiz files, and AdSense loader remain unchanged.
- scripts/check-seo.mjs: all 32 URLs pass, including canonicals, hreflang-related metadata coverage, sitemap, FAQ, blog links, and redirects.
- scripts/browser-smoke.cjs: existing homepage scoring, reset/retake, keyboard input, print, FAQ, images, contact validation, and no-JavaScript input pass across mobile/tablet/desktop.
- Focused lint: zero errors; one App Router shared-document warning for the retained native head element.
- Homepage first-load JavaScript remains 98.2 kB. Client variant pages add approximately 0.65 kB for the related-links component; the homepage grid adds no client component.

## Release

This batch is prepared on seo/batch-b-internal-links for one PR. Do not equate a branch push with a production deployment: this site's Vercel production deployment follows main. After merging/pushing main, repeat the crawl and check the live Spanish html lang attribute and all three corrected heading outlines.
