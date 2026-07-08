'use client';

import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'outline' | 'new' | 'sale' | 'bestseller';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:    'bg-warm-100 text-warm-700',
  primary:    'bg-primary-100 text-primary-700',
  accent:     'bg-accent-100 text-accent-600',
  success:    'bg-success-light text-success-dark',
  error:      'bg-error-light text-error',
  warning:    'bg-warning-light text-warning-dark',
  outline:    'border border-warm-300 text-warm-600 bg-transparent',
  new:        'bg-accent-500 text-white',
  sale:       'bg-error text-white',
  bestseller: 'bg-primary-500 text-white',
};

export function Badge({ variant = 'default', size = 'md', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-sans font-semibold tracking-wide rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
