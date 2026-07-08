'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [adding, setAdding] = useState(false);

  const { addItem } = useCartStore();
  const toast = useToast();

  const hasMultipleImages = product.images.length > 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    setAdding(true);

    // Simulate a brief delay for UX feel
    await new Promise((r) => setTimeout(r, 600));

    const defaultVariant = product.variants[0];
    addItem(product, defaultVariant);

    toast.success('Added to bag', product.name);
    setAdding(false);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <motion.article
        onHoverStart={() => {
          setIsHovered(true);
          if (hasMultipleImages) setImageIndex(1);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setImageIndex(0);
        }}
        className="flex flex-col gap-3"
      >
        {/* Image Container */}
        <div className="relative aspect-product rounded-2xl overflow-hidden bg-warm-100">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[imageIndex]?.url ?? product.images[0]?.url}
              alt={product.images[imageIndex]?.alt ?? product.name}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
            {product.stock === 0 && <Badge variant="default">Out of Stock</Badge>}
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
              className={cn(
                'w-full flex items-center justify-center gap-2 h-11 rounded-xl',
                'text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                adding
                  ? 'bg-success text-white'
                  : 'bg-warm-950/95 text-white hover:bg-warm-800',
                'disabled:bg-warm-400 disabled:cursor-not-allowed',
                'backdrop-blur-sm'
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              {adding ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-base"
                  >
                    ✓
                  </motion.span>
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {product.stock === 0 ? 'Out of Stock' : 'Quick Add'}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 px-1">
          {/* Category */}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">
            {product.category.replace('-', ' ')}
          </span>

          {/* Name */}
          <h3 className="font-serif text-base text-warm-950 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-warm-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(product.rating)
                      ? 'fill-primary-500 text-primary-500'
                      : 'text-warm-200'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-warm-400">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base font-semibold text-warm-950">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-warm-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
