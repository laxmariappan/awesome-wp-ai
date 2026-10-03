// Checks every tool link in tools.json and reports the ones that look dead.
// Usage: npm run links            (print a report, exit 1 if anything is broken)
//        npm run links -- --md    (print the report as Markdown, for the weekly issue)
import { readFileSync } from 'node:fs';

const { tools } = JSON.parse(readFileSync(new URL('../src/data/tools.json', import.meta.url), 'utf8'));
const asMarkdown = process.argv.includes('--md');

// A browser-like agent: plenty of sites answer 403 to anything that looks like a script
const headers = {
  'User-Agent': 'Mozilla/5.0 (compatible; awesome-wp-ai-link-check; +https://github.com/laxmariappan/awesome-wp-ai)',
  Accept: 'text/html,application/xhtml+xml,*/*',
};

// These mean "I won't talk to a bot" or "slow down", not "this page is gone"
const NOT_PROOF = new Set([401, 403, 405, 406, 429, 999]);

// WordPress.org answers 200 for a plugin that no longer exists (it redirects to search) and for a
// closed one, so a plain request can't tell. The plugin API can.
async function checkWpOrgPlugin(slug) {
  const api = `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${slug}`;
  const res = await fetch(api, { headers, signal: AbortSignal.timeout(20000) });
  const text = await res.text();
  let info;
  try { info = JSON.parse(text); } catch { return null; } // API hiccup, not evidence
  if (info?.error === 'closed') return `closed on WordPress.org${info.reason ? ` (${info.reason})` : ''}`;
  if (info?.error) return 'not on WordPress.org';
  return null;
}

async function check(url) {
  const wpOrg = url.match(/^https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?$/);
  if (wpOrg) {
    try { return await checkWpOrgPlugin(wpOrg[1]); } catch { return null; }
  }
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(20000) });
      await res.body?.cancel();
      if (res.ok || NOT_PROOF.has(res.status)) return null;
      if (res.status >= 500 && attempt === 1) continue; // servers have bad moments
      return `HTTP ${res.status}`;
    } catch (err) {
      if (attempt === 2) return err.cause?.code ?? err.name ?? 'request failed';
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
}

// One entry per distinct URL, remembering which tools use it
const links = new Map();
for (const t of tools) {
  for (const url of new Set([t.url, t.github, ...(t.links ?? []).map((l) => l.url)].filter(Boolean))) {
    if (!links.has(url)) links.set(url, []);
    links.get(url).push(t.name);
  }
}

const queue = [...links.keys()];
const broken = [];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const problem = await check(url);
      if (problem) broken.push({ url, problem, names: links.get(url) });
    }
  }),
);
broken.sort((a, b) => a.names[0].localeCompare(b.names[0]));

if (asMarkdown) {
  if (broken.length) {
    console.log(`The weekly check found ${broken.length} link${broken.length === 1 ? '' : 's'} that did not load, out of ${links.size}.\n`);
    console.log('| Tool | Link | Problem |\n|---|---|---|');
    for (const b of broken) console.log(`| ${b.names.join(', ')} | ${b.url} | ${b.problem} |`);
    console.log('\nNothing is removed automatically. A link can fail because the tool moved, was renamed, or is really gone, so each one needs a look. Fix or remove the entry in `site/src/data/tools.json`, then run `npm run readme`.');
  }
} else {
  console.log(`Checked ${links.size} links for ${tools.length} tools.`);
  for (const b of broken) console.log(`  ✗ ${b.problem.padEnd(42)} ${b.url}  (${b.names.join(', ')})`);
  console.log(broken.length ? `${broken.length} broken.` : 'All good.');
}
process.exit(broken.length && !asMarkdown ? 1 : 0);
