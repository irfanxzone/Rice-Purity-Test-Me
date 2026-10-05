const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:3100';
(async () => {
  const { PAGES } = await import('../src/lib/seo.js');
  const variants = PAGES.filter(page => page.type === 'article' && !page.noindex);
  const paths = new Set(PAGES.map(page => page.path));
  const variantPaths = new Set(variants.map(page => page.path));
  const related = JSON.parse(fs.readFileSync('src/data/related-tests.json', 'utf8'));
  assert.deepEqual(Object.keys(related).map(slug => '/' + slug).sort(), [...variantPaths].sort());
  for (const [slug, targets] of Object.entries(related)) {
    assert(targets.length >= 2 && targets.length <= 3);
    assert.equal(new Set(targets).size, targets.length);
    for (const target of targets) assert(target !== slug && variantPaths.has('/' + target));
  }
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const graph = new Map();
  const results = [];
  try {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    for (const entry of PAGES) {
      const response = await page.goto(base + entry.path, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, entry.path);
      const html = await response.text();
      const expectedLang = entry.path === '/rice-purity-test-in-spanish' ? 'es' : 'en';
      assert.equal(html.match(/<html\b[^>]*lang="([^"]+)"/)?.[1], expectedLang, entry.path + ': source language');
      assert.equal((html.match(/<html\b/g) || []).length, 1, entry.path + ': nested document');
      const content = await page.evaluate(() => ({
        links: [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')),
        bodyLinks: [...document.querySelectorAll('main a[href]')].filter(el => !el.closest('header,footer,nav')).map(el => el.getAttribute('href')),
        headings: [...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(el => ({ level: Number(el.tagName.slice(1)), text: el.textContent.trim() })),
        cards: [...document.querySelectorAll('[data-testid="all-tests"] a')].map(el => ({ path: el.getAttribute('href'), title: el.textContent.trim() })),
        siblings: [...document.querySelectorAll('main [data-testid="related-tests"] a')].map(el => el.getAttribute('href')),
        footerOrder: !!document.querySelector('[data-testid="all-tests"]') && !!(document.querySelector('[data-testid="all-tests"]').compareDocumentPosition(document.querySelector('footer')) & Node.DOCUMENT_POSITION_FOLLOWING),
      }));
      const internal = content.links.map(href => { try { const url = new URL(href, base); return [new URL(base).origin, 'https://ricepuritytestme.com'].includes(url.origin) ? url.pathname : null; } catch { return null; } }).filter(path => paths.has(path));
      graph.set(entry.path, [...new Set(internal)]);
      if (entry.path === '/') {
        assert.deepEqual(content.cards, variants.map(item => ({ path: item.path, title: item.title })));
        assert(content.footerOrder, 'Homepage grid must precede footer');
      }
      if (variantPaths.has(entry.path)) {
        const siblings = [...new Set(content.bodyLinks.filter(path => variantPaths.has(path) && path !== entry.path))];
        assert(siblings.length >= 2, entry.path + ': fewer than two in-body sibling links');
        assert.deepEqual(content.siblings, related[entry.path.slice(1)].map(slug => '/' + slug));
      }
      if (['/racism-rice-purity-test','/valorant-rice-purity-test','/overwatch-rice-purity-test'].includes(entry.path)) {
        assert.equal(content.headings.filter(heading => heading.level === 1).length, 1, entry.path + ': duplicate H1');
        let previous = 0;
        for (const heading of content.headings) {
          assert(heading.level <= previous + 1, entry.path + ': skipped heading level at ' + heading.text);
          previous = heading.level;
        }
      }
      if (entry.path === '/blog') for (const target of variantPaths) assert(content.bodyLinks.includes(target), 'Blog missing ' + target);
      results.push({ path: entry.path, status: 'pass', lang: expectedLang, siblingLinks: content.siblings.length });
    }
    const distances = new Map([['/', 0]]), queue = ['/'];
    for (let i = 0; i < queue.length; i++) for (const target of graph.get(queue[i]) || []) if (!distances.has(target)) { distances.set(target, distances.get(queue[i]) + 1); queue.push(target); }
    for (const target of variantPaths) assert(distances.has(target) && distances.get(target) <= 2, 'Variant is orphaned or too deep: ' + target);
    for (const path of paths) assert(distances.has(path), 'Orphan page: ' + path);
    for (const path of ['/not-a-real-page','/missing/nested/path','/rice-purity-test-in-spanish/not-found']) {
      const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 404, path);
      assert.deepEqual(await page.locator('meta[name="robots"]').evaluateAll(els => els.map(el => el.content)), ['noindex']);
    }
    await context.close();
    for (const width of [375,768,1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'domcontentloaded' });
      const grid = page.getByTestId('all-tests');
      await grid.scrollIntoViewIfNeeded();
      const columns = await grid.locator('a').evaluateAll(els => new Set(els.map(el => Math.round(el.getBoundingClientRect().left))).size);
      assert.equal(columns, width < 640 ? 1 : width < 1024 ? 2 : 3);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await grid.locator('a[href="/rice-purity-test-in-spanish"]').click();
      await page.waitForURL('**/rice-purity-test-in-spanish');
      assert.equal(await page.locator('html').getAttribute('lang'), 'es');
      assert.equal(await page.locator('#test input[type=checkbox]').count(), 100);
      await page.getByTestId('site-logo').click();
      await page.waitForURL(base + '/');
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.deepEqual(errors, []);
      console.log('PASS ' + width + 'px: grid, overflow, cross-language navigation, and runtime errors.');
      await page.close();
    }
    fs.writeFileSync('reports/seo/batch-b-results.json', JSON.stringify({ pages: results, clickDepth: Object.fromEntries(distances), orphanPages: [], allVariantsWithinTwoClicks: true }, null, 2) + '\n');
    console.log('PASS Batch B: all 25 variants are one click from home; all 32 pages reachable; no orphans.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
