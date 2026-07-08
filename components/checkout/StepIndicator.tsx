import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: LucideIcon;
}

export function StepIndicator({
  steps,
  currentStep,
  setStep,
}: {
  steps: Step[];
  currentStep: number;
  setStep: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <button
            onClick={() => currentStep > s.id && setStep(s.id)}
            disabled={currentStep <= s.id}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all',
              currentStep === s.id
                ? 'bg-warm-950 text-white'
                : currentStep > s.id
                ? 'bg-success text-white cursor-pointer hover:bg-success-dark'
                : 'bg-warm-100 text-warm-400'
            )}
          >
            {currentStep > s.id ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <s.icon className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{s.label}</span>
          </button>
          {i < steps.length - 1 && (
            <ChevronRight className="h-3.5 w-3.5 text-warm-300 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
