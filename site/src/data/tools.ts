// Tool data lives in tools.json — the single source of truth for both the
// site and README.md (run `npm run readme` after editing it).
import data from './tools.json';

export type Pricing = 'Free' | 'Freemium' | 'Paid' | 'Open Source';

export interface Category {
  slug: string;
  label: string;        // short name used on the site
  title: string;        // section heading used in README.md
  description: string;  // section intro used in README.md
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
  tags: string[];
  pricing?: Pricing;
  featured?: boolean;
}

export const categories = data.categories as Category[];
export const tools = data.tools as Tool[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const featuredTools = tools.filter((t) => t.featured);
export const totalTools = tools.length;
export const totalCategories = categories.length;
