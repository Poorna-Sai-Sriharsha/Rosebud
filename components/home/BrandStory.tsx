'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="section bg-warm-950 text-white overflow-hidden" aria-labelledby="brand-story-heading">
      <div className="container-rb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[480px] lg:h-[600px]">
              {/* Main image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/brand1/800/800"
                  alt="Artisan hands pouring rose petal candle wax in a sunlit workshop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent image */}
              <div className="absolute -bottom-6 -right-6 w-44 h-52 rounded-2xl overflow-hidden border-4 border-warm-950 shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/brand2/800/800"
                  alt="Rose petals and botanical ingredients"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <p className="label-overline text-warm-500">Our Philosophy</p>
            <h2 id="brand-story-heading" className="heading-2 text-white">
              Scent is the closest{' '}
              <span className="italic text-primary-400">thing to memory</span>
            </h2>
            <p className="body-lg text-warm-300">
              Rose Bud began in a small studio flat in East London, where our founder discovered that the right fragrance could transform an ordinary Tuesday into something extraordinary.
            </p>
            <p className="text-base text-warm-400 leading-relaxed">
              Every product is formulated with premium, responsibly sourced ingredients. We believe in transparency — in both our supply chain and our ingredient lists. No hidden chemicals, no greenwashing, no compromise.
            </p>

            {/* Values strip */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-warm-800">
              {[
                { icon: '🌿', label: 'Botanical\nIngredients' },
                { icon: '♻️', label: 'Sustainable\nPackaging' },
                { icon: '🐰', label: 'Vegan &\nCruelty-Free' },
              ].map(({ icon, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-xs text-warm-400 leading-tight whitespace-pre-line">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors group"
            >
              Read our full story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
