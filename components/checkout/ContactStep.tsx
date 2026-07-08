import { AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StepPanel } from './shared';
import type { ShippingAddress } from '@/types';

export function ContactStep({
  address,
  setAddress,
  errors,
  nextStep,
}: {
  address: ShippingAddress;
  setAddress: (addr: ShippingAddress) => void;
  errors: Record<string, string>;
  nextStep: () => void;
}) {
  return (
    <StepPanel title="Contact & Delivery">
      <div className="bg-info-light border border-info/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
        <p className="text-sm text-info-dark">
          <strong>Demo checkout</strong> — no real personal data is collected or stored. Use any test values.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={address.firstName}
          onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          value={address.lastName}
          onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
        <Input
          label="Email"
          type="email"
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          error={errors.email}
          required
          autoComplete="email"
          containerClassName="sm:col-span-2"
        />
        <Input
          label="Phone"
          type="tel"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          autoComplete="tel"
          containerClassName="sm:col-span-2"
        />
        <Input
          label="Address Line 1"
          value={address.address1}
          onChange={(e) => setAddress({ ...address, address1: e.target.value })}
          error={errors.address1}
          required
          autoComplete="address-line1"
          containerClassName="sm:col-span-2"
        />
        <Input
          label="Address Line 2"
          value={address.address2 ?? ''}
          onChange={(e) => setAddress({ ...address, address2: e.target.value })}
          autoComplete="address-line2"
          containerClassName="sm:col-span-2"
        />
        <Input
          label="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          error={errors.city}
          required
          autoComplete="address-level2"
        />
        <Input
          label="Postcode"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value.toUpperCase() })}
          error={errors.zip}
          required
          autoComplete="postal-code"
        />
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="primary" size="lg" onClick={nextStep} rightIcon={<ChevronRight className="h-4 w-4" />}>
          Continue to Shipping
        </Button>
      </div>
    </StepPanel>
  );
}
