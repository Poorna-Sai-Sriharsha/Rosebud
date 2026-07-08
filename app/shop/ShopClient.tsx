'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { filterProducts, PRICE_RANGE } from '@/lib/products';
import { debounce, cn } from '@/lib/utils';
import type { Product, SortOption, Category } from '@/types';
import { FilterPanel } from '@/components/shop/FilterPanel';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { SortSelect } from '@/components/shop/SortSelect';

const PER_PAGE = 12;

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getInitialState = () => ({
    search: searchParams.get('search') ?? '',
    categories: searchParams.getAll('category') as Category[],
    tags: searchParams.getAll('tag'),
    minPrice: Number(searchParams.get('minPrice') ?? PRICE_RANGE.min),
    maxPrice: Number(searchParams.get('maxPrice') ?? PRICE_RANGE.max),
    inStockOnly: searchParams.get('inStockOnly') === 'true',
    sort: (searchParams.get('sort') ?? 'featured') as SortOption,
    page: Number(searchParams.get('page') ?? 1),
  });

  const [filters, setFilters] = useState(getInitialState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ products: Product[]; total: number; totalPages: number }>({
    products: [],
    total: 0,
    totalPages: 0,
  });

  const updateURL = useCallback(
    (newFilters: typeof filters) => {
      const params = new URLSearchParams();
      if (newFilters.search) params.set('search', newFilters.search);
      if (newFilters.sort !== 'featured') params.set('sort', newFilters.sort);
      if (newFilters.page > 1) params.set('page', String(newFilters.page));
      if (newFilters.inStockOnly) params.set('inStockOnly', 'true');
      if (newFilters.minPrice > PRICE_RANGE.min) params.set('minPrice', String(newFilters.minPrice));
      if (newFilters.maxPrice < PRICE_RANGE.max) params.set('maxPrice', String(newFilters.maxPrice));
      newFilters.categories.forEach((c) => params.append('category', c));
      newFilters.tags.forEach((t) => params.append('tag', t));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  const applyFilters = useCallback((f: typeof filters) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = filterProducts({
        categories: f.categories,
        minPrice: f.minPrice,
        maxPrice: f.maxPrice,
        tags: f.tags,
        inStockOnly: f.inStockOnly,
        search: f.search,
        sort: f.sort,
        page: f.page,
        perPage: PER_PAGE,
      });
      setResults(result);
      setIsLoading(false);
    }, 200);
  }, []);

  const debouncedSearch = useRef(
    debounce((searchVal: string, f: typeof filters) => {
      const newFilters = { ...f, search: searchVal, page: 1 };
      setFilters(newFilters);
      updateURL(newFilters);
    }, 300)
  ).current;

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  const updateFilter = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const toggleCategory = (cat: Category) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilter('categories', next);
  };

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag];
    updateFilter('tags', next);
  };

  const clearAll = () => {
    const reset = {
      ...filters,
      search: '',
      categories: [] as Category[],
      tags: [],
      minPrice: PRICE_RANGE.min,
      maxPrice: PRICE_RANGE.max,
      inStockOnly: false,
      page: 1,
    };
    setFilters(reset);
    updateURL(reset);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.inStockOnly ||
    filters.minPrice > PRICE_RANGE.min ||
    filters.maxPrice < PRICE_RANGE.max ||
    filters.search;

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Page Header */}
      <div className="bg-white border-b border-warm-100">
        <div className="container-rb py-10">
          <p className="label-overline mb-2">Our Products</p>
          <h1 className="heading-2">Shop All</h1>
        </div>
      </div>

      <div className="container-rb py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Left: Filter toggle + result count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              className={cn(
                'flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-medium transition-all',
                isFilterOpen
                  ? 'bg-warm-950 text-white border-warm-950'
                  : 'bg-white text-warm-700 border-warm-200 hover:border-warm-400 hover:text-warm-950'
              )}
              aria-expanded={isFilterOpen}
              aria-controls="filter-panel"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] flex items-center justify-center font-bold">
                  !
                </span>
              )}
            </button>

            {!isLoading && (
              <p className="text-sm text-warm-500">
                {results.total} result{results.total !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search products…"
                defaultValue={filters.search as string}
                onChange={(e) => debouncedSearch(e.target.value, filters)}
                className="pl-9 pr-4 h-10 rounded-xl border border-warm-200 bg-white text-sm text-warm-950 placeholder-warm-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 w-48 lg:w-64 transition-all"
                aria-label="Search products"
              />
            </div>

            {/* Sort */}
            <SortSelect sortValue={filters.sort} updateFilter={updateFilter} />
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilters
          hasActiveFilters={hasActiveFilters as boolean}
          filters={filters}
          updateFilter={updateFilter}
          toggleCategory={toggleCategory}
          toggleTag={toggleTag}
          clearAll={clearAll}
        />

        <div className="flex gap-8">
          {/* Filter Panel */}
          <FilterPanel
            isFilterOpen={isFilterOpen}
            filters={filters}
            toggleCategory={toggleCategory}
            toggleTag={toggleTag}
            updateFilter={updateFilter}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <ProductGridSkeleton count={PER_PAGE} />
            ) : results.products.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <>
                <motion.div
                  layout
                  className={cn(
                    'grid gap-6',
                    isFilterOpen
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {results.products.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <ProductCard product={product} priority={i < 4} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                <Pagination
                  currentPage={filters.page}
                  totalPages={results.totalPages}
                  onPageChange={(p) => {
                    const newFilters = { ...filters, page: p };
                    setFilters(newFilters);
                    updateURL(newFilters);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-12"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-4"
    >
      <div className="text-5xl">🌿</div>
      <h3 className="font-serif text-2xl text-warm-800">No products found</h3>
      <p className="text-warm-500 max-w-xs">
        Try adjusting your filters or search term to discover something new.
      </p>
      <button onClick={onClear} className="btn-outline btn mt-2">
        Clear all filters
      </button>
    </motion.div>
  );
}
