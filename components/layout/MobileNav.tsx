'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Leaf, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

const sideLinks = [
  { href: '/account', label: 'My Account' },
  { href: '/about', label: 'Our Story' },
];

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-warm-950/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            id="mobile-nav"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-warm-50 shadow-2xl flex flex-col lg:hidden"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-warm-200">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                  <Leaf className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-serif text-xl">Rose Bud</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="flex flex-col gap-1">
                {links.map(({ href, label }, i) => {
                  const isActive = pathname === href || pathname.startsWith(href.split('?')[0]);
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={href}
                        onClick={onClose}
                        className={cn(
                          'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                          isActive
                            ? 'bg-warm-100 text-warm-950'
                            : 'text-warm-700 hover:bg-warm-100 hover:text-warm-950'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-warm-200 flex flex-col gap-1">
                {sideLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (links.length + i) * 0.05 + 0.15 }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-warm-500 hover:text-warm-950 hover:bg-warm-100 transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer strip */}
            <div className="px-6 py-5 border-t border-warm-200 bg-warm-100">
              <p className="text-xs text-warm-500">
                Free delivery on orders over ₹5,000
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
