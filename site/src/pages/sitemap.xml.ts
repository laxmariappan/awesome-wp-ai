// Sitemap of the home page and every tool page.
import type { APIRoute } from 'astro';
import { tools, collections } from '../data/tools';

export const GET: APIRoute = ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site).href;
  const urls = [
    home,
    ...collections.map((c) => `${home}for/${c.slug}/`),
    ...tools.map((t) => `${home}tools/${t.slug}/`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
