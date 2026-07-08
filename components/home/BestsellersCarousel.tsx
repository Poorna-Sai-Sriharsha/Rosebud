'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface BestsellersCarouselProps {
  products: Product[];
}

export function BestsellersCarousel({ products }: BestsellersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section bg-warm-50" aria-labelledby="bestsellers-heading">
      <div className="container-rb">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="label-overline mb-2">Most Loved</p>
            <h2 id="bestsellers-heading" className="heading-2">
              Our bestsellers
            </h2>
          </div>

          {/* Scroll Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:border-warm-400 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center text-warm-500 hover:text-warm-950 hover:border-warm-400 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex-none w-64 snap-start"
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
              >
                <div className="relative aspect-product rounded-2xl overflow-hidden bg-warm-100 mb-3">
                  <Image
                    src={product.images[0]?.url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="260px"
                  />
                </div>
                <div className="px-1 flex flex-col gap-1">
                  <h3 className="font-serif text-sm text-warm-950 group-hover:text-primary-600 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary-500 text-primary-500" />
                    <span className="text-xs text-warm-500">{product.rating} ({product.reviewCount})</span>
                  </div>
                  <span className="text-sm font-semibold text-warm-950">{formatPrice(product.price)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/shop?sort=bestselling"
            className="btn-outline btn"
          >
            View All Bestsellers
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
