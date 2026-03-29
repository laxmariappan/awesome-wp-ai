import { useState, useMemo, useEffect, useRef } from 'react';
import type { Tool, Category } from '../data/tools';

// ─── Pricing badge config ─────────────────────────────────────────────────────
const pricingConfig: Record<string, { label: string; cls: string }> = {
  Free:          { label: 'Free',         cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20' },
  Freemium:      { label: 'Freemium',     cls: 'bg-blue-500/10 text-blue-400 border border-blue-500/25 hover:bg-blue-500/20' },
  Paid:          { label: 'Paid',         cls: 'bg-orange-500/10 text-orange-400 border border-orange-500/25 hover:bg-orange-500/20' },
  'Open Source': { label: 'Open Source',  cls: 'bg-violet-500/10 text-violet-400 border border-violet-500/25 hover:bg-violet-500/20' },
};

// Light-mode overrides for pricing badges
const pricingLightCls: Record<string, string> = {
  Free:          'bg-emerald-50 text-emerald-700 border-emerald-200',
  Freemium:      'bg-blue-50 text-blue-700 border-blue-200',
  Paid:          'bg-orange-50 text-orange-700 border-orange-200',
  'Open Source': 'bg-violet-50 text-violet-700 border-violet-200',
};

// ─── Deterministic avatar gradient ───────────────────────────────────────────
const gradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-blue-500',
  'from-emerald-500 to-cyan-500',
  'from-pink-500 to-violet-500',
  'from-amber-500 to-orange-500',
  'from-indigo-500 to-violet-500',
  'from-red-500 to-pink-500',
  'from-teal-500 to-emerald-500',
  'from-sky-500 to-blue-500',
  'from-fuchsia-500 to-pink-500',
];
function getGradient(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return gradients[Math.abs(h) % gradients.length];
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const IconFilter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const IconX = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconGitHub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── Tool card ────────────────────────────────────────────────────────────────
function ToolCard({
  tool,
  category,
  index,
  gridKey,
}: {
  tool: Tool;
  category: Category | undefined;
  index: number;
  gridKey: number;
}) {
  const gradient = getGradient(tool.name);
  const delay = Math.min(index * 40, 480);
  const pricing = pricingConfig[tool.pricing];

  return (
    // gridKey in the React key forces remount → re-triggers animation on category switch
    <div
      key={`${tool.name}-${gridKey}`}
      className="glow-card rounded-2xl flex flex-col overflow-hidden animate-card-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Featured gradient top bar — replaces the overlapping floating badge */}
      {tool.featured && <div className="featured-bar" />}

      {/* Card body */}
      <div className="flex items-start gap-3 p-4 flex-1">
        {/* Avatar */}
        <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
          {/* Subtle glow behind avatar */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-40 blur-md -z-10`} />
          {tool.name.charAt(0).toUpperCase()}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-slate-100 truncate
                           group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
              {tool.name}
            </h3>
            {tool.featured && (
              <span className="flex-shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded
                               bg-brand-500/15 text-brand-400 border border-brand-500/20 leading-none">
                FEATURED
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 pb-3.5 flex items-center justify-between gap-2">
        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          {category && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium
                              ${category.color} ${category.darkColor} ${category.textColor}
                              transition-transform duration-150 hover:scale-105 cursor-default`}>
              {category.emoji} {category.label}
            </span>
          )}
          {pricing && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium
                              ${pricing.cls} transition-transform duration-150 hover:scale-105 cursor-default`}>
              {pricing.label}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {tool.github && (
            <a href={tool.github} target="_blank" rel="noopener noreferrer"
               aria-label="View on GitHub" onClick={(e) => e.stopPropagation()}
               className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200
                          transition-all duration-200 hover:scale-110">
              <IconGitHub />
            </a>
          )}
          <a href={tool.url} target="_blank" rel="noopener noreferrer"
             aria-label="Visit website"
             className="group/link text-slate-500 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400
                        transition-all duration-200 hover:scale-110">
            <IconArrow />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar category list ────────────────────────────────────────────────────
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
  const base = `sidebar-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm border-l-2 cursor-pointer select-none`;
  const active = `border-brand-500 bg-brand-500/10 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold`;
  const inactive = `border-transparent text-gray-600 dark:text-slate-400
                    hover:bg-gray-100 dark:hover:bg-white/[0.05]
                    hover:text-gray-900 dark:hover:text-slate-200 font-medium`;
  const countBase = `ml-auto text-[10px] px-1.5 py-0.5 rounded font-mono tabular-nums flex-shrink-0`;
  const countActive = `bg-brand-500/20 text-brand-500 dark:text-brand-400`;
  const countInactive = `bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-slate-500`;

  const items = [
    { slug: 'all', label: 'All tools', emoji: '🗂️', count: countByCategory['all'] ?? 0 },
    ...categories.map(c => ({ slug: c.slug, label: c.label, emoji: c.emoji, count: countByCategory[c.slug] ?? 0 })),
  ];

  return (
    <nav>
      {items.map((item, i) => {
        const isActive = activeCategory === item.slug;
        return (
          <>
            {i === 1 && (
              <div key="divider" className="my-2 border-t border-gray-200 dark:border-white/[0.06]" />
            )}
            <button key={item.slug} onClick={() => onSelect(item.slug)}
                    className={`${base} ${isActive ? active : inactive}`}>
              <span className="w-5 text-center flex-shrink-0 text-base leading-none">{item.emoji}</span>
              <span className="flex-1 text-left truncate text-xs">{item.label}</span>
              <span className={`${countBase} ${isActive ? countActive : countInactive}`}>
                {item.count}
              </span>
            </button>
          </>
        );
      })}
    </nav>
  );
}

// ─── Main app ─────────────────────────────────────────────────────────────────
interface Props { tools: Tool[]; categories: Category[]; }
type SortOption = 'default' | 'a-z' | 'z-a' | 'pricing';

export default function ToolsApp({ tools, categories }: Props) {
  const [search, setSearch]                 = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy]                 = useState<SortOption>('default');
  const [drawerOpen, setDrawerOpen]         = useState(false);
  const [gridKey, setGridKey]               = useState(0);

  const prevCategory = useRef(activeCategory);

  // Re-trigger card entrance animation only on category change
  useEffect(() => {
    if (prevCategory.current !== activeCategory) {
      setGridKey(k => k + 1);
      prevCategory.current = activeCategory;
    }
  }, [activeCategory]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map(c => [c.slug, c])),
    [categories],
  );

  const filtered = useMemo(() => {
    let r = tools;
    if (activeCategory !== 'all') r = r.filter(t => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'a-z')     r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'z-a')     r = [...r].sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === 'pricing') {
      const order = ['Free', 'Open Source', 'Freemium', 'Paid'];
      r = [...r].sort((a, b) => order.indexOf(a.pricing) - order.indexOf(b.pricing));
    }
    return r;
  }, [tools, activeCategory, search, sortBy]);

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { all: tools.length };
    tools.forEach(t => { map[t.category] = (map[t.category] ?? 0) + 1; });
    return map;
  }, [tools]);

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
  const activeCat = categories.find(c => c.slug === activeCategory);

  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 items-start">

        {/* ── Desktop sidebar ───────────────────────────────────────── */}
        <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
          <div className="sticky top-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                Categories
              </span>
              {hasFilters && (
                <button onClick={clearAll}
                        className="text-[10px] text-brand-600 dark:text-brand-400 hover:underline font-medium transition-opacity animate-fade-in">
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

            {/* Submit CTA */}
            <div className="mt-5 p-3 rounded-xl border border-dashed border-white/[0.1]
                            bg-white/[0.02] text-center group">
              <p className="text-[11px] text-slate-500 mb-1.5">Know a great tool?</p>
              <a href="https://github.com/laxmariappan/awesome-wp-ai/blob/main/CONTRIBUTING.md"
                 target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-[11px] font-semibold
                            text-brand-500 dark:text-brand-400 hover:text-brand-400 dark:hover:text-brand-300
                            transition-all duration-200 hover:translate-x-0.5">
                + Submit a tool
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                     className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </aside>

        {/* ── Main content ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Controls bar */}
          <div className="flex gap-2.5 mb-5">
            {/* Mobile filters button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                         border border-white/[0.1] bg-white/[0.04] dark:text-slate-300 text-gray-700
                         text-sm font-medium hover:border-brand-500/40 hover:text-brand-400
                         transition-all duration-200 flex-shrink-0"
            >
              <IconFilter />
              Filters
              {activeCategory !== 'all' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-500 animate-glow-pulse" />
              )}
            </button>

            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none">
                <IconSearch />
              </span>
              <input
                type="search"
                placeholder="Search tools, tags…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="glow-input w-full pl-9 pr-4 py-2.5 rounded-xl
                           border border-gray-200 dark:border-white/[0.08]
                           bg-white dark:bg-surface-700
                           text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500"
              />
              {/* Clear search button */}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white
                             transition-all duration-150 hover:scale-110 animate-scale-in"
                  aria-label="Clear search"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="hidden sm:block px-3 py-2.5 rounded-xl
                         border border-gray-200 dark:border-white/[0.08]
                         bg-white dark:bg-surface-700
                         text-sm text-gray-700 dark:text-slate-300
                         hover:border-brand-500/40 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer flex-shrink-0"
            >
              <option value="default">Sort: Default</option>
              <option value="a-z">A → Z</option>
              <option value="z-a">Z → A</option>
              <option value="pricing">By Pricing</option>
            </select>
          </div>

          {/* Active filter chips + result count */}
          <div className="flex items-center gap-2 mb-5 flex-wrap min-h-[1.75rem]">
            {activeCat && (
              <span className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full
                               text-xs font-medium border border-brand-500/30
                               bg-brand-500/10 text-brand-400
                               animate-scale-in">
                {activeCat.emoji} {activeCat.label}
                <button
                  onClick={() => setActiveCategory('all')}
                  className="p-0.5 rounded-full hover:bg-brand-500/20 transition-all duration-150
                             hover:rotate-90 transform"
                  aria-label="Remove filter"
                >
                  <IconX size={11} />
                </button>
              </span>
            )}

            <p className="text-xs text-gray-400 dark:text-slate-500 ml-auto font-mono">
              {filtered.length === 0
                ? 'No results'
                : <><span className="text-slate-300 font-semibold">{filtered.length}</span> tool{filtered.length !== 1 ? 's' : ''}</>
              }
              {search && <span className="italic text-slate-500"> · "{search}"</span>}
            </p>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-brand-500 dark:text-brand-400 hover:underline font-medium
                           transition-opacity animate-fade-in"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Card grid */}
          {filtered.length > 0 ? (
            <div key={gridKey} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((tool, index) => (
                <ToolCard
                  key={`${tool.name}-${gridKey}`}
                  tool={tool}
                  category={categoryMap[tool.category]}
                  index={index}
                  gridKey={gridKey}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
              <div className="text-5xl mb-4 animate-float">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Nothing found</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs">
                Try different keywords or{' '}
                <a href="https://github.com/laxmariappan/awesome-wp-ai/blob/main/CONTRIBUTING.md"
                   className="text-brand-500 hover:text-brand-400 hover:underline transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  submit a new tool
                </a>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile drawer backdrop ───────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer panel ──────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl
                    bg-white dark:bg-surface-800
                    border-t border-white/[0.08] shadow-2xl
                    transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${drawerOpen ? 'translate-y-0' : 'translate-y-full'}`}
        role="dialog" aria-modal="true" aria-label="Category filters"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/[0.12]" />
        </div>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/[0.07]">
          <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Filter by Category</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-slate-400
                       hover:bg-gray-200 dark:hover:bg-white/[0.12] transition-all duration-150
                       hover:rotate-90 transform"
          >
            <IconX size={16} />
          </button>
        </div>
        {/* List */}
        <div className="px-4 py-3 overflow-y-auto max-h-[65vh] pb-safe">
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
