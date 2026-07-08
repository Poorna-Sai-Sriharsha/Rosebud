import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    'Browse our full collection of curated home fragrance: candles, diffusers, room sprays, and bath products. Filter by category, scent, price, and rating.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={12} />}>
      <ShopClient />
    </Suspense>
  );
}
