import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';
import { PAGES, SITE_URL, SITE_NAME } from '../src/lib/seo.js';
import { HOME_FAQ } from '../src/data/home-faq.js';
import './validate-seo-registry.mjs';

const base = new URL(process.argv[2] || 'http://localhost:3000');
const decode = text => text.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
  if (entity[0] === '#') return String.fromCodePoint(entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)));
  return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[entity.toLowerCase()];
});
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const tags = (html, name) => [...html.matchAll(new RegExp('<' + name + '\\b[^>]*>', 'gi'))].map(match => attrs(match[0]));
const withoutScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const schemas = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1]));
const failures = [];
const documents = new Map();
async function get(path) {
  const response = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, path + ': HTTP ' + response.status);
  return response.text();
}
for (const page of PAGES) {
  try {
    const html = await get(page.path);
    documents.set(page.path, html);
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    assert(head, 'Missing head');
    const meta = tags(head, 'meta');
    const values = key => meta.filter(tag => tag.name === key || tag.property === key).map(tag => tag.content);
    const expectedUrl = new URL(page.path, SITE_URL).href;
    const expectedTitle = page.absoluteTitle ? page.title : page.title + ' \u00b7 ' + SITE_NAME;
    const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
    assert.equal(title, expectedTitle, 'Incorrect title');
    assert.deepEqual(tags(head, 'link').filter(tag => tag.rel === 'canonical').map(tag => new URL(tag.href).href), [expectedUrl], 'Incorrect or duplicate canonical');
    assert.deepEqual(values('description'), [page.description], 'Incorrect description');
    assert.deepEqual(values('og:url').map(value => new URL(value).href), [expectedUrl], 'Incorrect OG URL');
    assert.deepEqual(values('og:title'), [expectedTitle], 'Incorrect OG title');
    assert.deepEqual(values('og:type'), ['website'], 'Incorrect OG type');
    assert.deepEqual(values('og:description'), [page.description], 'Incorrect OG description');
    assert.deepEqual(values('twitter:description'), [page.description], 'Incorrect Twitter description');
    assert.deepEqual(values('twitter:title'), [expectedTitle], 'Incorrect Twitter title');
    assert.deepEqual(values('keywords'), [], 'Obsolete keywords metadata');
    assert.equal(values('robots').length, 1, 'Missing or duplicate robots');
    assert.equal(/\bnoindex\b/.test(values('robots')[0]), !!page.noindex, 'Incorrect indexing directive');
    for (const [key, field] of [['article:published_time', 'published'], ['article:modified_time', 'modified']]) {
      assert.deepEqual(values(key), [], 'Incorrect ' + key);
    }
    assert(!html.includes('www.ricepuritytestme.com'), 'www URL remains');
    const body = withoutScripts(html);
    const header = body.match(/<header\b[\s\S]*?<\/header>/i)?.[0] || '';
    const menuLinks = tags(header, 'a').map(tag => tag.href);
    for (const entry of PAGES.filter(item => item.menu && !item.noindex)) assert(menuLinks.includes(entry.path), 'Menu link missing from HTML: ' + entry.path);
    function checkDates(value) {
      if (!value || typeof value !== 'object') return;
      if ('datePublished' in value) assert.equal(value.datePublished, page.published, 'Incorrect schema publication date');
      if ('dateModified' in value) assert.equal(value.dateModified, page.modified, 'Incorrect schema modification date');
      Object.values(value).forEach(checkDates);
    }
    schemas(html).forEach(checkDates);
  } catch (error) { failures.push(page.path + ': ' + error.message); }
}
try {
  const sitemap = await get('/sitemap.xml');
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => ({
    url: decode(match[1].match(/<loc>(.*?)<\/loc>/)?.[1] || ''),
    modified: match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }));
  assert.deepEqual(entries.map(entry => entry.url).sort(), PAGES.filter(page => !page.noindex).map(page => new URL(page.path, SITE_URL).href).sort(), 'Sitemap URL coverage');
  for (const entry of entries) assert.equal(entry.modified, PAGES.find(page => new URL(page.path, SITE_URL).href === entry.url).modified, entry.url + ': sitemap lastmod');
  const robots = await get('/robots.txt');
  assert(robots.includes('Sitemap: ' + SITE_URL + '/sitemap.xml'), 'robots sitemap URL');
  const blog = withoutScripts(documents.get('/blog') || '');
  const blogLinks = tags(blog, 'a').filter(tag => tag['data-testid']?.startsWith('blog-card-')).map(tag => tag.href);
  assert.deepEqual(blogLinks.sort(), PAGES.filter(page => !page.noindex && page.type === 'article').map(page => page.path).sort(), 'Blog cards must contain only indexable tests and guides');
  const home = documents.get('/') || '';
  const faq = schemas(home).filter(schema => schema['@type'] === 'FAQPage');
  assert.equal(faq.length, 1, 'Homepage must have exactly one FAQ schema');
  assert.deepEqual(faq[0].mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })), HOME_FAQ, 'FAQ schema/content mismatch');
  const readable = decode(withoutScripts(home).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  for (const item of HOME_FAQ) { assert(readable.includes(item.q), 'FAQ question absent from HTML'); assert(readable.includes(item.a), 'FAQ answer absent from HTML'); }
  const missing = await fetch(new URL('/seo-check-nonexistent-page', base), { redirect: 'manual' });
  assert.equal(missing.status, 404, 'Missing page must return 404');
  assert(!tags(await missing.text(), 'link').some(tag => tag.rel === 'canonical'), '404 inherits a canonical');
  // Send a real Host header without following the redirect to production.
  for (const path of ['/', '/bdsm-test?seo_check=1']) {
    const result = await new Promise((resolve, reject) => {
      const transport = base.protocol === 'https:' ? https : http;
      const request = transport.get(new URL(path, base), { headers: { Host: 'www.ricepuritytestme.com' } }, response => {
        response.resume(); resolve({ status: response.statusCode, location: response.headers.location });
      });
      request.setTimeout(20000, () => request.destroy(new Error('Redirect check timed out')));
      request.on('error', reject);
    });
    assert([301, 308].includes(result.status), 'www must permanently redirect');
    assert.equal(new URL(result.location).href, new URL(path, SITE_URL).href, 'www redirect must preserve path/query');
  }
} catch (error) { failures.push('Shared checks: ' + error.message); }
if (failures.length) {
  failures.forEach(message => console.error('\u2717 ' + message));
  process.exitCode = 1;
} else console.log('\u2713 all ' + PAGES.length + ' URLs pass');
