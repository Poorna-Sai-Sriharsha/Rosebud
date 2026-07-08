import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Fix for Vercel's read-only filesystem: 
// Copy the seeded SQLite database to the writable /tmp directory on cold start.
let dbUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production' && (!dbUrl || dbUrl.includes('sqlite'))) {
  const tmpDbPath = '/tmp/dev.db';
  const originalDbPath = path.join(process.cwd(), 'prisma', 'dev.db');

  // Copy if it doesn't exist in /tmp yet, but exists in the bundle
  if (!fs.existsSync(tmpDbPath) && fs.existsSync(originalDbPath)) {
    try {
      fs.copyFileSync(originalDbPath, tmpDbPath);
      // Vercel build files are read-only. We must make the copy writable so SQLite can insert orders!
      fs.chmodSync(tmpDbPath, 0o666);
      console.log('✅ Successfully copied SQLite DB to /tmp and made it writable for Vercel.');
    } catch (e) {
      console.error('❌ Failed to copy SQLite DB to /tmp:', e);
    }
  }

  // Override Prisma's DB URL to point to the writable /tmp copy
  dbUrl = `file:${tmpDbPath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
