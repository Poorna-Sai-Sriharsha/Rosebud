'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Modal';
import type { CartItem } from '@/types';

// â”€â”€â”€ Cart Item Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();
  const variantName = item.product.variants.find((v) => v.id === item.variantId)?.name;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className="flex gap-4 py-4"
    >
      {/* Image */}
      <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-warm-100">
        <Image
          src={item.product.images[0]?.url}
          alt={item.product.images[0]?.alt ?? item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/product/${item.product.slug}`}
              className="text-sm font-medium text-warm-950 hover:text-primary-600 transition-colors line-clamp-2 leading-tight"
            >
              {item.product.name}
            </Link>
            {variantName && (
              <p className="text-xs text-warm-400 mt-0.5">{variantName}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.product.id, item.variantId)}
            className="flex-shrink-0 p-1 text-warm-400 hover:text-error transition-colors rounded-full hover:bg-error-light"
            aria-label={`Remove ${item.product.name}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity */}
          <div className="flex items-center border border-warm-200 rounded-full overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-warm-950">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-semibold text-warm-950">
            {formatPrice(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Cart Drawer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function CartDrawer() {
  const { items, isOpen, closeCart, getItemCount, getSubtotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  if (!isMounted) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title={`Your Bag (${itemCount})`}
      width="max-w-md w-full"
      footer={
        itemCount > 0 ? (
          <div className="p-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-600">Subtotal</span>
              <span className="text-base font-semibold text-warm-950">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-warm-400">
              Shipping and taxes calculated at checkout.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                href="/checkout"
                variant="primary"
                size="lg"
                fullWidth
                onClick={closeCart}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Checkout
              </Button>
              <Button
                href="/cart"
                variant="ghost"
                fullWidth
                onClick={closeCart}
              >
                View Cart
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      {/* Empty State */}
      {itemCount === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center">
            <ShoppingBag className="h-7 w-7 text-warm-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-warm-800 mb-1">Your bag is empty</h3>
            <p className="text-sm text-warm-500">Add something beautiful to get started.</p>
          </div>
          <Button variant="primary" onClick={closeCart} href="/shop">
            Explore Products
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-warm-100 px-5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product.id}::${item.variantId ?? ''}`}
                item={item}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </Drawer>
  );
}

