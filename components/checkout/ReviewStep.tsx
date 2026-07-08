import Image from 'next/image';
import { Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StepPanel, ReviewSection } from './shared';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ShippingAddress, ShippingMethod, CartItem } from '@/types';

export function ReviewStep({
  address,
  resolvedShipping,
  card,
  items,
  total,
  processing,
  paymentError,
  placeOrder,
  prevStep,
  setStep,
}: {
  address: ShippingAddress;
  resolvedShipping: ShippingMethod;
  card: { number: string };
  items: CartItem[];
  total: number;
  processing: boolean;
  paymentError: string;
  placeOrder: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}) {
  return (
    <StepPanel title="Review & Place Order">
      <ReviewSection title="Delivery Address" onEdit={() => setStep(1)}>
        <p className="text-sm text-warm-700">
          {address.firstName} {address.lastName}
          <br />
          {address.address1}
          {address.address2 ? `, ${address.address2}` : ''}
          <br />
          {address.city}, {address.zip}
          <br />
          {address.country}
        </p>
      </ReviewSection>

      <ReviewSection title="Shipping Method" onEdit={() => setStep(2)}>
        <p className="text-sm text-warm-700">
          {resolvedShipping.name} — {resolvedShipping.estimatedDays}
        </p>
      </ReviewSection>

      <ReviewSection title="Payment" onEdit={() => setStep(3)}>
        <p className="text-sm text-warm-700 font-mono">
          •••• •••• •••• {card.number.replace(/\s/g, '').slice(-4)}
        </p>
      </ReviewSection>

      <div className="border border-warm-200 rounded-2xl overflow-hidden divide-y divide-warm-100 mb-6 mt-4">
        {items.map((item) => (
          <div key={`${item.product.id}::${item.variantId}`} className="flex gap-3 p-4">
            <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-warm-100 flex-shrink-0">
              <Image
                src={item.product.images[0]?.url}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-warm-900">{item.product.name}</p>
              <p className="text-xs text-warm-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-warm-900 self-center">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {paymentError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 bg-error-light border border-error/20 rounded-xl p-4 mb-4 text-sm text-error"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {paymentError}
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={prevStep}>
          ← Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          loading={processing}
          onClick={placeOrder}
          leftIcon={<Lock className="h-4 w-4" />}
        >
          {processing ? 'Processing…' : `Place Order — ${formatPrice(total)}`}
        </Button>
      </div>

      <p className="text-xs text-warm-400 text-center mt-4">Demo mode — no real charge is made</p>
    </StepPanel>
  );
}
