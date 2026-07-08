/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export function OrderList({ serverOrders }: { serverOrders: any[] }) {
  const [orders, setOrders] = useState<any[]>(serverOrders);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load local orders from localStorage
    try {
      const localData = localStorage.getItem('rb-orders');
      if (localData) {
        const localOrders = JSON.parse(localData);
        // Only keep full order objects (filter out old string IDs)
        const validLocalOrders = localOrders.filter((o: any) => typeof o === 'object' && o.id);
        
        // Merge with server orders, deduplicating by ID
        const merged = [...validLocalOrders, ...serverOrders];
        const uniqueOrders = Array.from(new Map(merged.map(item => [item.id, item])).values());
        
        // Sort by date descending
        uniqueOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(uniqueOrders);
      }
    } catch (e) {
      console.error('Failed to parse local orders', e);
    }
  }, [serverOrders]);

  if (!mounted) return <div className="animate-pulse h-32 bg-warm-100 rounded-2xl" />;

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="h-7 w-7 text-warm-400" />
        </div>
        <h2 className="font-serif text-xl text-warm-800 mb-2">No orders yet</h2>
        <p className="text-warm-500 mb-6">
          Complete a checkout to see your order history here.
        </p>
        <Button href="/shop" variant="primary">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/order/${order.id}`}
          className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-card-hover transition-shadow group"
        >
          <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-warm-500" />
          </div>
          <div className="flex-1">
            <p className="font-mono text-sm font-semibold text-warm-950">{order.id}</p>
            <p className="text-sm text-warm-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()} &middot; {order.items?.length || 0} items &middot; {formatPrice(order.total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm-100 text-warm-800 capitalize">
              {order.status || 'processing'}
            </span>
            <span className="text-warm-400 group-hover:text-warm-950 transition-colors">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
