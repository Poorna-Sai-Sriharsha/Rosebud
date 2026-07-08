import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StepPanel } from './shared';
import { formatPrice, cn } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/lib/orders';
import type { ShippingMethod } from '@/types';

export function ShippingStep({
  shippingMethod,
  setShippingMethod,
  qualifiesForFreeShipping,
  prevStep,
  nextStep,
}: {
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  qualifiesForFreeShipping: boolean;
  prevStep: () => void;
  nextStep: () => void;
}) {
  return (
    <StepPanel title="Shipping Method">
      <div className="flex flex-col gap-3">
        {SHIPPING_METHODS.filter((m) => m.id !== 'free').map((method) => (
          <label
            key={method.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all',
              shippingMethod.id === method.id
                ? 'border-warm-950 bg-warm-50'
                : 'border-warm-200 hover:border-warm-400'
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={method.id}
                checked={shippingMethod.id === method.id}
                onChange={() => setShippingMethod(method)}
                className="accent-warm-950"
              />
              <div>
                <p className="text-sm font-semibold text-warm-900">{method.name}</p>
                <p className="text-xs text-warm-500">
                  {method.description} · {method.estimatedDays}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-warm-950">
              {method.price === 0 ? 'Free' : formatPrice(method.price)}
            </span>
          </label>
        ))}
        {qualifiesForFreeShipping && (
          <div className="p-4 bg-success-light rounded-2xl">
            <p className="text-sm font-medium text-success-dark">🎉 Free delivery applied to your order</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={prevStep}>
          ← Back
        </Button>
        <Button variant="primary" size="lg" onClick={nextStep} rightIcon={<ChevronRight className="h-4 w-4" />}>
          Continue to Payment
        </Button>
      </div>
    </StepPanel>
  );
}
