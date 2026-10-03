# Performance verification ? 2026-10-03

The final production build retains AdSense and Google Analytics. One completed Lighthouse mobile run scored 94 with both script downloads verified complete (HTTP 200, finished request, nonzero resource size). Accessibility and SEO scored 100. Best Practices was 77 because of Google advertising cookie issues.

Later runs returned 98?99 mobile and 100 desktop while Google script requests remained unfinished. Those scores are invalid for the requested scripts-enabled comparison and are excluded. Fresh browser sessions did not resolve the network stalls. The 94 is a single valid local measurement, not a repeatable median, deployed PageSpeed result, or competitor benchmark. The previous verified desktop score of 100 predates the final checkbox simplification.

| Measure | Previous build: median of 3 mobile runs | Final build: 1 completed mobile run |
| --- | ---: | ---: |
| Performance score | 91 | 94 |
| first-contentful-paint | 1.82 s | 1.37 s |
| largest-contentful-paint | 2.47 s | 2.24 s |
| total-blocking-time | 335 ms | 239 ms |
| cumulative-layout-shift | 0.001 | 0.001 |

Implementation savings are independent of the fluctuating audit scores:

- Homepage page-specific JavaScript: 4.67 kB ? 1.8 kB (about 61% smaller). Total first-load JavaScript: 101 kB ? 98.2 kB.
- Font transfer: 72,431 ? 40,791 bytes. Small labels and question numbers now use device-native monospace; Poppins headings and body text are retained.
- Removed 300 decorative checkbox elements. The actual inputs are visible native checkboxes, with CSS ticks and a forced-colors fallback.
- All 100 questions are server-rendered. Selection works before JavaScript loads and does not trigger React rerenders. A small delegated handler handles calculate and clear; result code stays deferred. Answers are counted locally and never submitted through a form.
- Offscreen question rows defer layout with content-visibility while remaining in the DOM. Print overrides restore normal layout.
- Existing hashed responsive WebP images, cache headers, static article/FAQ content, and localized toast renderers remain.
- AdSense and Analytics continue to use lazyOnload; this pass did not add arbitrary script delays, block script requests, change publisher IDs, or remove either service.

Validation: production build passed; changed-component Next.js ESLint checks passed; git diff --check passed. Browser checks passed at 375, 768, and 1280 px for native keyboard selection, visible checkmark, scores 98/100, 99/100, 100/100, and 0/100, reset, retake, last-question scrolling, copy notification, print layout, FAQ expansion, images, no horizontal overflow, and no page JavaScript exceptions. Contact validation and checkbox selection with JavaScript disabled also passed. Mobile checked/unchecked screenshots were visually inspected. All 32 prerendered routes returned HTTP 200 after the shared font change; all 100 questions and valid structured data remain in server HTML.

Audit evidence: verified-script-enabled-runs.json contains the completed final run. before-native-quiz.json contains the previous comparison. lighthouse-summary.json contains the latest attempted fresh-browser batch, with validWithScripts=false for its unfinished network runs. incomplete-network-runs.json and shared-browser-network-runs.json preserve intermediate diagnostics. Do not aggregate invalid rows into a reported score.

Rerun: npm run build, then node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3100. Run node scripts/browser-smoke.cjs and node scripts/audit-performance.cjs sequentially. These verification scripts require Chrome, Playwright, and Lighthouse. This session used cached tooling outside the repository; set PLAYWRIGHT_MODULE and LIGHTHOUSE_MODULE to their installed module paths if necessary. TEST_URL overrides the URL. The audit uses a fresh browser per run, performs five mobile runs and one desktop run, records each script completion, and returns a nonzero status if either script remains unfinished. Full Lighthouse JSON is written to the system temporary directory.

Image variants regenerate automatically during npm run build, or with node scripts/optimize-images.cjs. Commit public/optimized and src/data/optimized-images.json alongside the component changes. Hashed filenames allow immutable caching without stale replacements.

No deployment was performed. A deployed audit is still needed to include hosting/CDN latency and establish repeatable results with Google requests completing. No competitor sites were benchmarked.

Sources: [Lighthouse variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md), [Next.js script scheduling](https://nextjs.org/docs/14/app/api-reference/components/script).
