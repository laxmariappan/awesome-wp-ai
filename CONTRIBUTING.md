# Contribution Guidelines

Thank you for considering contributing to **awesome-wordpress-ai**!

## How to add an item

1. Fork this repository.
2. Add your item to the appropriate section in `README.md`, in alphabetical order within that section.
3. Use the format: `- [Name](url) - Description.` — one sentence, starting with a capital letter, ending with a period.
4. **Also add the item to `site/src/data/tools.ts`** (see below) so it shows up on the GitHub Pages site, not just in `README.md`.
5. Submit a pull request with a brief description of what you're adding and why it belongs here.

## Keeping the website in sync

The GitHub Pages site (built from `site/`) is **not** generated from `README.md` — it reads from a separate, hand-maintained file: [`site/src/data/tools.ts`](site/src/data/tools.ts). Adding an item to `README.md` alone will **not** make it appear on the site.

When adding a new item:

1. Add the entry to `README.md` as usual.
2. Open `site/src/data/tools.ts` and add a matching `Tool` object in the section comment (`// ─── Category Name ───`) that corresponds to the same section you used in the README. Match the existing style:
   ```ts
   {
     name: 'Tool Name',
     description: 'One sentence, no trailing period, matching the README description.',
     url: 'https://example.com/',
     github: 'https://github.com/owner/repo', // optional, only if there's a GitHub repo
     category: 'category-slug', // must match a slug in the `categories` array at the top of the file
     tags: ['a-few', 'lowercase-kebab', 'tags'],
     pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source',
   },
   ```
3. Verify the build locally before opening a PR:
   ```bash
   cd site && npm ci && npm run build
   ```
   The build should complete with no errors, and your tool should be visible in `site/dist/index.html`.

If a category doesn't exist yet in `tools.ts`, add it to the `categories` array at the top of the file (pick an emoji and a Tailwind color pair consistent with the existing entries) before adding tools to it.

## Quality criteria

To be included, an item must:

- Be directly related to **WordPress** and **AI** (not just one or the other).
- Be **actively maintained** — a plugin or tool with no updates in 2+ years will generally be excluded.
- Provide **genuine value** not already covered by an existing entry.
- For plugins: be available on [WordPress.org](https://wordpress.org/plugins/) or have a public, usable release.
- For GitHub repos: have a README, be public, and show signs of active development.

## What we don't include

- Abandoned or unmaintained projects.
- Paid plugins with no free tier (unless they are widely recognized as the best-in-class).
- Generic AI tools that happen to have a WordPress integration as a minor feature.
- Link farms, affiliate pages, or marketing landing pages without actual tools.

## Updating or removing items

If you find a link that is broken, outdated, or a project that has been abandoned, please open an issue or submit a PR to update or remove it.
