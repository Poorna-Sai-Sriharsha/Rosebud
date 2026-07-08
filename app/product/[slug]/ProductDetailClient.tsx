'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Check, Truck, RefreshCw, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/shop/ProductCard';
import { formatPrice, cn } from '@/lib/utils';
import type { Product, ProductVariant } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();
  const toast = useToast();

  const finalPrice = product.price + (selectedVariant?.price ?? 0);
  const isOutOfStock = product.stock === 0 || (selectedVariant?.stock ?? 0) === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 700));
    addItem(product, selectedVariant ?? undefined, quantity);
    toast.success('Added to bag', `${product.name}${selectedVariant ? ` — ${selectedVariant.name}` : ''}`);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accordionItems = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <ul className="list-disc list-inside space-y-1.5 text-warm-600">
          {product.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      ),
    },
    {
      id: 'ingredients',
      title: 'Ingredients',
      content: product.ingredients ? (
        <p className="text-warm-600 leading-relaxed">{product.ingredients}</p>
      ) : (
        <p className="text-warm-400 italic">Please contact us for full ingredient information.</p>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-2 text-warm-600">
          <p>{product.shippingInfo}</p>
          <p className="mt-2">{product.returnPolicy}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Breadcrumb */}
      <div className="container-rb py-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-warm-400">
          <Link href="/" className="hover:text-warm-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-warm-700 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-warm-700 capitalize transition-colors">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-warm-700">{product.name}</span>
        </nav>
      </div>

      {/* Main Layout */}
      <div className="container-rb pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ─── Image Gallery ─────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-warm-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]?.url}
                    alt={product.images[selectedImage]?.alt ?? product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Nav Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-warm-700 hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-warm-700 hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'relative w-20 h-24 rounded-xl overflow-hidden flex-none border-2 transition-all',
                      i === selectedImage ? 'border-warm-950' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === selectedImage}
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ──────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:pt-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
              {isOutOfStock && <Badge variant="default">Out of Stock</Badge>}
              {product.compareAtPrice && <Badge variant="sale">On Sale</Badge>}
            </div>

            {/* Name & Category */}
            <div>
              <p className="label-overline mb-1.5">{product.category.replace('-', ' ')}</p>
              <h1 className="heading-2 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.floor(product.rating) ? 'fill-primary-500 text-primary-500' : 'text-warm-200'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-warm-500">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-warm-950">{formatPrice(finalPrice)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-warm-400 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-base text-warm-600 leading-relaxed border-l-2 border-primary-300 pl-4">
              {product.shortDescription}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-warm-700 mb-3">
                  {product.variants[0]?.type === 'size' ? 'Size' : 'Scent'}
                  {selectedVariant && <span className="ml-2 font-normal text-warm-500">— {selectedVariant.name}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock === 0}
                      className={cn(
                        'px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                        selectedVariant?.id === variant.id
                          ? 'bg-warm-950 text-white border-warm-950'
                          : variant.stock === 0
                          ? 'border-warm-200 text-warm-300 line-through cursor-not-allowed'
                          : 'border-warm-200 text-warm-700 hover:border-warm-700'
                      )}
                      aria-pressed={selectedVariant?.id === variant.id}
                      aria-disabled={variant.stock === 0}
                    >
                      {variant.name}
                      {variant.price > 0 && <span className="ml-1 text-warm-400 text-xs">+{formatPrice(variant.price)}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-warm-200 rounded-xl overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="w-12 text-center text-sm font-medium text-warm-950" aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
                  aria-label="Increase quantity"
                >+</button>
              </div>

              {/* Add to Cart */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={isOutOfStock}
                loading={adding}
                onClick={handleAddToCart}
                leftIcon={added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                className={added ? '!bg-success' : undefined}
              >
                {added ? 'Added to Bag!' : isOutOfStock ? 'Out of Stock' : `Add to Bag — ${formatPrice(finalPrice * quantity)}`}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-warm-200">
              {[
                { icon: Truck, label: 'Free delivery\nover ₹5,000' },
                { icon: RefreshCw, label: '30-day\nreturns' },
                { icon: Shield, label: 'Secure\ncheckout' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon className="h-5 w-5 text-warm-400" />
                  <span className="text-xs text-warm-500 leading-tight whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <Accordion items={accordionItems} defaultOpen="details" />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-warm-200" aria-labelledby="related-heading">
            <div className="flex items-center justify-between mb-8">
              <h2 id="related-heading" className="heading-3">You might also like</h2>
              <Link href={`/shop?category=${product.category}`} className="text-sm text-warm-500 hover:text-warm-950 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
