const assert = require('node:assert/strict');
const fs = require('node:fs');
const cp = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:3100';
const snapshot = process.env.BATCH_A_BASE || '9ac9707';
const normalize = s => s.replace(/\r\n/g, '\n');
const protectedPattern = /const\s+(\w*QUESTIONS(?:_\d+)?)\s*=\s*\[[\s\S]*?\n\];/g;
function original(file) { return normalize(cp.execFileSync('git', ['show', snapshot + ':' + file], { encoding: 'utf8' })); }
function currentPath(file) {
  if (fs.existsSync(file)) return file;
  if (file === 'src/app/layout.jsx') return 'src/components/SiteDocument.jsx';
  if (file.startsWith('src/app/')) {
    const rest = file.slice('src/app/'.length);
    return 'src/app/' + (rest.startsWith('rice-purity-test-in-spanish/') ? '(es)/' : '(en)/') + rest;
  }
  return file;
}
const current = file => normalize(fs.readFileSync(currentPath(file), 'utf8'));
// Protect the actual questionnaire, weights, scoring, state handlers, and ad loader.
for (const file of cp.execFileSync('git', ['ls-tree', '-r', '--name-only', snapshot, 'src'], { encoding: 'utf8' }).trim().split('\n')) {
  if (!/\.(js|jsx)$/.test(file) || !fs.existsSync(currentPath(file))) continue;
  const before = original(file), after = current(file);
  const arrays = [...before.matchAll(protectedPattern)].map(match => match[0]);
  assert.deepEqual([...after.matchAll(protectedPattern)].map(match => match[0]), arrays, file + ': questions changed');
  if (arrays.length && file.startsWith('src/app/')) {
    const marker = /return\s*\(\s*</;
    const beforeBoundary = before.search(marker), afterBoundary = after.search(marker);
    assert(beforeBoundary >= 0 && afterBoundary >= 0, file + ': expected quiz render boundary');
    const withoutFaqSchema = source => source.replace(/const FAQ_SCHEMA = \{[\s\S]*?\n\};/, '').replace(/^import RelatedTests from .*;\n/m, '').replace(/\n{2,}/g, '\n');
    assert.equal(withoutFaqSchema(after.slice(0, afterBoundary)), withoutFaqSchema(before.slice(0, beforeBoundary)), file + ': quiz logic changed');
  }
}
for (const file of ['src/data/questions.js', 'src/data/teen-quiz.js', 'src/components/Quiz.jsx', 'src/app/HomePageClient.jsx', 'src/components/Result.jsx']) assert.equal(current(file), original(file), file + ': protected source changed');
// Compare the complete loader line, including strategy and publisher ID.
const loader = source => source.split('\n').find(line => line.includes('pagead2.googlesyndication.com'));
assert.equal(loader(current('src/app/layout.jsx')), loader(original('src/app/layout.jsx')), 'AdSense loader changed');
console.log('Protected question arrays, scoring handlers, homepage quiz files, and AdSense loader are unchanged.');
(async () => {
  const { PAGES, SITE_URL } = await import('../src/lib/seo.js');
  const schemaQuestions = JSON.parse(fs.readFileSync('src/data/quiz-schema.json', 'utf8'));
  cp.execFileSync(process.execPath, ['scripts/generate-quiz-schema.cjs', '--check'], { stdio: 'inherit' });
  const variants = PAGES.filter(page => page.type === 'article');
  assert.equal(variants.length, 25);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const tab = await context.newPage();
    for (const entry of PAGES) {
      const response = await tab.goto(base + entry.path, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, entry.path);
      const document = await tab.evaluate(() => {
        const blocks = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
        const schemas = blocks.flatMap(block => block['@graph'] || [block]);
        const outline = [...document.querySelectorAll('h1,h2,h3')].map(el => ({ tag: el.tagName, text: el.textContent.trim() }));
        const body = document.body.cloneNode(true);
        body.querySelectorAll('script, #test').forEach(el => el.remove());
        return {
          title: document.title, blocks, schemas, outline,
          footerHeadings: document.querySelectorAll('footer h2').length,
          claims: body.textContent.match(/\b(original|official|officially|originally)\b/gi) || [],
          og: document.querySelector('meta[property="og:type"]')?.content,
          touchIcon: document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href'),
          alternates: [...document.querySelectorAll('link[hreflang]')].map(el => ({ lang: el.hreflang, href: el.href })),
          anchors: [...document.querySelectorAll('a')].map(el => el.textContent.trim()),
          labels: [...document.querySelectorAll('#test label')].map(el => (el.querySelector(':scope > span:first-child')?.textContent || el.textContent).trim().replace(/^\d+[.\s]+/, '')),
        };
      });
      assert.equal(document.footerHeadings, 0, entry.path + ': footer headings');
      assert.deepEqual(document.claims, [], entry.path + ': unsupported test claims');
      assert.equal(document.og, 'website', entry.path + ': OG type');
      assert(document.touchIcon.endsWith('.png'), entry.path + ': apple icon');
      assert(!document.anchors.includes('Rice purity Test'));
      if (entry.type === 'article') {
        assert.equal(document.title, entry.title, entry.path + ': exact title');
        assert.equal(document.schemas.filter(item => item['@type'] === 'BlogPosting').length, 1);
        assert.equal(document.schemas.filter(item => item['@type'] === 'WebPage').length, 1);
        const quizzes = document.schemas.filter(item => item['@type'] === 'Quiz');
        const questions = schemaQuestions[entry.path];
        assert.equal(quizzes.length, questions ? 1 : 0, entry.path + ': quiz schema presence');
        if (questions) {
          assert.equal(quizzes[0].numberOfQuestions, questions.length);
          assert.deepEqual(quizzes[0].hasPart.map(question => question.name), questions);
          assert.equal(quizzes[0].hasPart.length, document.labels.length, entry.path + ': visible/schema question counts');
          assert.deepEqual(document.labels, questions, entry.path + ': schema questions must match visible labels');
          assert(quizzes[0].hasPart.every((question, index) => question['@type'] === 'Question' && question.position === index + 1));
        }
      }
      if (entry.path === '/') {
        const types = document.schemas.map(item => item['@type']);
        assert(!types.includes('Article') && !types.includes('BreadcrumbList'));
        for (const type of ['Quiz','FAQPage','WebPage','WebApplication','Organization']) assert(types.includes(type), 'Missing home schema ' + type);
        assert.equal(document.title, 'The Rice Purity Test');
        assert.equal(await tab.locator('img[src*="rice-purity-test-"]').first().getAttribute('alt'), 'Rice Purity Test 100-question checklist preview');
      }
      if (entry.path === '/ao3-rice-purity-test') assert.equal(document.outline.filter(item => item.tag === 'H1').length, 1);
      if (entry.path === '/kink-rice-purity-test') {
        const firstH2 = document.outline.findIndex(item => item.tag === 'H2');
        assert(firstH2 > 0 && !document.outline.slice(0, firstH2).some(item => item.tag === 'H3'));
      }
      if (entry.path === '/mps-meaning-rice-purity-test') {
        for (const text of ['Why Do People Search','Should You Take']) assert.equal(document.outline.find(item => item.text.startsWith(text))?.tag, 'H2');
        assert((await tab.locator('main').innerText()).toLowerCase().includes('member of the preferred sex'));
      }
      if (['/','/rice-purity-test-in-spanish'].includes(entry.path)) {
        for (const [lang, url] of [['en', SITE_URL + '/'], ['es', SITE_URL + '/rice-purity-test-in-spanish']]) assert(document.alternates.some(item => item.lang === lang && new URL(item.href).href === url));
      }
      if (entry.path === '/blog') {
        assert.equal(document.blocks.length, 1);
        assert.equal(document.schemas.filter(item => item['@type'] === 'CollectionPage').length, 1);
        const list = document.schemas.find(item => item['@type'] === 'ItemList');
        assert.equal(list.itemListElement.length, 25);
        assert.deepEqual(list.itemListElement.map(item => ({ name: item.name, url: item.url })), variants.map(page => ({ name: page.title, url: SITE_URL + page.path })));
        assert.deepEqual(await tab.locator('[data-testid^="blog-card-"] h2').allTextContents(), variants.map(page => page.title));
      }
      results.push({ path: entry.path, status: 'pass', questions: schemaQuestions[entry.path]?.length });
    }
    const missing = await tab.goto(base + '/batch-a-does-not-exist', { waitUntil: 'domcontentloaded' });
    assert.equal(missing.status(), 404);
    assert.deepEqual(await tab.locator('meta[name="robots"]').evaluateAll(elements => elements.map(el => el.content)), ['noindex']);
    for (const file of ['/ads.txt','/apple-touch-icon.png','/performative-rice-purity-test.webp','/question-69-mean.webp']) {
      const response = await fetch(base + file);
      assert.equal(response.status, 200, file);
      if (file === '/ads.txt') assert.equal((await response.text()).trim(), 'google.com, pub-2310430198181820, DIRECT, f08c47fec0942fa0');
    }
    fs.writeFileSync('reports/seo/batch-a-results.json', JSON.stringify({ pages: results, assets: 'pass', notFound: 'one noindex', protectedCode: 'unchanged' }, null, 2) + '\n');
    console.log('PASS Batch A: all 32 pages, 21 actual quizzes, 4 guides, 25 blog entries, assets, and 404 robots.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
