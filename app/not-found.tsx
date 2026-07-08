import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-serif text-9xl text-primary-200 font-bold mb-4">404</div>
        <h1 className="heading-3 mb-3">Page not found</h1>
        <p className="body-md text-warm-500 mb-8">
          The page you are looking for has drifted away like morning mist. Let us guide you back.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" variant="primary" size="lg">
            Return Home
          </Button>
          <Button href="/shop" variant="outline" size="lg">
            Browse Shop
          </Button>
        </div>
      </div>
    </div>
  );
}

