'use client';

import Link from 'next/link';
import { Leaf, Instagram, Twitter, Mail } from 'lucide-react';

const LINKS = {
  shop: [
    { href: '/shop?category=candles', label: 'Candles' },
    { href: '/shop?category=diffusers', label: 'Diffusers' },
    { href: '/shop?category=room-sprays', label: 'Room Sprays' },
    { href: '/shop?category=bath', label: 'Bath & Body' },
    { href: '/shop', label: 'All Products' },
  ],
  brand: [
    { href: '/about', label: 'Our Story' },
    { href: '/about#sustainability', label: 'Sustainability' },
    { href: '/about#ingredients', label: 'Ingredients' },
  ],
  help: [
    { href: '/account', label: 'My Account' },
    { href: '/account#orders', label: 'Order Tracking' },
    { href: '#returns', label: 'Returns & Exchanges' },
    { href: '#faq', label: 'FAQ' },
  ],
};

const SOCIALS = [
  { href: '#', label: 'Instagram', icon: Instagram },
  { href: '#', label: 'Twitter', icon: Twitter },
  { href: 'mailto:hello@rosebud.co', label: 'Email', icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-warm-950 text-warm-300">
      {/* Main Footer */}
      <div className="container-rb py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group" aria-label="Rose Bud">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center group-hover:bg-primary-400 transition-colors">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-serif text-xl text-white">Rose Bud</span>
            </Link>
            <p className="text-sm text-warm-400 leading-relaxed mb-6 max-w-xs">
              Quiet luxury meets everyday ritual. Curated home fragrance, candles, and botanical lifestyle products made with intention.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-warm-800 flex items-center justify-center text-warm-400 hover:text-white hover:bg-warm-700 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold text-warm-500 tracking-ultra uppercase mb-4">
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-xs font-semibold text-warm-500 tracking-ultra uppercase mb-4">
              Brand
            </h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS.brand.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-semibold text-warm-500 tracking-ultra uppercase mb-4">
              Help
            </h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS.help.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-800">
        <div className="container-rb py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-600 text-center sm:text-left">
            © {new Date().getFullYear()} Rose Bud. All rights reserved. This is a demo site — no real products or payments are processed.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-warm-600 hover:text-warm-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-warm-600 hover:text-warm-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
