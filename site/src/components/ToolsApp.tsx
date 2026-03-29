import { useState, useMemo, useEffect } from 'react';
import type { Tool, Category } from '../data/tools';

// ─── Pricing badge styles ─────────────────────────────────────────────────────
const pricingStyles: Record<string, string> = {
  Free:          'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700',
  Freemium:      'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
  Paid:          'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700',
  'Open Source': 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700',
};

// ─── Deterministic avatar gradient ───────────────────────────────────────────
const avatarGradients = [
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-cyan-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-blue-600',
  'from-red-500 to-pink-600',
  'from-teal-500 to-emerald-600',
  'from-sky-500 to-blue-600',
  'from-fuchsia-500 to-violet-600',
];
function getGradient(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarGradients[Math.abs(h) % avatarGradients.length];
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const IconFilter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconExternal = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── Tool card ────────────────────────────────────────────────────────────────
function ToolCard({ tool, category }: { tool: Tool; category: Category | undefined }) {
  const gradient = getGradient(tool.name);
  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#13162a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-200">
      {tool.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
            ★ Featured
          </span>
        </div>
      )}
      <div className="flex items-start gap-3.5 p-4 flex-1">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shadow-sm`}>
          {tool.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {tool.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
      <div className="px-4 pb-3.5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {category && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${category.color} ${category.darkColor} ${category.textColor}`}>
              {category.emoji} {category.label}
            </span>
          )}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${pricingStyles[tool.pricing] ?? ''}`}>
            {tool.pricing}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {tool.github && (
            <a href={tool.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}>
              <IconGitHub />
            </a>
          )}
          <a href={tool.url} target="_blank" rel="noopener noreferrer" aria-label="Visit website"
            className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <IconExternal />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar category list (shared between desktop sidebar & mobile drawer) ───
function CategoryList({
  categories,
  activeCategory,
  countByCategory,
  onSelect,
}: {
  categories: Category[];
  activeCategory: string;
  countByCategory: Record<string, number>;
  onSelect: (slug: string) => void;
}) {
  const itemBase =
    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 border-l-2 cursor-pointer';
  const itemActive =
    'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-semibold';
  const itemInactive =
    'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white font-medium';

  return (
    <nav aria-label="Filter by category">
      {/* All */}
      <button
        onClick={() => onSelect('all')}
        className={`${itemBase} ${activeCategory === 'all' ? itemActive : itemInactive}`}
      >
        <span className="text-base leading-none">🗂️</span>
        <span className="flex-1 text-left">All tools</span>
        <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-md font-mono tabular-nums ${
          activeCategory === 'all'
            ? 'bg-brand-100 dark:bg-brand-800/50 text-brand-600 dark:text-brand-300'
            : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400'
        }`}>
          {countByCategory['all'] ?? 0}
        </span>
      </button>

      {/* Divider */}
      <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

      {/* Categories */}
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`${itemBase} ${isActive ? itemActive : itemInactive}`}
          >
            <span className="text-base leading-none w-5 text-center flex-shrink-0">{cat.emoji}</span>
            <span className="flex-1 text-left truncate">{cat.label}</span>
            {countByCategory[cat.slug] !== undefined && (
              <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-md font-mono tabular-nums flex-shrink-0 ${
                isActive
                  ? 'bg-brand-100 dark:bg-brand-800/50 text-brand-600 dark:text-brand-300'
                  : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400'
              }`}>
                {countByCategory[cat.slug]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Main app ─────────────────────────────────────────────────────────────────
interface Props {
  tools: Tool[];
  categories: Category[];
}
type SortOption = 'default' | 'a-z' | 'z-a' | 'pricing';

export default function ToolsApp({ tools, categories }: Props) {
  const [search, setSearch]               = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy]               = useState<SortOption>('default');
  const [drawerOpen, setDrawerOpen]       = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c])),
    [categories],
  );

  const filtered = useMemo(() => {
    let result = tools;
    if (activeCategory !== 'all') result = result.filter((t) => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }
    if (sortBy === 'a-z') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'z-a') result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === 'pricing') {
      const order = ['Free', 'Open Source', 'Freemium', 'Paid'];
      result = [...result].sort((a, b) => order.indexOf(a.pricing) - order.indexOf(b.pricing));
    }
    return result;
  }, [tools, activeCategory, search, sortBy]);

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { all: tools.length };
    tools.forEach((t) => { map[t.category] = (map[t.category] ?? 0) + 1; });
    return map;
  }, [tools]);

  const activeCategoryLabel =
    activeCategory === 'all'
      ? null
      : categories.find((c) => c.slug === activeCategory)?.label ?? null;

  function handleSelect(slug: string) {
    setActiveCategory(slug);
    setDrawerOpen(false);
  }

  function clearAll() {
    setSearch('');
    setActiveCategory('all');
    setSortBy('default');
  }

  const hasFilters = search || activeCategory !== 'all';

  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 items-start">

        {/* ══════════════════════════════════════════════════════════════
            LEFT SIDEBAR — desktop only (hidden on mobile)
        ══════════════════════════════════════════════════════════════ */}
        <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
          <div className="sticky top-20">
            {/* Sidebar header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Categories
              </h2>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <CategoryList
              categories={categories}
              activeCategory={activeCategory}
              countByCategory={countByCategory}
              onSelect={handleSelect}
            />

            {/* Submit CTA at bottom of sidebar */}
            <div className="mt-6 p-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Know a great tool?</p>
              <a
                href="https://github.com/laxmariappan/awesome-wp-ai/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                + Submit a tool
              </a>
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0">

          {/* ── Search + sort bar ── */}
          <div className="flex gap-2.5 mb-5">
            {/* Mobile: Filters button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#13162a] text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 transition-all flex-shrink-0"
              aria-label="Open category filters"
            >
              <IconFilter />
              Filters
              {activeCategory !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
              )}
            </button>

            {/* Search input */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <IconSearch />
              </span>
              <input
                type="search"
                placeholder="Search tools, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#13162a] text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="hidden sm:block px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#13162a] text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer flex-shrink-0"
            >
              <option value="default">Sort: Default</option>
              <option value="a-z">A → Z</option>
              <option value="z-a">Z → A</option>
              <option value="pricing">By Pricing</option>
            </select>
          </div>

          {/* ── Active filter + result count bar ── */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {/* Active category chip */}
            {activeCategoryLabel && (
              <span className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700">
                {categories.find((c) => c.slug === activeCategory)?.emoji} {activeCategoryLabel}
                <button
                  onClick={() => setActiveCategory('all')}
                  className="hover:bg-brand-200 dark:hover:bg-brand-700 rounded-full p-0.5 transition-colors"
                  aria-label="Remove category filter"
                >
                  <IconClose />
                </button>
              </span>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
              {filtered.length === 0
                ? 'No tools found'
                : `${filtered.length} tool${filtered.length !== 1 ? 's' : ''}`}
              {search && <span className="italic"> for "{search}"</span>}
            </p>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* ── Card grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((tool) => (
                <ToolCard
                  key={tool.name}
                  tool={tool}
                  category={categoryMap[tool.category]}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No tools found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Try a different search term or category, or{' '}
                <a
                  href="https://github.com/laxmariappan/awesome-wp-ai/blob/main/CONTRIBUTING.md"
                  className="text-brand-600 dark:text-brand-400 hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  submit a new tool
                </a>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════════════════ */}

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel — slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-[#13162a] rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Category filters"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">Filter by Category</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Close filters"
          >
            <IconClose />
          </button>
        </div>

        {/* Scrollable category list */}
        <div className="px-4 py-3 overflow-y-auto max-h-[65vh] pb-8">
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            countByCategory={countByCategory}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </section>
  );
}
