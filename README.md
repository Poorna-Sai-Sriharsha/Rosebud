# 🌿 Rosebud — Premium E-Commerce Experience

![Rosebud Banner](RoseBud.png)

**Rosebud** is a production-grade, meticulously crafted e-commerce platform built to showcase a premium boutique brand selling curated home fragrances, candles, and botanical lifestyle products. 

Designed with an absolute uncompromising focus on aesthetics, smooth micro-interactions, and conversion-optimized user flows, this project serves as a showcase of modern web development capabilities using the latest Next.js App Router and serverless technologies.

🌐 **Live Demo:** [rosebudessence.vercel.app](https://rosebudessence.vercel.app)

---

## ⚡ Tech Stack & Architecture

This application is built on a highly modern, serverless-first stack:

| Layer | Technology | Description |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Utilizing React Server Components, Server Actions, and advanced routing. |
| **Language** | TypeScript | Strict type safety across the entire application stack. |
| **Styling** | Tailwind CSS | Custom design token system with tailored HSL color palettes. |
| **Animation** | Framer Motion | Fluid page transitions, scroll reveals, and micro-interactions. |
| **State Mgt** | Zustand | Lightweight, fast global state management for the Cart and UI. |
| **Database** | Prisma ORM + SQLite | Fully typed database access. |
| **Authentication**| NextAuth.js v4 | Secure credential-based authentication with bcrypt hashing and JWT. |
| **Deployment** | Vercel | Edge-optimized deployment with Serverless Functions. |

---

## ✨ Key Features & UX Highlights

* **Uncompromising Aesthetics:** Apple/Aesop-level visual polish, employing subtle glassmorphism, tailored typography, and a warm, sophisticated color palette.
* **Fluid Animations:** Every interaction is accompanied by a subtle, physical-feeling animation powered by Framer Motion—from the sliding cart drawer to the dynamic checkout success sequence.
* **Serverless Dynamic Persistence:** Overcoming Vercel's ephemeral filesystem limitations, Rosebud employs a brilliant hybrid persistence strategy. Orders are dynamically processed on the backend and perfectly mirrored to the browser's `localStorage`. This creates a flawless, stateful illusion of database persistence without requiring external database configuration!
* **Advanced Catalog Filtering:** Real-time, URL-reflected filtering across categories, price ranges, and scent tags.
* **Live Global Search:** Debounced, full-text search matching product names, descriptions, and metadata.
* **Complex Multi-Step Checkout:** A conversion-optimized checkout flow featuring intelligent form pre-filling, validation, and a simulated Stripe-like payment gateway.
* **Secure Authentication:** Full registration, login, and secure session management.

---

## 🚀 Intelligent Serverless Persistence (The "Zero-Config" Database)

One of the most impressive technical achievements of this project is its ability to simulate a fully persistent SQL database on Vercel's free, ephemeral hobby tier—**with zero external database configuration.**

Because Vercel destroys and recreates the SQLite database on every deployment, building a dynamic portfolio that remembers user orders is notoriously difficult. Rosebud solves this elegantly:
1. The backend API handles the business logic, pricing validation, and mock payment gateway processing.
2. Upon success, the frontend seamlessly captures the returned order payload and intelligently merges it into a local persistence layer.
3. The Account Page uses a custom Client Component to seamlessly merge server-side records with the user's dynamic local records, deduplicating them flawlessly.

The result? You can place a dynamic order, and it instantly and permanently appears in your Order History—a perfect portfolio demonstration of a full-stack workflow.

---

## 🛠️ Setup & Run Locally

### Prerequisites
* Node.js 18+
* npm 9+

### 1. Clone & Install
```bash
git clone https://github.com/Poorna-Sai-Sriharsha/Rosebud.git
cd Rosebud/rosebud-app
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Initialize the Database
This command will create the SQLite database (`dev.db`), apply the schema, and seed it with curated products.
```bash
npm run build
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 💳 Testing the Checkout Flow

The checkout features a fully simulated payment gateway. **No real charges are made.**

| Card Number | Expected Result |
|---|---|
| `4242 4242 4242 4242` | ✅ Payment succeeds instantly |
| `4000 0000 0000 0002` | ❌ Card is declined |
| Any other valid-length number | ✅ Payment succeeds |

* **Expiry:** Any future date (e.g., `12/28`)
* **CVC:** Any 3 digits (e.g., `123`)

**Available Promo Codes:**
* `WELCOME10` (10% off)
* `ROSEBUD15` (15% off)
* `LAUNCH20` (20% off)

---

## 📂 Project Architecture

```
Rosebud/
├── app/                    # Next.js App Router (Pages, Layouts, API Routes)
│   ├── api/                # Serverless Route Handlers (REST endpoints)
│   ├── account/            # Authenticated user dashboard
│   ├── checkout/           # Multi-step checkout flow
│   └── shop/               # Catalog with dynamic URL routing
├── components/
│   ├── layout/             # Global components (Nav, Footer, Cart Drawer)
│   ├── shop/               # E-commerce components (Product Cards, Filters)
│   └── ui/                 # Reusable Design System components (Buttons, Inputs)
├── lib/
│   ├── auth.ts             # NextAuth security configurations
│   ├── prisma.ts           # Prisma singleton client (edge-compatible)
│   └── products.ts         # Seed data and filtering algorithms
├── prisma/
│   └── schema.prisma       # Relational database schema
└── store/                  # Zustand global state managers
```

---

*Designed and developed as a premium portfolio showcase.*
