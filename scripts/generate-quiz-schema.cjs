// Read the existing question literals without changing quiz code or answers.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const pattern = /const\s+(\w*QUESTIONS(?:_\d+)?)\s*=\s*(\[[\s\S]*?\n\]);/;
function questionsFrom(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(pattern);
  if (!match) return null;
  const entries = vm.runInNewContext('(' + match[2] + ')', Object.create(null), { timeout: 1000 });
  if (!Array.isArray(entries)) throw new Error('Expected question array: ' + file);
  return Array.from(entries, entry => {
    const text = typeof entry === 'string' ? entry : entry.text;
    if (typeof text !== 'string' || !text.trim()) throw new Error('Invalid question: ' + file);
    return text;
  });
}
const data = {};
const app = path.join(root, 'src/app');
function collect(directory, segments = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(file, entry.name.startsWith('(') ? segments : [...segments, entry.name]);
    else if (entry.name.endsWith('.jsx') && segments.length) {
      const questions = questionsFrom(file);
      if (questions) {
        const route = '/' + segments.join('/');
        if (data[route]) throw new Error('Multiple question sources: ' + route);
        data[route] = questions;
      }
    }
  }
}
collect(app);
data['/rice-purity-test-for-14-years-old'] = questionsFrom(path.join(root, 'src/data/teen-quiz.js'));
const sorted = Object.fromEntries(Object.entries(data).sort(([a], [b]) => a.localeCompare(b)));
const output = JSON.stringify(sorted, null, 2) + '\n';
const target = path.join(root, 'src/data/quiz-schema.json');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== output) throw new Error('Quiz schema is stale: run node scripts/generate-quiz-schema.cjs');
} else if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== output) fs.writeFileSync(target, output);
console.log('Schema questions match ' + Object.keys(sorted).length + ' existing quizzes; no question/scoring changes.');
