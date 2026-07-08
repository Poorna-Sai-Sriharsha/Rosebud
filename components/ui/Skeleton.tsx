'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Skeleton({ className, rounded = 'lg' }: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg',
    xl: 'rounded-xl', full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-warm-200 via-warm-100 to-warm-200 animate-shimmer',
        roundedMap[rounded],
        className
      )}
      style={{ backgroundSize: '200% 100%' }}
      aria-hidden="true"
    />
  );
}

// ─── Product Card Skeleton ────────────────────────────────
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-product w-full" rounded="xl" />
      <div className="flex flex-col gap-2 px-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3 mt-1" />
      </div>
    </div>
  );
}

// ─── Product Grid Skeleton ────────────────────────────────
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
