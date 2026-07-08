import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { processMockPayment } from '@/lib/orders';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import type { ShippingAddress, ShippingMethod, OrderItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'unauthorized', message: 'You must be logged in to place an order.' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    const {
      items,
      subtotal,
      shippingCost,
      tax,
      discount,
      total,
      shippingAddress,
      shippingMethod,
      promoCode,
      cardNumber,
    }: {
      items: OrderItem[];
      subtotal: number;
      shippingCost: number;
      tax: number;
      discount: number;
      total: number;
      shippingAddress: ShippingAddress;
      shippingMethod: ShippingMethod;
      promoCode?: string;
      cardNumber: string;
    } = body;

    if (!items?.length || !shippingAddress || !shippingMethod || !cardNumber) {
      return NextResponse.json(
        { error: 'validation_error', message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    await new Promise((r) => setTimeout(r, 2500)); // Simulate processing delay

    const paymentResult = processMockPayment(cardNumber);
    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.errorCode, message: paymentResult.message },
        { status: 402 }
      );
    }

    const now = new Date();
    const deliveryDate = new Date(now);
    const daysToAdd = shippingMethod.id === 'express' ? 2 : 5;
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

    const orderId = `RB-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;

    // Verify user exists in the ephemeral SQLite DB to prevent Foreign Key constraint errors caused by stale cookies from previous Vercel builds
    let validUserId: string | undefined = session?.user?.id;
    if (validUserId) {
      try {
        const userExists = await prisma.user.findUnique({ where: { id: validUserId } });
        if (!userExists) {
          validUserId = undefined; // Fallback: create order anonymously rather than crashing the DB
        }
      } catch {
        validUserId = undefined;
      }
    }

    const order = await prisma.order.create({
      data: {
        id: orderId,
        userId: validUserId,
        subtotal,
        shippingCost,
        tax,
        discount,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        shippingMethod: JSON.stringify(shippingMethod),
        status: 'processing',
        promoCode,
        estimatedDelivery: deliveryDate.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: {
          create: items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productSlug: item.productSlug,
            variantId: item.variantId,
            variantName: item.variantName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            imageUrl: item.imageUrl,
          })),
        },
      },
      include: { items: true },
    });

    // Clear the Next.js cache for the account page so the new order appears instantly
    revalidatePath('/account');

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return NextResponse.json(
      { error: 'server_error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
