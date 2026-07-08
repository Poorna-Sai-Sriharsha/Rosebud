import { ChevronDown } from 'lucide-react';
import type { SortOption } from '@/types';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured',    label: 'Featured' },
  { value: 'bestselling', label: 'Bestselling' },
  { value: 'newest',      label: 'Newest' },
  { value: 'rating',      label: 'Highest Rated' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
];

export function SortSelect({
  sortValue,
  updateFilter,
}: {
  sortValue: SortOption;
  updateFilter: (key: 'sort', value: SortOption) => void;
}) {
  return (
    <div className="relative">
      <select
        value={sortValue}
        onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
        className="h-10 pl-4 pr-8 rounded-xl border border-warm-200 bg-white text-sm text-warm-700 appearance-none focus:outline-none focus:border-primary-500 cursor-pointer"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-warm-400 pointer-events-none" />
    </div>
  );
}
