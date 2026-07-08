// ============================================================
// Rose Bud — Core Types
// ============================================================

export type Category = 'candles' | 'diffusers' | 'room-sprays' | 'bath';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'scent';
  price: number; // price delta from base
  stock: number;
  sku: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // base price in cents
  compareAtPrice?: number; // original price if on sale
  category: Category;
  tags: string[]; // scent notes / tags
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number; // 1-5
  reviewCount: number;
  stock: number; // total stock (sum of variants or flat)
  bestseller?: boolean;
  featured?: boolean;
  isNew?: boolean;
  details: string[];
  shippingInfo: string;
  returnPolicy: string;
  ingredients?: string;
  createdAt: string;
}

// ============================================================
// Cart
// ============================================================

export interface CartItem {
  product: Product;
  variantId?: string;
  quantity: number;
  unitPrice: number; // resolved price at time of add
}

export interface Cart {
  items: CartItem[];
  promoCode?: string;
  promoDiscount?: number; // amount off in cents
}

// ============================================================
// Order
// ============================================================

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'declined';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  estimatedDays: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  status: OrderStatus;
  promoCode?: string;
  createdAt: string;
  estimatedDelivery: string;
}

// ============================================================
// Filters & Sort
// ============================================================

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'rating'
  | 'bestselling';

export interface FilterState {
  categories: Category[];
  minPrice: number;
  maxPrice: number;
  tags: string[];
  inStockOnly: boolean;
  minRating: number;
  sort: SortOption;
  search: string;
  page: number;
}

// ============================================================
// UI
// ============================================================

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface CheckoutStep {
  id: number;
  label: string;
  completed: boolean;
}

// ============================================================
// API Responses
// ============================================================

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message: string;
}
