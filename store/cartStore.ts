import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string;
  promoDiscount: number;

  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyPromo: (code: string, discount: number) => void;
  clearPromo: () => void;

  // Computed getters (as actions for simplicity)
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemKey: (productId: string, variantId?: string) => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: '',
      promoDiscount: 0,

      getItemKey: (productId, variantId) =>
        variantId ? `${productId}::${variantId}` : productId,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const key = get().getItemKey(product.id, variant?.id);
          const existing = state.items.find(
            (i) => get().getItemKey(i.product.id, i.variantId) === key
          );
          const unitPrice = product.price + (variant?.price ?? 0);

          if (existing) {
            return {
              items: state.items.map((i) =>
                get().getItemKey(i.product.id, i.variantId) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                variantId: variant?.id,
                quantity,
                unitPrice,
              },
            ],
          };
        });
      },

      removeItem: (productId, variantId) => {
        const key = get().getItemKey(productId, variantId);
        set((state) => ({
          items: state.items.filter(
            (i) => get().getItemKey(i.product.id, i.variantId) !== key
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, variantId);
          return;
        }
        const key = get().getItemKey(productId, variantId);
        set((state) => ({
          items: state.items.map((i) =>
            get().getItemKey(i.product.id, i.variantId) === key
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: '', promoDiscount: 0 }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      applyPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),
      clearPromo: () => set({ promoCode: '', promoDiscount: 0 }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      getTotal: () => {
        const sub = get().getSubtotal();
        return Math.max(0, sub - get().promoDiscount);
      },
    }),
    {
      name: 'rosebud-cart',
      // Don't persist isOpen state
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    }
  )
);
