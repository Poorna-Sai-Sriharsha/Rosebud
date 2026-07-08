'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-error-light rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-7 w-7 text-error" />
        </div>
        <h1 className="heading-3 mb-3">Something went wrong</h1>
        <p className="body-md text-warm-500 mb-8">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="primary" size="lg">
            Try Again
          </Button>
          <Button href="/" variant="outline" size="lg">
            Return Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-6 text-left bg-white rounded-xl p-4 border border-error/20">
            <summary className="text-xs text-error cursor-pointer">Error details</summary>
            <pre className="text-xs text-warm-600 mt-2 overflow-auto">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  );
}

