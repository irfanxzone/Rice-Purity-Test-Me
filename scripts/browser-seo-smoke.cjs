const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:3100';
(async () => {
  const { PAGES } = await import('../src/lib/seo.js');
  const blogPaths = PAGES.filter(page => !page.noindex && page.type === 'article').map(page => page.path).sort();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'domcontentloaded' });
      for (const [selector, type] of [['.rpt-prose ol', 'decimal'], ['.rpt-prose ul', 'disc']]) {
        const list = page.locator(selector).first();
        await list.scrollIntoViewIfNeeded();
        const style = await list.evaluate(el => ({ type: getComputedStyle(el).listStyleType, visibility: getComputedStyle(el).contentVisibility, contain: getComputedStyle(el).contain, item: getComputedStyle(el.querySelector('li')).display }));
        assert.equal(style.type, type);
        assert.equal(style.visibility, 'visible', 'List marker must not be paint-clipped');
        assert(!style.contain.includes('paint'));
        assert.equal(style.item, 'list-item');
      }
      const numberedList = page.locator('.rpt-prose ol').first();
      await numberedList.scrollIntoViewIfNeeded();
      const bounds = await numberedList.boundingBox();
      await page.screenshot({ path: 'reports/seo/list-markers-' + width + '.png', clip: { x: Math.max(0, bounds.x - 28), y: Math.max(0, bounds.y - 8), width: bounds.width + 28, height: bounds.height + 16 } });
      await page.goto(base + '/rice-purity-test-for-14-years-old', { waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('#test input[type=checkbox]').count(), 20);
      const labels = await page.locator('#test label').allTextContents();
      assert.equal(labels.length, 20);
      assert(!/porn|nudes?|stripp|sex toy|fondl|oral sex|birth control|plan b|dating app|thirst trap|weed|vape/i.test(labels.join(' ')));
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'index, follow');
      const calculate = () => page.getByRole('button', { name: 'Calculate Score', exact: true }).click();
      const score = () => page.locator('#result .relative.mx-auto.mt-2 > span').first();
      await calculate();
      assert.equal((await score().innerText()).trim(), '20');
      await page.getByRole('button', { name: 'Retake Test', exact: true }).click();
      await page.locator('#q0').check();
      await page.locator('#q1').check();
      await calculate();
      assert.equal((await score().innerText()).trim(), '18');
      await page.getByRole('button', { name: 'Retake Test', exact: true }).click();
      for (const box of await page.locator('#test input[type=checkbox]').all()) await box.check();
      await calculate();
      assert.equal((await score().innerText()).trim(), '0');
      await page.getByRole('button', { name: 'Retake Test', exact: true }).click();
      await page.locator('#q0').check();
      await page.getByRole('button', { name: 'Reset', exact: true }).click();
      assert.equal(await page.locator('#test input:checked').count(), 0);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (width < 768) {
        await page.getByTestId('mobile-menu-toggle').click();
        assert(await page.getByTestId('mobile-nav').isVisible());
        await page.getByTestId('mobile-menu-toggle').click();
        assert(!await page.getByTestId('mobile-nav').isVisible());
      } else {
        await page.getByTestId('nav-dropdown-more-tests').hover();
        assert(await page.getByTestId('dropdown-more-tests').isVisible());
        await page.locator('h1').click();
        assert(!await page.getByTestId('dropdown-more-tests').isVisible());
        await page.getByTestId('nav-dropdown-more-tests').focus();
        await page.keyboard.press('Enter');
        assert(await page.getByTestId('dropdown-more-tests').isVisible());
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.goto(base + '/blog', { waitUntil: 'domcontentloaded' });
      const cards = page.locator('[data-testid^="blog-card-"]');
      assert.deepEqual((await cards.evaluateAll(items => items.map(item => item.getAttribute('href')))).sort(), blogPaths);
      assert.equal(await page.locator('[data-testid^="blog-card-"]:visible').count(), 9);
      await page.getByRole('button', { name: '2', exact: true }).click();
      assert(await page.getByTestId('blog-card-9').isVisible());
      assert(!await page.getByTestId('blog-card-0').isVisible());
      assert.equal(errors.length, 0, errors.join('\n'));
      console.log(width + 'px: list markers, teen scoring/reset, menus, blog pagination, and layout pass.');
      await context.close();
    }
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(base + '/blog', { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('[data-testid^="blog-card-"]').count(), blogPaths.length);
    assert(await page.getByTestId('mobile-nav').locator('a').count() > 0);
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('#faq details').count(), 3);
    await page.getByTestId('faq-trigger-0').click();
    assert(await page.getByTestId('faq-item-0').locator('p').isVisible());
    await context.close();
    console.log('No-JavaScript FAQ and crawlable links pass.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
