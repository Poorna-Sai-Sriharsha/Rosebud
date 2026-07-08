import type { Order, OrderItem, ShippingAddress, ShippingMethod } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// In-memory order store for demo purposes
// On Vercel (ephemeral filesystem), orders live in this map
// during the server session. Client-side localStorage also
// stores order IDs for the order history page.
// ============================================================

declare global {
  // eslint-disable-next-line no-var
  var orderStore: Map<string, Order> | undefined;
}

const orderStore = global.orderStore || new Map<string, Order>();
if (process.env.NODE_ENV !== 'production') {
  global.orderStore = orderStore;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Royal Mail Tracked 48',
    price: 39500,
    estimatedDays: '3–5 business days',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Royal Mail Tracked 24',
    price: 69500,
    estimatedDays: '1–2 business days',
  },
  {
    id: 'free',
    name: 'Free Standard Delivery',
    description: 'Royal Mail Tracked 48 (orders over ₹5,000)',
    price: 0,
    estimatedDays: '3–5 business days',
  },
];

export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10, // 10% off
  ROSEBUD15: 15, // 15% off
  LAUNCH20: 20, // 20% off
};

// ─── Create Order ─────────────────────────────────────────

export function createOrder(data: {
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  promoCode?: string;
}): Order {
  const now = new Date();
  const deliveryDate = new Date(now);
  const method = data.shippingMethod;
  const daysToAdd = method.id === 'express' ? 2 : 5;
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

  const order: Order = {
    id: `RB-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`,
    ...data,
    status: 'processing',
    createdAt: now.toISOString(),
    estimatedDelivery: deliveryDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

  orderStore.set(order.id, order);
  return order;
}

// ─── Get Order ────────────────────────────────────────────

export function getOrder(id: string): Order | undefined {
  return orderStore.get(id);
}

// ─── Validate Promo Code ─────────────────────────────────

export function validatePromoCode(
  code: string,
  subtotal: number
): { valid: boolean; discount: number; message?: string } {
  const normalised = code.trim().toUpperCase();
  const pct = PROMO_CODES[normalised];

  if (!pct) {
    return { valid: false, discount: 0, message: 'This promo code is not valid.' };
  }
  const discount = Math.round(subtotal * (pct / 100));
  return {
    valid: true,
    discount,
    message: `${pct}% discount applied!`,
  };
}

// ─── Mock Payment Processing ──────────────────────────────

const SUCCESS_CARDS = ['4242424242424242', '4111111111111111'];
const DECLINE_CARDS = ['4000000000000002', '4000000000009995'];

export function processMockPayment(cardNumber: string): {
  success: boolean;
  errorCode?: string;
  message: string;
} {
  const stripped = cardNumber.replace(/\s/g, '');

  if (SUCCESS_CARDS.includes(stripped)) {
    return { success: true, message: 'Payment authorised.' };
  }
  if (DECLINE_CARDS.includes(stripped)) {
    return {
      success: false,
      errorCode: 'card_declined',
      message: 'Your card was declined. Please try a different payment method.',
    };
  }
  // All other valid-length numbers succeed in demo mode
  if (stripped.length >= 13 && stripped.length <= 19) {
    return { success: true, message: 'Payment authorised.' };
  }
  return {
    success: false,
    errorCode: 'invalid_number',
    message: 'Please enter a valid card number.',
  };
}
