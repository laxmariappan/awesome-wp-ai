# Contribution Guidelines

Thank you for considering contributing to **awesome-wordpress-ai**!

## How to add an item

**Quickest way:** [fill in the Submit a tool form](https://github.com/laxmariappan/awesome-wp-ai/issues/new?template=submit-tool.yml) and a maintainer will add it for you. To add it yourself, open a pull request as follows.

All tools live in one file: [`site/src/data/tools.json`](site/src/data/tools.json). Both the website and the list in `README.md` are generated from it, so **do not edit the tool list in `README.md` by hand**.

1. Fork this repository.
2. Add an object to the `tools` array in `site/src/data/tools.json`, next to the other tools in the same category:
   ```json
   {
     "name": "Tool Name",
     "description": "One sentence, starting with a capital letter and ending with a period.",
     "url": "https://example.com/",
     "github": "https://github.com/owner/repo",
     "category": "category-slug",
     "tags": ["a-few", "lowercase-kebab", "tags"],
     "pricing": "Free"
   }
   ```
   - `category` must match a `slug` in the `categories` array at the top of the file.
   - `github`, `pricing` (`Free`, `Freemium`, `Paid` or `Open Source`), `group` (a README sub-heading) and `links` (extra `{ "label", "url" }` links) are optional.
3. Regenerate the README and check the site builds:
   ```bash
   cd site && npm ci && npm run readme && npm run build
   ```
4. Commit `tools.json` and `README.md` together and open a pull request saying what you're adding and why it belongs here.

CI fails if `README.md` does not match `tools.json`.

To add a category, add it to the `categories` array (its position sets the order on the site and in the README) with a `slug`, short `label`, README `title` and `description`, an emoji, and a Tailwind color set like the existing ones.

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
