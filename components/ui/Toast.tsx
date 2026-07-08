'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import type { Toast } from '@/types';

// ─── Icon Map ─────────────────────────────────────────────
const iconMap = {
  success: CheckCircle2,
  error:   AlertCircle,
  info:    Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'border-success bg-success-light text-success-dark',
  error:   'border-error bg-error-light text-error',
  info:    'border-info bg-info-light text-info-dark',
  warning: 'border-warning bg-warning-light text-warning-dark',
};

const iconColorMap = {
  success: 'text-success',
  error:   'text-error',
  info:    'text-info',
  warning: 'text-warning',
};

// ─── Single Toast ─────────────────────────────────────────
function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUIStore((s) => s.removeToast);
  const Icon = iconMap[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={cn(
        'pointer-events-auto flex items-start gap-3 w-full max-w-sm',
        'rounded-2xl border p-4 shadow-lg',
        colorMap[toast.type]
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColorMap[toast.type])} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug">{toast.title}</p>
        {toast.message && (
          <p className="text-sm mt-0.5 opacity-80 leading-snug">{toast.message}</p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Toast Container ──────────────────────────────────────
export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Hook for easy toast creation ────────────────────────
export function useToast() {
  const addToast = useUIStore((s) => s.addToast);
  return {
    toast: addToast,
    success: (title: string, message?: string) => addToast({ type: 'success', title, message }),
    error:   (title: string, message?: string) => addToast({ type: 'error',   title, message }),
    info:    (title: string, message?: string) => addToast({ type: 'info',    title, message }),
    warning: (title: string, message?: string) => addToast({ type: 'warning', title, message }),
  };
}
