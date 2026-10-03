// RSS feed of the most recently added tools.
import type { APIRoute } from 'astro';
import { tools, categories } from '../data/tools';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site).href;
  const label = Object.fromEntries(categories.map((c) => [c.slug, c.label]));
  const latest = tools
    .filter((t) => t.added)
    .sort((a, b) => b.added!.localeCompare(a.added!))
    .slice(0, 50);

  const items = latest
    .map(
      (t) => `    <item>
      <title>${esc(t.name)}</title>
      <link>${esc(t.url)}</link>
      <guid isPermaLink="false">${esc(`${t.category}:${t.url}`)}</guid>
      <category>${esc(label[t.category] ?? t.category)}</category>
      <pubDate>${new Date(`${t.added}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(t.description)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Awesome WP AI: new tools</title>
    <link>${home}</link>
    <atom:link href="${home}rss.xml" rel="self" type="application/rss+xml" />
    <description>Newly added AI plugins, tools and resources for WordPress.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
