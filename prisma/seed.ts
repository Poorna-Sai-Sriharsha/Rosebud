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
      id: 'clx0abcdefghijklmnopq1234',
      email: 'demo@rosebud.com',
      name: 'Demo User',
      password: hashedPassword,
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
