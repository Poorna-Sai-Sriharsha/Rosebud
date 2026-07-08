// API Route: POST /api/promo — validate a promo code
import { NextRequest, NextResponse } from 'next/server';
import { validatePromoCode } from '@/lib/orders';

export async function POST(req: NextRequest) {
  const { code, subtotal } = await req.json();
  if (!code) {
    return NextResponse.json({ valid: false, message: 'Please enter a promo code.' }, { status: 400 });
  }
  const result = validatePromoCode(code, subtotal ?? 0);
  return NextResponse.json(result, { status: result.valid ? 200 : 422 });
}
