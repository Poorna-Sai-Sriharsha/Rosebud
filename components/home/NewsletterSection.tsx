'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="section-sm bg-primary-50" aria-labelledby="newsletter-heading">
      <div className="container-rb">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="label-overline mb-3">Newsletter</p>
          <h2 id="newsletter-heading" className="heading-3 mb-3">
            Scent notes and rituals
          </h2>
          <p className="body-md mb-8">
            New arrivals, seasonal stories, exclusive early access, and the occasional ritual inspiration. Delivered gently — never more than twice a month.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
              <p className="font-serif text-lg text-warm-900">Thank you for subscribing</p>
              <p className="text-sm text-warm-600">Check your inbox for a welcome note.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-warm-300 bg-white px-4 py-3 text-sm text-warm-950 placeholder-warm-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn whitespace-nowrap flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-spin-slow">◌</span>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-xs text-warm-400 mt-4">
            No spam. Unsubscribe anytime. We take your privacy seriously.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
