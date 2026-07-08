import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { OrderList } from './OrderList';
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
          
          <OrderList serverOrders={orders} />
        </div>
      </div>
    </div>
  );
}
