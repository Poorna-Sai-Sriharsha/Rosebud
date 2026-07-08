'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, User, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/lib/orders';
import type { ShippingAddress, ShippingMethod, OrderItem } from '@/types';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { ContactStep } from '@/components/checkout/ContactStep';
import { ShippingStep } from '@/components/checkout/ShippingStep';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { ReviewStep } from '@/components/checkout/ReviewStep';
import { SummaryRow } from '@/components/checkout/shared';

const STEPS = [
  { id: 1, label: 'Contact', icon: User },
  { id: 2, label: 'Shipping', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: Check },
];

const initialAddress: ShippingAddress = {
  firstName: '', lastName: '', email: '', phone: '',
  address1: '', address2: '', city: '', state: '', zip: '', country: 'GB',
};

const initialCard = { number: '', expiry: '', cvc: '', name: '' };

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, getSubtotal, getItemCount, promoDiscount, promoCode, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<ShippingAddress>(initialAddress);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [card, setCard] = useState(initialCard);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Pre-fill contact details from session on mount
  useEffect(() => {
    if (session?.user) {
      setAddress((prev) => ({
        ...prev,
        email: session.user.email ?? prev.email,
        firstName: session.user.name?.split(' ')[0] ?? prev.firstName,
        lastName: session.user.name?.split(' ').slice(1).join(' ') ?? prev.lastName,
      }));
    }
  }, [session]);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const qualifiesForFreeShipping = subtotal >= 500000;
  const resolvedShipping = qualifiesForFreeShipping
    ? SHIPPING_METHODS.find((m) => m.id === 'free') ?? SHIPPING_METHODS[0]
    : shippingMethod;
  const tax = Math.round(subtotal * 0.2);
  const total = Math.max(0, subtotal - promoDiscount + resolvedShipping.price + tax);

  useEffect(() => {
    if (itemCount === 0 && !orderPlaced) router.replace('/cart');
  }, [itemCount, orderPlaced, router]);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!address.firstName.trim()) e.firstName = 'First name is required';
    if (!address.lastName.trim())  e.lastName  = 'Last name is required';
    if (!address.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!address.address1.trim()) e.address1 = 'Address is required';
    if (!address.city.trim())     e.city = 'City is required';
    if (!address.zip.trim())      e.zip  = 'Postcode is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    const stripped = card.number.replace(/\s/g, '');
    if (stripped.length < 13) e.cardNumber = 'Enter a valid card number';
    if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Enter expiry (MM/YY)';
    if (card.cvc.length < 3) e.cvc = 'Enter CVC';
    if (!card.name.trim()) e.cardName = 'Name on card required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((s) => Math.min(s + 1, 4));
    setErrors({});
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
    setPaymentError('');
  };

  const placeOrder = async () => {
    setProcessing(true);
    setPaymentError('');

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productSlug: item.product.slug,
      variantId: item.variantId,
      variantName: item.product.variants.find((v) => v.id === item.variantId)?.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      imageUrl: item.product.images[0]?.url ?? '',
    }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          subtotal,
          shippingCost: resolvedShipping.price,
          tax,
          discount: promoDiscount,
          total,
          shippingAddress: address,
          shippingMethod: resolvedShipping,
          promoCode,
          cardNumber: card.number,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPaymentError(data.message ?? 'Payment failed. Please try again.');
        setProcessing(false);
        return;
      }

      const existing = JSON.parse(localStorage.getItem('rb-orders') ?? '[]');
      localStorage.setItem('rb-orders', JSON.stringify([data.order, ...existing]));

      setOrderPlaced(true);
      clearCart();
      router.push(`/order/${data.order.id}`);
    } catch {
      setPaymentError('Network error. Please check your connection and try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="container-rb py-8 lg:py-12">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-serif text-xl text-warm-950">Rose Bud</Link>
          <div className="flex items-center gap-1.5 text-xs text-warm-500">
            <Lock className="h-3.5 w-3.5" />
            Secure Checkout
          </div>
        </div>

        <StepIndicator steps={STEPS} currentStep={step} setStep={setStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <ContactStep key="step1" address={address} setAddress={setAddress} errors={errors} nextStep={nextStep} />
              )}
              {step === 2 && (
                <ShippingStep
                  key="step2"
                  shippingMethod={shippingMethod}
                  setShippingMethod={setShippingMethod}
                  qualifiesForFreeShipping={qualifiesForFreeShipping}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}
              {step === 3 && (
                <PaymentStep
                  key="step3"
                  card={card}
                  setCard={setCard}
                  errors={errors}
                  paymentError={paymentError}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}
              {step === 4 && (
                <ReviewStep
                  key="step4"
                  address={address}
                  resolvedShipping={resolvedShipping}
                  card={card}
                  items={items}
                  total={total}
                  processing={processing}
                  paymentError={paymentError}
                  placeOrder={placeOrder}
                  prevStep={prevStep}
                  setStep={setStep}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 sticky top-24">
              <h2 className="font-serif text-lg mb-4">Order Summary</h2>
              <div className="flex flex-col gap-3 mb-4 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}::${item.variantId}`} className="flex gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-warm-100 flex-shrink-0">
                      <Image src={item.product.images[0]?.url} alt={item.product.name} fill className="object-cover" sizes="48px" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-warm-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-warm-900 line-clamp-2">{item.product.name}</p>
                    </div>
                    <p className="text-xs font-semibold text-warm-900 flex-shrink-0">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-warm-100 pt-4 flex flex-col gap-2">
                <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                {promoDiscount > 0 && <SummaryRow label={`Promo (${promoCode})`} value={`−${formatPrice(promoDiscount)}`} green />}
                <SummaryRow label="Shipping" value={resolvedShipping.price === 0 ? 'Free' : formatPrice(resolvedShipping.price)} />
                <SummaryRow label="VAT (20%)" value={formatPrice(tax)} />
                <div className="border-t border-warm-200 pt-3 flex items-center justify-between">
                  <span className="font-serif text-base">Total</span>
                  <span className="font-serif text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
