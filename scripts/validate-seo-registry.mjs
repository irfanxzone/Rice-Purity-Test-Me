import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { PAGES, getPage, buildMetadata } from '../src/lib/seo.js';

const root = fileURLToPath(new URL('../src/app/', import.meta.url));
async function discover(dir, segments = []) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) found.push(...await discover(dir + '/' + entry.name, [...segments, entry.name]));
    else if (/^page\.(jsx?|tsx?)$/.test(entry.name)) {
      const path = '/' + segments.filter(part => !part.startsWith('(')).join('/');
      const source = await readFile(dir + '/' + entry.name, 'utf8');
      if (path === '/[...missing]') {
        assert(source.includes('notFound();'), 'Catch-all must only render a 404');
        continue;
      }
      assert(source.includes('export const metadata = buildMetadata('), path + ': page must export buildMetadata');
      const declaredPath = source.match(/buildMetadata\(\{\s*path:\s*["']([^"']+)["']/)?.[1];
      assert.equal(declaredPath, path, path + ': metadata path must match route');
      getPage(path);
      found.push(path);
    }
  }
  return found;
}
const paths = await discover(root);
assert.equal(new Set(PAGES.map(page => page.path)).size, PAGES.length, 'Duplicate registry paths');
assert.deepEqual(paths.sort(), PAGES.map(page => page.path).sort(), 'Registry and route files differ');
for (const page of PAGES) {
  assert(page.title && page.description, page.path + ': title and description required');
  for (const key of ['published', 'modified']) {
    if (page[key]) assert(/^\d{4}-\d{2}-\d{2}$/.test(page[key]), page.path + ': invalid ' + key);
  }
  if (page.published && page.modified) assert(page.modified >= page.published, page.path + ': modified precedes published');
  assert.equal(buildMetadata({ path: page.path }).robots.index, !page.noindex);
}
assert.throws(() => getPage('/missing-registry-entry'), /Missing SEO registry entry/);
assert.throws(() => buildMetadata({ path: '/missing-registry-entry' }), /Missing SEO registry entry/);
console.log('SEO registry covers all ' + paths.length + ' page routes.');
