// Tool data lives in tools.json — the single source of truth for both the
// site and README.md (run `npm run readme` after editing it).
import data from './tools.json';

export type Pricing = 'Free' | 'Freemium' | 'Paid' | 'Open Source';

export interface Category {
  slug: string;
  label: string;        // short name used on the site
  title: string;        // section heading used in README.md
  description: string;  // section intro used in README.md
  defaultType: string;  // type assumed for tools in this category unless they set their own
  emoji: string;
  color: string;      // Tailwind bg color (light)
  darkColor: string;  // Tailwind bg color (dark)
  textColor: string;  // Tailwind text color
}

export interface Tool {
  name: string;
  description: string;
  url: string;
  github?: string;
  links?: { label: string; url: string }[];
  category: string;  // matches Category.slug
  group?: string;    // optional README sub-heading within the category
  added?: string;    // YYYY-MM-DD the tool was added to the list
  tags: string[];
  type: string;      // what kind of thing it is: Plugin, MCP server, Agent skill…
  pricing?: Pricing;
  featured?: boolean;
  slug: string;      // unique, URL-safe id used for /tools/<slug>/
}

export const categories = data.categories as Category[];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const seen = new Set<string>();
const defaultType = Object.fromEntries(categories.map((c) => [c.slug, c.defaultType]));
export const tools: Tool[] = (data.tools as (Omit<Tool, 'slug' | 'type'> & { type?: string })[]).map((t) => {
  // A name can appear in more than one category; later ones get the category appended
  let slug = slugify(t.name);
  if (seen.has(slug)) slug = `${slug}-${t.category}`;
  if (seen.has(slug)) throw new Error(`Duplicate tool slug: ${slug}`);
  seen.add(slug);
  return { ...t, type: t.type ?? defaultType[t.category], slug };
});

// "I want to…" collections: a few picks for a goal, each with a note on when to choose it
export interface Collection {
  slug: string;
  title: string;
  intro: string;
  picks: { tool: Tool; note: string }[];
}

const bySlug = Object.fromEntries(tools.map((t) => [t.slug, t]));
export const collections: Collection[] = data.collections.map((c) => ({
  ...c,
  picks: c.picks.map((p) => {
    if (!bySlug[p.tool]) throw new Error(`Collection "${c.slug}" points at unknown tool "${p.tool}"`);
    return { tool: bySlug[p.tool], note: p.note };
  }),
}));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const featuredTools = tools.filter((t) => t.featured);
export const totalTools = tools.length;
export const totalCategories = categories.length;
