/**
 * Rose Bud — Prisma Seed Script
 *
 * This creates a demo user account for testing auth features.
 * Products are stored in-memory in lib/products.ts (no DB seeding needed).
 *
 * Run: npx prisma db seed
 * Or:  npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌿 Seeding Rose Bud demo data...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo1234', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@rosebud.com' },
    update: {},
    create: {
      email: 'demo@rosebud.com',
      name: 'Demo User',
      password: hashedPassword,
      orders: {
        create: {
          id: 'RB-1780000000000-DEMO01',
          subtotal: 960000,
          shippingCost: 0,
          tax: 192000,
          discount: 0,
          total: 1152000,
          status: 'delivered',
          shippingAddress: JSON.stringify({
            firstName: 'Demo',
            lastName: 'User',
            address1: '123 Luxury Lane',
            city: 'Mumbai',
            state: 'MH',
            postalCode: '400001',
            country: 'IN'
          }),
          shippingMethod: JSON.stringify({
            id: 'standard',
            name: 'Standard Delivery',
            price: 0,
            estimatedDays: '3-5 business days'
          }),
          estimatedDelivery: 'Wednesday, 1 July 2026',
          items: {
            create: [
              {
                productId: 'prod_001',
                productName: 'Amber Solstice',
                productSlug: 'amber-solstice-candle',
                variantId: 'var_001_300g',
                variantName: '300g / 65hr',
                quantity: 2,
                unitPrice: 480000,
                imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80'
              }
            ]
          }
        }
      }
    },
  });

  console.log(`✅ Demo user created: ${user.email}`);
  console.log('   Email:    demo@rosebud.com');
  console.log('   Password: demo1234');
  console.log('');
  console.log('🌿 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
