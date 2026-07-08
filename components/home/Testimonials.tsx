'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sophie L.',
    location: 'London',
    rating: 5,
    review:
      'Amber Solstice has completely transformed my evenings. I light it every night after dinner and it\'s become my favourite ritual. The scent is sophisticated without being overwhelming — exactly what I\'d been searching for.',
    product: 'Amber Solstice Candle',
    verified: true,
  },
  {
    id: 2,
    name: 'James H.',
    location: 'Edinburgh',
    rating: 5,
    review:
      'Bought the Discovery Set as a gift and ended up keeping it for myself. The quality of the candles is exceptional — even burning is consistent, the scent throw is impressive, and the vessels are genuinely beautiful.',
    product: 'Discovery Set',
    verified: true,
  },
  {
    id: 3,
    name: 'Maya R.',
    location: 'Manchester',
    rating: 5,
    review:
      'The Rose Body Oil is the most beautiful product I own. It absorbs instantly, smells like a luxury perfume, and my skin has never been more luminous. Worth every penny.',
    product: 'Rose & Marula Body Oil',
    verified: true,
  },
  {
    id: 4,
    name: 'Charlotte P.',
    location: 'Bristol',
    rating: 5,
    review:
      'The Hinoki & Cedar diffuser turned my bathroom into a spa. It\'s been going strong for three months and still fills the room every morning. Absolutely worth it.',
    product: 'Hinoki & Cedar Diffuser',
    verified: true,
  },
];

const PRESS = [
  { name: 'The Times', quote: '"The candles that launched a thousand imitators"' },
  { name: 'Vogue Living', quote: '"Our favourite home fragrance of the year"' },
  { name: 'Harper\'s Bazaar', quote: '"Extraordinary quality at an accessible price"' },
  { name: 'Wallpaper*', quote: '"The fragrance edit your home deserves"' },
];

export function Testimonials() {
  return (
    <section className="section bg-white" aria-labelledby="testimonials-heading">
      <div className="container-rb">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="label-overline mb-3">Reviews</p>
          <h2 id="testimonials-heading" className="heading-2">
            What our customers say
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-warm-50 rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary-500 text-primary-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-warm-700 leading-relaxed italic">
                &ldquo;{t.review}&rdquo;
              </blockquote>

              {/* Attribution */}
              <footer className="mt-auto pt-4 border-t border-warm-200">
                <p className="text-xs font-semibold text-warm-900">{t.name}</p>
                <p className="text-xs text-warm-500">{t.location} · {t.product}</p>
                {t.verified && (
                  <p className="text-[10px] text-success mt-0.5">✓ Verified purchase</p>
                )}
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Press Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-warm-200 pt-12"
        >
          <p className="label-overline text-center mb-8">As featured in</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESS.map(({ name, quote }) => (
              <div key={name} className="text-center px-4">
                <p className="font-serif text-lg text-warm-700 mb-2">{name}</p>
                <p className="text-xs text-warm-400 italic leading-relaxed">{quote}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
