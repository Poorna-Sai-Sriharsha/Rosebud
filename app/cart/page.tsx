'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { formatPrice, cn } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/lib/orders';
import type { CartItem } from '@/types';

export default function CartPage() {
  const {
    items, getSubtotal, getItemCount,
    promoCode, promoDiscount, applyPromo, clearPromo,
  } = useCartStore();
  const toast = useToast();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const freeShippingThreshold = 500000; // ₹5000 in cents
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = qualifiesForFreeShipping ? 0 : SHIPPING_METHODS[0].price;
  const tax = Math.round(subtotal * 0.2); // 20% VAT
  const total = Math.max(0, subtotal - promoDiscount + shippingCost + tax);

  const handlePromo = async () => {
    if (!promoInput) return;
    setPromoLoading(true);
    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        applyPromo(promoInput.toUpperCase(), data.discount);
        toast.success(data.message, `You saved ${formatPrice(data.discount)}`);
        setPromoInput('');
      } else {
        toast.error('Invalid promo code', data.message);
      }
    } catch {
      toast.error('Error', 'Could not validate promo code.');
    }
    setPromoLoading(false);
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm px-4"
        >
          <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-9 w-9 text-warm-400" />
          </div>
          <h1 className="font-serif text-3xl text-warm-900 mb-3">Your bag is empty</h1>
          <p className="text-warm-500 mb-8">Add some beautiful things and come back.</p>
          <Button variant="primary" href="/shop" size="lg">
            Explore Products
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="container-rb py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="heading-2">Your Bag ({itemCount})</h1>
          <Link href="/shop" className="text-sm text-warm-500 hover:text-warm-950 transition-colors">
            Continue Shopping →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-warm-100">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemFull key={`${item.product.id}::${item.variantId}`} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24 flex flex-col gap-5">
              <h2 className="font-serif text-xl text-warm-950">Order Summary</h2>

              {/* Free Shipping Progress */}
              {!qualifiesForFreeShipping && (
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="text-xs text-warm-600 mb-2">
                    Add <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong> for free delivery
                  </p>
                  <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {qualifiesForFreeShipping && (
                <div className="bg-success-light rounded-xl p-3 text-xs text-success-dark font-medium text-center">
                  🎉 You qualify for free delivery!
                </div>
              )}

              {/* Promo Code */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-success-light rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-success-dark">{promoCode}</p>
                      <p className="text-xs text-success">−{formatPrice(promoDiscount)}</p>
                    </div>
                    <button
                      onClick={clearPromo}
                      className="text-warm-400 hover:text-error transition-colors"
                      aria-label="Remove promo code"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      className="flex-1 h-10 px-4 rounded-xl border border-warm-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      aria-label="Promo code"
                      onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                    />
                    <Button variant="outline" size="sm" loading={promoLoading} onClick={handlePromo}>
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-warm-400 mt-2">Try: WELCOME10, ROSEBUD15, LAUNCH20</p>
              </div>

              {/* Line items */}
              <div className="flex flex-col gap-3 border-t border-warm-100 pt-4">
                <SummaryLine label="Subtotal" value={formatPrice(subtotal)} />
                {promoDiscount > 0 && (
                  <SummaryLine label={`Promo (${promoCode})`} value={`−${formatPrice(promoDiscount)}`} valueClass="text-success" />
                )}
                <SummaryLine
                  label="Shipping"
                  value={qualifiesForFreeShipping ? 'Free' : formatPrice(shippingCost)}
                />
                <SummaryLine label="VAT (20%)" value={formatPrice(tax)} />
              </div>

              <div className="border-t border-warm-200 pt-4 flex items-center justify-between">
                <span className="font-serif text-lg text-warm-950">Total</span>
                <span className="font-serif text-2xl text-warm-950">{formatPrice(total)}</span>
              </div>

              <Button
                href="/checkout"
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-warm-400 text-center">
                Secure checkout · SSL encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Full Cart Item (for cart page) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CartItemFull({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();
  const variantName = item.product.variants.find((v) => v.id === item.variantId)?.name;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex gap-5 p-5"
    >
      <div className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-warm-100">
        <Image
          src={item.product.images[0]?.url}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/product/${item.product.slug}`} className="font-medium text-warm-950 hover:text-primary-600 transition-colors">
              {item.product.name}
            </Link>
            {variantName && <p className="text-sm text-warm-400">{variantName}</p>}
          </div>
          <button
            onClick={() => removeItem(item.product.id, item.variantId)}
            className="p-1 text-warm-300 hover:text-error transition-colors"
            aria-label={`Remove ${item.product.name}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-warm-200 rounded-full overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
              className="w-9 h-9 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="font-semibold text-warm-950">{formatPrice(item.unitPrice * item.quantity)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function SummaryLine({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-warm-600">{label}</span>
      <span className={cn('font-medium text-warm-900', valueClass)}>{value}</span>
    </div>
  );
}

