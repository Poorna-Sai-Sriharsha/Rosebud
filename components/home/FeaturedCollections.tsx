'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  candles:
    'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80',
  diffusers:
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80',
  bath: 'https://images.unsplash.com/photo-1583248352195-d3a8e766edf2?auto=format&fit=crop&q=80',
  'room-sprays':
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80',
};

const CATEGORIES = [
  { slug: 'candles', label: 'Candles', tagline: 'Hand-poured luxury' },
  { slug: 'diffusers', label: 'Diffusers', tagline: 'Months of fragrance' },
  { slug: 'room-sprays', label: 'Room Sprays', tagline: 'Instant atmosphere' },
  { slug: 'bath', label: 'Bath & Body', tagline: 'Ritual self-care' },
];

interface FeaturedCollectionsProps {
  products: Product[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCollections({ products }: FeaturedCollectionsProps) {
  return (
    <section className="section bg-white" aria-labelledby="collections-heading">
      <div className="container-rb">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="label-overline mb-3">Collections</p>
          <h2 id="collections-heading" className="heading-2">
            Shop by category
          </h2>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {CATEGORIES.map(({ slug, label, tagline }) => (
            <motion.div key={slug} variants={itemVariants}>
              <Link
                href={`/shop?category=${slug}`}
                className="group relative block rounded-2xl overflow-hidden aspect-[3/4] bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`Shop ${label}`}
              >
                {/* Image */}
                <Image
                  src={CATEGORY_IMAGES[slug]}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-950/70 via-warm-950/10 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <p className="text-xs text-warm-300 mb-0.5 font-medium">{tagline}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-white">{label}</h3>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="text-white"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products Strip */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 lg:mt-24"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label-overline mb-2">Featured</p>
                <h2 className="heading-3">Just arrived</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-warm-600 hover:text-warm-950 transition-colors group"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Simple featured card (no quick-add, cleaner look) ────
function FeaturedProductCard({ product }: { product: Product }) {
  return (
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="px-1">
        <h3 className="font-serif text-base text-warm-950 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-warm-600 mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
