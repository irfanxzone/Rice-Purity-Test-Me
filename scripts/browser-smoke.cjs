const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:3100';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 768, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 850 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'load' });
      assert.equal(await page.locator('input[type=checkbox]').count(), 100);
      assert(await page.locator('[data-testid=site-logo] img').evaluate(img => img.complete && img.naturalWidth > 0));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (width < 768) {
        await page.getByTestId('mobile-menu-toggle').click();
        assert(await page.getByTestId('mobile-nav').isVisible());
        await page.getByTestId('mobile-menu-toggle').click();
      } else {
        await page.getByTestId('nav-dropdown-more-tests').focus();
        assert(await page.getByTestId('dropdown-more-tests').isVisible());
      }
      await page.getByTestId('question-checkbox-1').focus();
      await page.keyboard.press('Space');
      assert(await page.getByTestId('question-checkbox-1').isChecked());
      await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-testid=question-checkbox-1]'), '::after').opacity === '1');
      await page.getByTestId('question-row-2').click();
      await page.getByTestId('calculate-score-btn').click();
      await page.getByTestId('score-result-display').waitFor();
      assert.match(await page.getByTestId('score-result-display').innerText(), /98/);
      await page.getByTestId('share-copy-btn').click();
      await page.locator('[data-sonner-toast]').waitFor();
      await page.getByTestId('retake-test-btn').click();
      assert.equal(await page.locator('input[type=checkbox]:checked').count(), 0);
      await page.getByTestId('question-row-3').click();
      await page.getByTestId('clear-btn').click();
      assert.equal(await page.locator('input[type=checkbox]:checked').count(), 0);
      await page.getByTestId('calculate-score-btn').click();
      await page.getByTestId('score-result-display').waitFor();
      assert.match(await page.getByTestId('score-result-display').innerText(), /100/);
      await page.getByTestId('retake-test-btn').click();
      await page.getByTestId('question-row-100').scrollIntoViewIfNeeded();
      await page.getByTestId('question-row-100').click();
      assert(await page.getByTestId('question-checkbox-100').isChecked());
      await page.getByTestId('calculate-score-btn').click();
      await page.getByTestId('score-result-display').waitFor();
      assert.match(await page.getByTestId('score-result-display').innerText(), /^99\s*\/\s*100$/);
      await page.getByTestId('retake-test-btn').click();
      await page.locator('input[type=checkbox]').evaluateAll(inputs => inputs.forEach(input => input.click()));
      await page.getByTestId('calculate-score-btn').click();
      await page.getByTestId('score-result-display').waitFor();
      assert.match(await page.getByTestId('score-result-display').innerText(), /^0\s*\/\s*100$/);
      await page.emulateMedia({ media: 'print' });
      assert(await page.getByTestId('certificate-card').isVisible());
      assert(!(await page.getByTestId('site-header').isVisible()));
      await page.emulateMedia({ media: 'screen' });
      await page.getByTestId('retake-test-btn').click();
      assert.equal(await page.locator('input[type=checkbox]:checked').count(), 0);
      await page.getByTestId('faq-trigger-0').click();
      assert(await page.getByTestId('faq-item-0').evaluate(el => el.open));
      await page.locator('[data-testid=seo-content] img').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => { const img = document.querySelector('[data-testid=seo-content] img'); return img.complete && img.naturalWidth > 0; });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `reports/performance/home-${width}.png` });
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: navigation, keyboard input, score 98/100, retake, clear, scores 100/100, 99/100 and 0/100, print layout, copy notification, FAQ, images, no overflow or runtime errors`);
      await context.close();
    }
    const page = await browser.newPage();
    await page.goto(`${base}/contact`, { waitUntil: 'load' });
    await page.getByTestId('contact-submit').click();
    await page.locator('[data-sonner-toast]').waitFor();
    console.log('PASS contact validation notification');
    const nativeContext = await browser.newContext({ javaScriptEnabled: false });
    const nativePage = await nativeContext.newPage();
    await nativePage.goto(base);
    assert.equal(await nativePage.locator('input[type=checkbox]').count(), 100);
    await nativePage.getByTestId('question-row-1').click();
    assert(await nativePage.getByTestId('question-checkbox-1').isChecked());
    await nativeContext.close();
    console.log('PASS server-rendered questions and native selection before JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
