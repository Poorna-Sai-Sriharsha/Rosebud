'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-warm-50"
      aria-label="Hero"
    >
      {/* Background decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-50/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container-rb relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24 lg:py-0 min-h-[100dvh]">
        {/* Text Content */}
        <div className="flex flex-col gap-8 max-w-lg">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-overline"
          >
            Premium Home Fragrance
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-1 text-balance"
          >
            Quiet luxury,{' '}
            <span className="italic text-primary-600">every day</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg max-w-md"
          >
            Curated candles, diffusers, and botanical lifestyle products crafted for those who believe that beautiful scent is an everyday necessity, not an occasion.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              href="/shop"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" href="/about">
              Our Story
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 pt-2"
          >
            {[
              { num: '24+', label: 'Curated Scents' },
              { num: '2K+', label: 'Happy Customers' },
              { num: '4.8★', label: 'Average Rating' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-serif text-xl text-warm-950">{num}</div>
                <div className="text-xs text-warm-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[640px] h-80 rounded-3xl overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"
            alt="Rose Bud candle on marble surface with botanicals"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🌿</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-warm-950">Amber Solstice</p>
                <p className="text-xs text-warm-500">Our bestselling candle — ₹4,800</p>
              </div>
              <Link
                href="/product/amber-solstice-candle"
                className="ml-auto flex-shrink-0 btn-primary btn-sm"
              >
                Shop
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-warm-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-warm-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

