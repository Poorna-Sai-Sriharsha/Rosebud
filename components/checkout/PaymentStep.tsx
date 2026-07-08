import { ChevronRight, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StepPanel } from './shared';
import { formatCardNumber, formatExpiry } from '@/lib/utils';
import { motion } from 'framer-motion';

export function PaymentStep({
  card,
  setCard,
  errors,
  paymentError,
  prevStep,
  nextStep,
}: {
  card: { number: string; expiry: string; cvc: string; name: string };
  setCard: (card: { number: string; expiry: string; cvc: string; name: string }) => void;
  errors: Record<string, string>;
  paymentError: string;
  prevStep: () => void;
  nextStep: () => void;
}) {
  return (
    <StepPanel title="Payment">
      <div className="bg-warning-light border border-warning/20 rounded-2xl p-4 mb-6">
        <p className="text-sm font-semibold text-warning-dark mb-1">🔒 Demo checkout — no real charge is made</p>
        <p className="text-xs text-warm-600 mb-2">Use these test card numbers:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-2.5 text-xs">
            <p className="font-mono font-bold text-success">4242 4242 4242 4242</p>
            <p className="text-warm-500">→ Payment succeeds</p>
          </div>
          <div className="bg-white rounded-lg p-2.5 text-xs">
            <p className="font-mono font-bold text-error">4000 0000 0000 0002</p>
            <p className="text-warm-500">→ Card declined</p>
          </div>
        </div>
        <p className="text-xs text-warm-500 mt-2">Expiry: any future date · CVC: any 3 digits</p>
      </div>

      <div className="bg-white border border-warm-200 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-5 w-5 text-warm-500" />
          <span className="font-medium text-warm-900">Card Details</span>
        </div>

        <Input
          label="Card Number"
          value={card.number}
          onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
          error={errors.cardNumber}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          autoComplete="cc-number"
          inputMode="numeric"
        />
        <Input
          label="Name on Card"
          value={card.name}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
          error={errors.cardName}
          placeholder="Jane Smith"
          autoComplete="cc-name"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
            error={errors.expiry}
            placeholder="MM/YY"
            maxLength={5}
            autoComplete="cc-exp"
            inputMode="numeric"
          />
          <Input
            label="CVC"
            value={card.cvc}
            onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            error={errors.cvc}
            placeholder="123"
            maxLength={4}
            autoComplete="cc-csc"
            inputMode="numeric"
            type="password"
          />
        </div>
      </div>

      {paymentError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-error-light border border-error/20 rounded-xl p-4 text-sm text-error mt-4"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {paymentError}
        </motion.div>
      )}

      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={prevStep}>
          ← Back
        </Button>
        <Button variant="primary" size="lg" onClick={nextStep} rightIcon={<ChevronRight className="h-4 w-4" />}>
          Review Order
        </Button>
      </div>
    </StepPanel>
  );
}
