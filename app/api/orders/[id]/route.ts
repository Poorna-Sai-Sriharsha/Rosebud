import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'unauthorized', message: 'Not logged in.' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'not_found', message: `Order ${params.id} not found.` },
        { status: 404 }
      );
    }

    if (order.userId && order.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'forbidden', message: 'You do not have permission to view this order.' },
        { status: 403 }
      );
    }

    // Parse the JSON strings back into objects for the frontend
    const orderData = {
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      shippingMethod: JSON.parse(order.shippingMethod),
    };

    return NextResponse.json({ order: orderData });
  } catch (err) {
    console.error('Failed to fetch order:', err);
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to fetch order.' },
      { status: 500 }
    );
  }
}
