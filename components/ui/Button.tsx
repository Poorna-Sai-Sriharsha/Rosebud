'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  // 'as' prop is not supported — use href for link behavior
}

// ─── Variant Map ──────────────────────────────────────────
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-warm-950 text-white hover:bg-warm-800 focus-visible:ring-warm-950 shadow-sm hover:shadow-md',
  secondary:
    'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-sm',
  outline:
    'bg-transparent border border-warm-950 text-warm-950 hover:bg-warm-950 hover:text-white focus-visible:ring-warm-950',
  ghost:
    'bg-transparent text-warm-700 hover:bg-warm-100 hover:text-warm-950 focus-visible:ring-warm-400',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500 shadow-sm',
  danger:
    'bg-error text-white hover:bg-error-dark focus-visible:ring-error shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:   'h-9 px-4 text-xs gap-1.5',
  md:   'h-11 px-6 text-sm gap-2',
  lg:   'h-13 px-8 text-base gap-2.5',
  icon: 'h-11 w-11 p-0',
};

// ─── Button Component ─────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseClass = cn(
      'inline-flex items-center justify-center font-sans font-medium rounded-full',
      'transition-all duration-250 ease-elegant',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'active:scale-95 select-none',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',
      className
    );

    const content = (
      <>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && <span aria-hidden="true">{leftIcon}</span>
        )}
        {size !== 'icon' && children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </>
    );

    if (props.href) {
      return (
        <Link 
          href={props.href as string} 
          className={baseClass} 
          aria-disabled={isDisabled}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={baseClass}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
