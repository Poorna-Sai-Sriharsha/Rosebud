import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'How Rose Bud began â€” a brand built on the belief that beautiful scent is an everyday necessity.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/about/1600/900"
          alt="Sunlit workshop with botanicals and candle-making equipment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-950/30 to-warm-950/70" />
        <div className="absolute inset-0 flex items-end pb-16 container-rb">
          <div className="text-white">
            <p className="label-overline text-warm-300 mb-3">Our Story</p>
            <h1 className="heading-1 max-w-lg">The brand behind the scent</h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-rb max-w-3xl">
          <div className="prose-rosebud">
            <p className="body-lg mb-6 text-warm-700">
              Rose Bud began in a small studio flat in East London in 2019. Our founder, having just returned from a transformative trip through Provence and Morocco, found herself surrounded by fragments of extraordinary fragrance — sun-dried lavender, cedar smoke, orange blossom in the morning heat — and deeply unsatisfied with what was available at home.
            </p>
            <p className="body-md mb-6 text-warm-600">
              The proposition that good fragrance was either unaffordably luxurious or compromisingly synthetic felt wrong. She started experimenting with a small kitchen counter, learning to blend, to pour, to formulate. The first Amber Solstice candle was made for a friend&apos;s birthday. The response — &ldquo;where can I buy more of this?&rdquo; — started everything.
            </p>

            <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { num: '2019', label: 'Founded' },
                { num: '24+', label: 'Products' },
                { num: '₹0', label: 'Greenwashing budget' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center p-6 bg-warm-50 rounded-2xl">
                  <div className="font-serif text-4xl text-warm-950 mb-1">{num}</div>
                  <div className="text-sm text-warm-500">{label}</div>
                </div>
              ))}
            </div>

            <h2 id="sustainability" className="font-serif text-3xl text-warm-950 mt-12 mb-4">Sustainability</h2>
            <p className="body-md mb-4 text-warm-600">
              Every decision we make is filtered through a single question: would we be comfortable explaining this to our customers? Our coconut-soy wax blend is certified sustainable. Our packaging is either recycled, recyclable, or reusable. Our fragrance oils are phthalate-free and IFRA compliant. We do not use natural animal-derived ingredients.
            </p>

            <h2 id="ingredients" className="font-serif text-3xl text-warm-950 mt-12 mb-4">Ingredients</h2>
            <p className="body-md mb-4 text-warm-600">
              We believe in full transparency. Every ingredient in every Rose Bud product is listed on our website and on the product. We use botanical essential oils and high-quality aroma compounds &mdash; never synthetics passed off as natural, never hidden behind vague &ldquo;fragrance&rdquo; listings.
            </p>

            <div className="mt-12 p-8 bg-warm-950 text-white rounded-3xl text-center">
              <h3 className="font-serif text-2xl mb-3">Start your ritual today</h3>
              <p className="text-warm-300 mb-6">Find a fragrance that feels like home.</p>
              <Button href="/shop" variant="secondary" size="lg">
                Shop the Collection
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

