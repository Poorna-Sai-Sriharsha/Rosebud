// API Route: GET /api/products
// Supports: category[], minPrice, maxPrice, tags[], inStockOnly, minRating, search, sort, page, perPage
import { NextRequest, NextResponse } from 'next/server';
import { filterProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const categories = searchParams.getAll('category');
  const tags = searchParams.getAll('tag');
  const minPrice = Number(searchParams.get('minPrice') ?? 0);
  const maxPrice = Number(searchParams.get('maxPrice') ?? 100000);
  const inStockOnly = searchParams.get('inStockOnly') === 'true';
  const minRating = Number(searchParams.get('minRating') ?? 0);
  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'featured';
  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? 12);

  const result = filterProducts({
    categories,
    minPrice,
    maxPrice,
    tags,
    inStockOnly,
    minRating,
    search,
    sort,
    page,
    perPage,
  });

  return NextResponse.json(result);
}
