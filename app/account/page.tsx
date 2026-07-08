import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/products';
import { SignOutButton } from './SignOutButton';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="container-rb py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="label-overline mb-2">Account</p>
            <h1 className="heading-2">Welcome, {session.user.name || session.user.email}</h1>
          </div>
          <SignOutButton />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-serif text-warm-900 mb-4">Order History</h2>
          
          {orders.length === 0 ? (
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
          ) : (
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
                      {new Date(order.createdAt).toLocaleDateString()} &middot; {order.items.length} items &middot; {formatPrice(order.total)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm-100 text-warm-800 capitalize">
                      {order.status}
                    </span>
                    <span className="text-warm-400 group-hover:text-warm-950 transition-colors">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
