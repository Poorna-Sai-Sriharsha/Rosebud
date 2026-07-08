import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryLabel } from '@/lib/utils';
import { formatPrice, PRICE_RANGE, ALL_CATEGORIES, ALL_TAGS } from '@/lib/products';
import type { Category } from '@/types';

interface FilterState {
  search: string;
  categories: Category[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sort: string;
  page: number;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-warm-900 uppercase tracking-wider mb-4">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export function FilterPanel({
  isFilterOpen,
  filters,
  toggleCategory,
  toggleTag,
  updateFilter,
}: {
  isFilterOpen: boolean;
  filters: FilterState;
  toggleCategory: (cat: Category) => void;
  toggleTag: (tag: string) => void;
  updateFilter: (key: keyof FilterState, value: string | number | boolean | Category[] | string[]) => void;
}) {
  return (
    <AnimatePresence>
      {isFilterOpen && (
        <motion.aside
          id="filter-panel"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 280 }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="flex-none overflow-hidden"
          aria-label="Product filters"
        >
          <div className="w-[280px] pr-6 flex flex-col gap-8">
            {/* Categories */}
            <FilterGroup title="Category">
              {ALL_CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-warm-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                    id={`filter-cat-${cat}`}
                  />
                  <span className="text-sm text-warm-700 group-hover:text-warm-950 transition-colors">
                    {getCategoryLabel(cat)}
                  </span>
                </label>
              ))}
            </FilterGroup>

            {/* Price Range */}
            <FilterGroup title="Price Range">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-warm-500">
                  <span>{formatPrice(filters.minPrice)}</span>
                  <span>{formatPrice(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={PRICE_RANGE.min}
                  max={PRICE_RANGE.max}
                  value={filters.maxPrice}
                  step={200}
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                  className="w-full accent-primary-500"
                  aria-label="Maximum price"
                />
              </div>
            </FilterGroup>

            {/* Status */}
            <FilterGroup title="Availability">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="w-4 h-4 rounded border-warm-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-warm-700 group-hover:text-warm-950 transition-colors">
                  In Stock Only
                </span>
              </label>
            </FilterGroup>

            {/* Tags */}
            <FilterGroup title="Tags">
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => {
                  const isActive = filters.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-warm-950 text-white'
                          : 'bg-white border border-warm-200 text-warm-700 hover:border-warm-400 hover:text-warm-950'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
