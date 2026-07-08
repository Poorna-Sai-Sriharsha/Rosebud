'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { Order } from '@/types';

interface Props {
  params: { id: string };
}

export default function OrderConfirmationPage({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
        else setError('Order not found.');
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load order details.');
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-warm-500">Loading your order…</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center text-center px-4">
        <div className="max-w-sm">
          <h1 className="font-serif text-3xl text-warm-900 mb-4">Order not found</h1>
          <p className="text-warm-500 mb-8">{error || 'This order may have expired from the demo session.'}</p>
          <Button href="/shop" variant="primary">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="container-rb py-16 max-w-2xl">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="text-center mb-12"
        >
          <div className="relative inline-flex mb-6">
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ repeat: 3, duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 bg-success rounded-full"
            />
            <div className="relative w-20 h-20 bg-success rounded-full flex items-center justify-center">
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="font-serif text-4xl text-warm-950 mb-2">Order Confirmed</h1>
            <p className="text-warm-500">
              Thank you, <strong>{order.shippingAddress.firstName}</strong>. Your order is on its way.
            </p>
          </motion.div>
        </motion.div>

        {/* Order Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 mb-6"
        >
          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-warm-100">
            <div>
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1">Order Number</p>
              <p className="font-mono text-sm font-semibold text-warm-950">{order.id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1">Estimated Delivery</p>
              <p className="text-sm text-warm-900">{order.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1">Shipping To</p>
              <p className="text-sm text-warm-700">
                {order.shippingAddress.address1}, {order.shippingAddress.city}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1">Confirmation sent to</p>
              <p className="text-sm text-warm-700">{order.shippingAddress.email}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="flex flex-col gap-4 mb-6">
            {order.items.map((item) => (
              <div key={`${item.productId}::${item.variantId}`} className="flex gap-4 items-center">
                <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-warm-100 flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-warm-900">{item.productName}</p>
                  {item.variantName && <p className="text-xs text-warm-400">{item.variantName}</p>}
                  <p className="text-xs text-warm-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-warm-950">{formatPrice(item.unitPrice * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-warm-100 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-warm-600">
              <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-success">
                <span>Discount</span><span>−{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-warm-600">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm text-warm-600">
              <span>VAT (20%)</span><span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-serif text-lg text-warm-950 pt-2 border-t border-warm-200">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 mb-8"
        >
          <h2 className="font-serif text-lg mb-4">What happens next?</h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: CheckCircle2, label: 'Order confirmed', done: true },
              { icon: Package, label: 'Order being prepared', done: false },
              { icon: Truck, label: `Shipping via ${order.shippingMethod.name}`, done: false },
            ].map(({ icon: Icon, label, done }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-success text-white' : 'bg-warm-100 text-warm-400'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-sm ${done ? 'text-warm-900 font-medium' : 'text-warm-400'}`}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="primary" href="/shop" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Continue Shopping
          </Button>
          <Button variant="outline" href="/account">
            View Order History
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
