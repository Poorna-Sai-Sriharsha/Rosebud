import { create } from 'zustand';
import type { Toast } from '@/types';
import { generateId } from '@/lib/utils';

interface UIState {
  toasts: Toast[];
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;

  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Nav
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;

  // Search
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  toasts: [],
  isMobileNavOpen: false,
  isSearchOpen: false,

  addToast: (toast) => {
    const id = generateId();
    const newToast: Toast = { id, duration: 4000, ...toast };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto-remove
    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration ?? 4000);
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
