import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryLabel } from '@/lib/utils';
import { formatPrice, PRICE_RANGE } from '@/lib/products';
import { X } from 'lucide-react';
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

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-warm-100 text-warm-800 text-xs font-medium rounded-full border border-warm-200">
      {label}
      <button
        onClick={onRemove}
        className="text-warm-500 hover:text-warm-950 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-warm-500 ml-1"
        aria-label={`Remove filter ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export function ActiveFilters({
  hasActiveFilters,
  filters,
  updateFilter,
  toggleCategory,
  toggleTag,
  clearAll,
}: {
  hasActiveFilters: boolean;
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: string | number | boolean | Category[] | string[]) => void;
  toggleCategory: (cat: Category) => void;
  toggleTag: (tag: string) => void;
  clearAll: () => void;
}) {
  return (
    <AnimatePresence>
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2 mb-5 overflow-hidden"
        >
          {filters.search && (
            <Chip label={`"${filters.search}"`} onRemove={() => updateFilter('search', '')} />
          )}
          {filters.categories.map((c: Category) => (
            <Chip key={c} label={getCategoryLabel(c)} onRemove={() => toggleCategory(c)} />
          ))}
          {filters.tags.map((t: string) => (
            <Chip key={t} label={t} onRemove={() => toggleTag(t)} />
          ))}
          {filters.inStockOnly && (
            <Chip label="In Stock Only" onRemove={() => updateFilter('inStockOnly', false)} />
          )}
          {(filters.minPrice > PRICE_RANGE.min || filters.maxPrice < PRICE_RANGE.max) && (
            <Chip
              label={`${formatPrice(filters.minPrice)}–${formatPrice(filters.maxPrice)}`}
              onRemove={() => {
                updateFilter('minPrice', PRICE_RANGE.min);
                updateFilter('maxPrice', PRICE_RANGE.max);
              }}
            />
          )}
          <button
            onClick={clearAll}
            className="text-xs text-warm-500 hover:text-error underline underline-offset-2 transition-colors"
          >
            Clear all
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
