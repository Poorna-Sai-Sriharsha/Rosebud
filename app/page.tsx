import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestsellersCarousel } from '@/components/home/BestsellersCarousel';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getFeaturedProducts, getBestsellers } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Rose Bud — Premium Home Fragrance & Botanical Lifestyle',
  description:
    'Discover curated home fragrance, candles, reed diffusers, and botanical lifestyle products. Quiet luxury meets everyday ritual.',
};

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const bestsellers = getBestsellers(8);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturedCollections products={featured} />
      <BrandStory />
      <BestsellersCarousel products={bestsellers} />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
}
