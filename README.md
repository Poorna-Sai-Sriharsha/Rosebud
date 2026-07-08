# 🌿 Rose Bud — Premium Home Fragrance E-Commerce

A production-quality e-commerce website for **Rose Bud**, a premium boutique brand selling curated home fragrance, candles, and botanical lifestyle products. Built as a portfolio-grade project with Apple/Aesop-level visual polish.

**Live Demo:** [rosebud-app.vercel.app](https://rosebud-app.vercel.app) _(deploy to get your URL)_

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (custom design token system) |
| Animation | Framer Motion |
| State | Zustand (cart + UI) |
| Database | Prisma ORM + SQLite (dev) |
| Auth | NextAuth.js v4 (email/password) |
| Icons | Lucide React |
| Deployment | Vercel (free Hobby tier) |

> **SQLite note**: SQLite is used for local development simplicity. On Vercel's ephemeral filesystem, the database resets on cold starts. Orders placed during a session persist within that session. For fully persistent production data, migrate to Supabase (free tier) — see the migration note below.

---

## Features

- **9 full pages**: Home, Shop/Catalog, Product Detail, Cart, Checkout, Order Confirmation, Account, About, 404
- **24 curated products** across 4 categories (Candles, Diffusers, Room Sprays, Bath)
- **Advanced filtering**: category, price range, scent tags, in-stock, rating — URL-reflected
- **Live search** with debounce, matching name/description/tags
- **Multi-step checkout**: Contact → Shipping → Payment → Review
- **Mock payment gateway**: Stripe-like card UI, test cards, simulated processing
- **Order persistence**: SQLite via Prisma, real order confirmation page
- **Auth**: Register/Login with bcrypt-hashed passwords, session via JWT
- **Cart drawer** with slide animation, quantity controls, promo codes
- **Framer Motion**: page transitions, micro-interactions, scroll reveals
- **Mobile-first** responsive design, collapsing header, mobile nav drawer
- **Accessibility**: semantic HTML, focus states, aria labels, WCAG AA contrast

---

## Setup & Run Locally

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/rosebud-app.git
cd rosebud-app
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set the required variables:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Initialize the Database

```bash
npx prisma db push
```

This creates the SQLite database (`dev.db`) with all tables.

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Test Card Numbers (Mock Payment Gateway)

The checkout is a fully simulated demo — **no real charges are made**.

| Card Number | Result |
|---|---|
| `4242 4242 4242 4242` | ✅ Payment succeeds |
| `4000 0000 0000 0002` | ❌ Card declined |
| Any other valid-length number | ✅ Payment succeeds |

- **Expiry**: any future date (e.g., `12/28`)
- **CVC**: any 3 digits (e.g., `123`)
- **Name**: any text

---

## Promo Codes

| Code | Discount |
|---|---|
| `WELCOME10` | 10% off |
| `ROSEBUD15` | 15% off |
| `LAUNCH20` | 20% off |

---

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/rosebud-app.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Select your `rosebud-app` repository
3. Set these **Environment Variables** in the Vercel dashboard:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:./dev.db` |
| `NEXTAUTH_SECRET` | _(generate with `openssl rand -base64 32`)_ |
| `NEXTAUTH_URL` | `https://YOUR-APP.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-APP.vercel.app` |

4. Deploy. The build command (`prisma generate && next build`) runs automatically.

---

## Known Limitations

| Limitation | Impact | Resolution |
|---|---|---|
| SQLite on Vercel | Orders reset on cold starts | Migrate to Supabase free tier (change `DATABASE_URL` to Postgres) |
| No real payment | Demo only | Integrate Stripe for production |
| No email confirmation | Orders confirmed on-screen only | Integrate Resend/SendGrid |
| Images via picsum.photos | Random placeholder images | Replace with real product photography |
| No inventory sync | Stock levels are static | Add real inventory management |

---

## Project Structure

```
rosebud-app/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # Route handlers (orders, products, promo, auth, register)
│   ├── about/              # Brand story page
│   ├── account/            # Authenticated order history
│   ├── cart/               # Cart page
│   ├── checkout/           # Multi-step checkout
│   ├── login/ register/    # Auth pages
│   ├── order/[id]/         # Order confirmation
│   ├── product/[slug]/     # Product detail
│   └── shop/               # Catalog with filtering
├── components/
│   ├── cart/               # CartDrawer
│   ├── checkout/           # Step components
│   ├── home/               # Hero, FeaturedCollections, etc.
│   ├── layout/             # Header, Footer, MobileNav
│   ├── shop/               # ProductCard, FilterPanel, etc.
│   └── ui/                 # Button, Input, Badge, Modal, Toast, etc.
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── orders.ts           # Shipping methods, promo codes, mock payment
│   ├── prisma.ts           # Prisma client singleton
│   ├── products.ts         # Product seed data + filtering logic
│   └── utils.ts            # Helpers (formatPrice, debounce, etc.)
├── prisma/
│   └── schema.prisma       # Database schema
├── store/
│   ├── cartStore.ts        # Zustand cart state
│   └── uiStore.ts          # Zustand UI state (mobile nav, etc.)
└── types/
    └── index.ts            # TypeScript type definitions
```

---

## Supabase Migration (Optional)

To switch from SQLite to Supabase for persistent production data:

1. Create a free project at [supabase.com](https://supabase.com)
2. Copy the **Connection String** (URI format) from Settings → Database
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Update `DATABASE_URL` in Vercel env vars to your Supabase connection string
5. Run `npx prisma db push` (or `migrate deploy`) to apply the schema

---

## License

MIT — for portfolio and demonstration purposes.
