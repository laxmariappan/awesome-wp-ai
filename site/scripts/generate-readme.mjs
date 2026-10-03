// Regenerates the tool list in README.md from src/data/tools.json.
// Usage: npm run readme          (rewrite README.md)
//        npm run readme:check    (exit 1 if README.md is out of date)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const readmePath = `${root}/README.md`;
const { categories, collections, tools } = JSON.parse(readFileSync(new URL('../src/data/tools.json', import.meta.url), 'utf8'));

const anchor = (title) => title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
const entry = (t) => {
  let line = `- [${t.name}](${t.url}) - ${t.description}`;
  if (t.github && t.github !== t.url) line += ` [GitHub](${t.github})`;
  for (const l of t.links ?? []) line += ` [${l.label}](${l.url})`;
  return line;
};

const SITE = 'https://laxmariappan.github.io/awesome-wp-ai/';

const out = ['## Contents', '', '- [Start Here](#start-here)'];
for (const c of categories) out.push(`- [${c.title}](#${anchor(c.title)})`);
out.push('- [Credits](#credits)', '', '---', '');

out.push('## Start Here', '', 'Not sure which tool you need? Pick a goal. Each page has a handful of picks and a line on when to choose which.', '');
for (const c of collections) out.push(`- [${c.title}](${SITE}for/${c.slug}/) - ${c.intro}`);
out.push('');

for (const c of categories) {
  out.push(`## ${c.title}`, '');
  if (c.description) out.push(c.description, '');
  const inCat = tools.filter((t) => t.category === c.slug);
  const groups = [...new Set(inCat.map((t) => t.group ?? ''))];
  for (const g of groups) {
    if (g) out.push(`### ${g}`, '');
    out.push(...inCat.filter((t) => (t.group ?? '') === g).map(entry), '');
  }
}

const START = /<!-- TOOLS:START[^>]*-->/;
const END = '<!-- TOOLS:END -->';
const readme = readFileSync(readmePath, 'utf8');
const startMatch = readme.match(START);
if (!startMatch || !readme.includes(END)) throw new Error('TOOLS markers not found in README.md');
const next =
  readme.slice(0, startMatch.index + startMatch[0].length) + '\n' + out.join('\n') + readme.slice(readme.indexOf(END));

if (process.argv.includes('--check')) {
  if (next !== readme) {
    console.error('README.md is out of date. Run `npm run readme` in site/ and commit the result.');
    process.exit(1);
  }
  console.log('README.md is up to date.');
} else {
  writeFileSync(readmePath, next);
  console.log(`README.md updated: ${tools.length} tools in ${categories.length} categories.`);
}
