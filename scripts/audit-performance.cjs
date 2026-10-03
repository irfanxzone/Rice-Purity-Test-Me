const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const { default: lighthouse } = await import(pathToFileURL(require.resolve(process.env.LIGHTHOUSE_MODULE || 'lighthouse')).href);
  const port = 9333;
  let browser;
  const results = [];
  try {
    for (const [name, desktop] of [['mobile-1', false], ['mobile-2', false], ['mobile-3', false], ['mobile-4', false], ['mobile-5', false], ['desktop', true]]) {
      browser = await chromium.launch({ channel: 'chrome', headless: true, ignoreDefaultArgs: ['--disable-back-forward-cache'], args: [`--remote-debugging-port=${port}`] });
      const flags = { port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] };
      const config = desktop ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } } : undefined;
      const { lhr } = await lighthouse(process.env.TEST_URL || 'http://127.0.0.1:3100', flags, config);
      if (lhr.runtimeError) throw new Error(JSON.stringify(lhr.runtimeError));
      fs.writeFileSync(path.join(os.tmpdir(), `rice-final-${name}.json`), JSON.stringify(lhr));
      const result = {
        name, lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime,
        scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
        metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map(key => [key, { value: lhr.audits[key].numericValue, display: lhr.audits[key].displayValue }])),
        failures: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 0.9).map(audit => ({ id: audit.id, title: audit.title, display: audit.displayValue })),
        resources: lhr.audits['resource-summary'].details.items,
        activeScripts: {
          adsense: lhr.audits['network-requests'].details.items.some(request => request.url.includes('pagead/js/adsbygoogle.js') && request.finished && request.statusCode === 200 && request.resourceSize > 0),
          analytics: lhr.audits['network-requests'].details.items.some(request => request.url.includes('googletagmanager.com/gtag/js') && request.finished && request.statusCode === 200 && request.resourceSize > 0),
        },
        warnings: lhr.runWarnings,
      };
      result.validWithScripts = result.activeScripts.adsense && result.activeScripts.analytics;
      results.push(result);
      fs.writeFileSync('reports/performance/lighthouse-summary.json', JSON.stringify(results, null, 2) + '\n');
      console.log(JSON.stringify(result));
      await browser.close();
      browser = null;
    }
    if (results.some(result => !result.validWithScripts)) {
      console.error('Audit incomplete: one or more runs did not finish loading both Google scripts. Do not treat those scores as script-enabled results.');
      process.exitCode = 2;
    }
  } finally { await browser?.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
