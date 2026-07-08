import type { Product } from '@/types';

// ============================================================
// Rose Bud — Product Seed Data (24 Products)
// All prices in cents. Images sourced from Unsplash (royalty-free).
// ============================================================

export const PRODUCTS: Product[] = [
  // ── CANDLES (8) ──────────────────────────────────────────
  {
    id: 'prod_001',
    slug: 'amber-solstice-candle',
    name: 'Amber Solstice',
    shortDescription: 'Warm amber, sandalwood, and a whisper of vanilla. A candle for long evenings.',
    description:
      'Let Amber Solstice fill your space with the gentle warmth of aged amber resin layered over creamy sandalwood and a soft, barely-there vanilla. This is not a sweet candle — it is contemplative, cozy, and deeply grounding. Hand-poured in small batches using a coconut-soy wax blend and a cotton-braided wick. Burns clean, throws beautifully.',
    price: 480000,
    compareAtPrice: 560000,
    category: 'candles',
    tags: ['amber', 'sandalwood', 'vanilla', 'warm', 'woody', 'bestseller'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80',
        alt: 'Amber Solstice candle in a frosted amber glass vessel',
        width: 800,
        height: 1000,
      },
      {
        url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80',
        alt: 'Candle burning with warm glow on a marble surface',
        width: 800,
        height: 1000,
      },
      {
        url: 'https://images.unsplash.com/photo-1605814515250-719543e30f14?auto=format&fit=crop&q=80',
        alt: 'Close-up of candle wick and melted wax pool',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v001a', name: '180g / 40hr', type: 'size', price: 0, stock: 24, sku: 'RB-AS-180' },
      { id: 'v001b', name: '300g / 65hr', type: 'size', price: 220000, stock: 16, sku: 'RB-AS-300' },
    ],
    rating: 4.9,
    reviewCount: 142,
    stock: 40,
    bestseller: true,
    featured: true,
    details: [
      'Coconut-soy wax blend — cleaner burn, longer throw',
      'Hand-poured in London in small batches',
      'Lead-free cotton-braided wick',
      'Reusable frosted amber glass vessel',
      'Scent: amber resin, sandalwood, vanilla, musk',
      'Burn time: 40 hours (180g) / 65 hours (300g)',
    ],
    shippingInfo:
      'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000. Express delivery available at checkout.',
    returnPolicy:
      'Unused, sealed products may be returned within 30 days for a full refund. We cannot accept returns on opened candles for hygiene reasons.',
    ingredients: 'Coconut-soy wax, fragrance oil (phthalate-free), cotton wick.',
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'prod_002',
    slug: 'rose-vetiver-candle',
    name: 'Rose & Vetiver',
    shortDescription: 'An earthy, smoke-kissed rose. Quiet, elegant, unforgettable.',
    description:
      'Rose & Vetiver is our most sophisticated candle — a study in contrast. Bulgarian rose absolute sits atop a bed of smoky vetiver and dry cedarwood, softened by a trace of patchouli. This is rose as you have never encountered it: grounded, darkened, and elevated. A fragrance for those who find florals too sweet.',
    price: 520000,
    category: 'candles',
    tags: ['rose', 'vetiver', 'cedar', 'earthy', 'floral', 'smoky'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608528577891-eb0558ebda3c?auto=format&fit=crop&q=80',
        alt: 'Rose & Vetiver candle in a cream ceramic vessel with rose petal',
        width: 800,
        height: 1000,
      },
      {
        url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80',
        alt: 'Candle lifestyle shot with dried roses and linen',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v002a', name: '180g / 40hr', type: 'size', price: 0, stock: 18, sku: 'RB-RV-180' },
      { id: 'v002b', name: '300g / 65hr', type: 'size', price: 220000, stock: 10, sku: 'RB-RV-300' },
    ],
    rating: 4.8,
    reviewCount: 89,
    stock: 28,
    featured: true,
    details: [
      'Bulgarian rose absolute & vetiver root oil',
      'Coconut-soy wax blend',
      'Matte cream ceramic vessel, reusable',
      'Scent notes: Bulgarian rose, vetiver, cedarwood, patchouli',
      'Burn time: 40 hours (180g)',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    ingredients: 'Coconut-soy wax, fragrance oil blend with rose absolute, cotton wick.',
    createdAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 'prod_003',
    slug: 'vetiver-moss-candle',
    name: 'Vetiver & Forest Moss',
    shortDescription: 'After a rainstorm in an old forest. Grounding, fresh, ancient.',
    description:
      'Close your eyes: damp earth underfoot, old oak bark, petrichor in the air, and deep green moss. Vetiver & Forest Moss captures that irreplaceable post-rain forest calm in a single candle. A profoundly grounding fragrance that quiets a busy mind.',
    price: 480000,
    category: 'candles',
    tags: ['vetiver', 'moss', 'petrichor', 'earthy', 'fresh', 'green'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583248352195-d3a8e766edf2?auto=format&fit=crop&q=80',
        alt: 'Forest moss candle in dark green ceramic',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v003a', name: '180g / 40hr', type: 'size', price: 0, stock: 20, sku: 'RB-VM-180' },
    ],
    rating: 4.7,
    reviewCount: 64,
    stock: 20,
    details: [
      'Vetiver, oakmoss, cedarwood, geranium',
      'Coconut-soy wax — clean, long-lasting burn',
      'Dark green glazed stoneware vessel',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2024-11-01T00:00:00Z',
  },
  {
    id: 'prod_004',
    slug: 'white-neroli-candle',
    name: 'White Neroli',
    shortDescription: 'Sun-bleached linen, bitter orange blossom, and warm skin.',
    description:
      'White Neroli is clean, luminous, and radiant — a candle that lifts a room with citrus brightness without ever feeling sharp. Neroli and bitter orange blossom open over a soft white musk heart and a base of warm skin-like cashmeran. Effortlessly beautiful.',
    price: 480000,
    category: 'candles',
    tags: ['neroli', 'orange blossom', 'musk', 'citrus', 'clean', 'fresh'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616147424911-c918ff0fccfc?auto=format&fit=crop&q=80',
        alt: 'White Neroli candle in white porcelain with orange blossom sprig',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v004a', name: '180g / 40hr', type: 'size', price: 0, stock: 22, sku: 'RB-WN-180' },
      { id: 'v004b', name: '300g / 65hr', type: 'size', price: 220000, stock: 12, sku: 'RB-WN-300' },
    ],
    rating: 4.6,
    reviewCount: 77,
    stock: 34,
    isNew: true,
    details: ['Neroli absolute, bitter orange, white musk, cashmeran', 'White porcelain vessel'],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'prod_005',
    slug: 'dark-fig-candle',
    name: 'Dark Fig & Oud',
    shortDescription: 'Ripe fig from Mediterranean groves, deepened by rare oud resin.',
    description:
      'Dark Fig & Oud is the deepest fragrance in our range — rich, resinous, and quietly theatrical. Purple fig pulp and green fig leaves meet a rare oud note: smoky, animalic, ancient. Not for the faint-hearted. Extraordinary for evenings and intimate spaces.',
    price: 680000,
    category: 'candles',
    tags: ['fig', 'oud', 'resin', 'dark', 'warm', 'luxury'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80',
        alt: 'Dark fig candle in an obsidian black vessel',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v005a', name: '180g / 40hr', type: 'size', price: 0, stock: 12, sku: 'RB-DFO-180' },
      { id: 'v005b', name: '300g / 65hr', type: 'size', price: 260000, stock: 8, sku: 'RB-DFO-300' },
    ],
    rating: 4.9,
    reviewCount: 51,
    stock: 20,
    bestseller: true,
    details: ['Fig, oud wood, oakmoss, labdanum, incense', 'Black matte ceramic vessel', 'Limited production'],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2024-12-01T00:00:00Z',
  },
  {
    id: 'prod_006',
    slug: 'linen-air-candle',
    name: 'Linen Air',
    shortDescription: 'Sun-dried linen sheets on a summer morning. Pure, airy, effortless.',
    description:
      'Linen Air is the candle for those who love clean fragrances that feel like taking a deep breath. Crisp aldehydes, soft violet leaf, and a sheer white musk accord evoke freshly laundered linen drying in the sun. Uplifting, light, and extraordinarily versatile.',
    price: 420000,
    category: 'candles',
    tags: ['linen', 'aldehydic', 'musk', 'clean', 'fresh', 'airy'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80',
        alt: 'Linen Air candle in white ribbed glass with minimal label',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v006a', name: '180g / 40hr', type: 'size', price: 0, stock: 30, sku: 'RB-LA-180' },
    ],
    rating: 4.5,
    reviewCount: 103,
    stock: 30,
    details: ['Aldehyde accord, violet leaf, jasmine, white musk', 'Ribbed glass vessel', 'Everyday luxury'],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2024-08-01T00:00:00Z',
  },
  {
    id: 'prod_007',
    slug: 'peony-cashmere-candle',
    name: 'Peony & Cashmere',
    shortDescription: 'Dewy peony petals wrapped in the softest cashmere musk.',
    description:
      'Peony & Cashmere bridges the gap between florals and skin-close fragrances. Fresh, dewy peony rises and then falls into an incredibly soft cashmere musk base — comforting, feminine without being clichéd, and perfectly blended for all-day burning.',
    price: 480000,
    category: 'candles',
    tags: ['peony', 'cashmere', 'floral', 'musk', 'soft', 'feminine'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80',
        alt: 'Peony Cashmere candle in blush pink frosted glass',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v007a', name: '180g / 40hr', type: 'size', price: 0, stock: 18, sku: 'RB-PC-180' },
      { id: 'v007b', name: '300g / 65hr', type: 'size', price: 220000, stock: 9, sku: 'RB-PC-300' },
    ],
    rating: 4.7,
    reviewCount: 88,
    stock: 27,
    isNew: true,
    details: ['Peony accord, rose, cashmere musk, ambrette', 'Blush frosted glass vessel'],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'prod_008',
    slug: 'tobacco-honey-candle',
    name: 'Tobacco & Honey',
    shortDescription: 'Cured tobacco leaf, raw honey, and tonka bean. Decadent.',
    description:
      'Tobacco & Honey occupies that rare, irresistible territory between luxury and indulgence. Golden raw honey and cured tobacco absolute interweave with a heart of heliotrope and a warm base of tonka bean and benzoin resin. Rich, sweet, and endlessly complex.',
    price: 520000,
    category: 'candles',
    tags: ['tobacco', 'honey', 'tonka', 'warm', 'sweet', 'gourmand'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512413346513-5a0225d3dfdf?auto=format&fit=crop&q=80',
        alt: 'Tobacco & Honey candle in cognac glass vessel',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v008a', name: '180g / 40hr', type: 'size', price: 0, stock: 16, sku: 'RB-TH-180' },
    ],
    rating: 4.8,
    reviewCount: 61,
    stock: 16,
    bestseller: true,
    details: ['Tobacco absolute, honey, heliotrope, tonka, benzoin', 'Cognac-tinted glass vessel'],
    shippingInfo: 'Ships within 2–3 business days. Free standard delivery on orders over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days for a full refund.',
    createdAt: '2024-10-15T00:00:00Z',
  },

  // ── DIFFUSERS (6) ─────────────────────────────────────────
  {
    id: 'prod_009',
    slug: 'amber-solstice-diffuser',
    name: 'Amber Solstice Diffuser',
    shortDescription: 'The beloved candle fragrance, now in a sculptural reed diffuser.',
    description:
      'Bring Amber Solstice into rooms where you prefer a candle-free experience. Our diffuser oil is crafted to the same high standard as the candle fragrance — premium ingredients, expertly blended. Presented in a hand-blown amber glass bottle with eight natural rattan reeds.',
    price: 580000,
    category: 'diffusers',
    tags: ['amber', 'sandalwood', 'vanilla', 'warm', 'woody'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80',
        alt: 'Amber Solstice diffuser in hand-blown amber glass bottle with rattan reeds',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v009a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 20, sku: 'RB-ASD-100' },
      { id: 'v009b', name: '200ml / ~6 months', type: 'size', price: 300000, stock: 12, sku: 'RB-ASD-200' },
    ],
    rating: 4.8,
    reviewCount: 54,
    stock: 32,
    featured: true,
    details: [
      'Alcohol-free, oil-based diffuser',
      '8 natural rattan reeds included',
      'Hand-blown amber glass bottle',
      'Lasting fragrance: ~3 months (100ml) / ~6 months (200ml)',
      'Flip reeds weekly for stronger scent',
    ],
    shippingInfo: 'Ships within 2–3 business days. Packaged securely to prevent leakage. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2024-09-15T00:00:00Z',
  },
  {
    id: 'prod_010',
    slug: 'hinoki-cedar-diffuser',
    name: 'Hinoki & Cedar',
    shortDescription: 'Japanese cypress, Atlas cedarwood, and yuzu citrus. Spa-like.',
    description:
      'Hinoki & Cedar was created for bathrooms and meditation spaces. The clean, woody note of Japanese hinoki cypress is softened with Atlas cedar and lifted by a bright yuzu top note. Deeply calming, it turns any room into a Japanese onsen experience.',
    price: 580000,
    category: 'diffusers',
    tags: ['hinoki', 'cedar', 'yuzu', 'clean', 'woody', 'spa'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1615397323049-5ebbbdf49c40?auto=format&fit=crop&q=80',
        alt: 'Hinoki Cedar diffuser on stone bathroom shelf',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v010a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 18, sku: 'RB-HC-100' },
    ],
    rating: 4.9,
    reviewCount: 72,
    stock: 18,
    bestseller: true,
    details: ['Hinoki cypress, cedarwood, yuzu, bergamot', 'Frosted glass bottle', '8 bamboo reeds'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2024-07-01T00:00:00Z',
  },
  {
    id: 'prod_011',
    slug: 'rose-oud-diffuser',
    name: 'Rose Oud Diffuser',
    shortDescription: 'Opulent Bulgarian rose and dark oud for statement spaces.',
    description:
      'A prestige diffuser for those who want their fragrance to make a statement. Rose Oud is intense, opulent, and long-lasting — Bulgarian rose absolute and oud wood create a scent that commands a room. Best placed in hallways and living spaces where it can breathe.',
    price: 720000,
    category: 'diffusers',
    tags: ['rose', 'oud', 'luxury', 'floral', 'dark', 'opulent'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595425881477-83ebad616149?auto=format&fit=crop&q=80',
        alt: 'Rose Oud diffuser in dark sculptural vessel',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v011a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 10, sku: 'RB-ROD-100' },
      { id: 'v011b', name: '200ml / ~6 months', type: 'size', price: 340000, stock: 6, sku: 'RB-ROD-200' },
    ],
    rating: 4.9,
    reviewCount: 38,
    stock: 16,
    details: ['Rose absolute, oud, patchouli, labdanum, incense', 'Dark sculptural glass bottle'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2024-12-15T00:00:00Z',
  },
  {
    id: 'prod_012',
    slug: 'bergamot-mint-diffuser',
    name: 'Bergamot & Spearmint',
    shortDescription: 'A zesty, uplifting blend for kitchens, offices, and energising spaces.',
    description:
      'Bergamot & Spearmint is the antidote to afternoon slumps. Sharp bergamot, cool spearmint, and a note of green tea combine into an invigorating, clear-headed fragrance. Perfect for workspaces, kitchens, and anywhere you need focus and energy.',
    price: 480000,
    category: 'diffusers',
    tags: ['bergamot', 'mint', 'green tea', 'fresh', 'citrus', 'energising'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80',
        alt: 'Bergamot Mint diffuser in clear glass on white desk',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v012a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 25, sku: 'RB-BM-100' },
    ],
    rating: 4.5,
    reviewCount: 49,
    stock: 25,
    isNew: true,
    details: ['Bergamot, spearmint, green tea, vetiver', 'Clear borosilicate glass', '8 reed sticks'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'prod_013',
    slug: 'vanilla-tonka-diffuser',
    name: 'Vanilla & Tonka',
    shortDescription: 'Cosy, comforting, and sweet without being sugary. Perfect for bedrooms.',
    description:
      'Vanilla & Tonka was made for the bedroom and reading nook — anywhere you want deep comfort and ease. Madagascar vanilla and warm tonka bean are balanced with a touch of cedarwood so it never tips into confectionery territory. The fragrance equivalent of clean sheets and a good book.',
    price: 520000,
    category: 'diffusers',
    tags: ['vanilla', 'tonka', 'warm', 'sweet', 'cosy', 'gourmand'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80',
        alt: 'Vanilla Tonka diffuser on bedside table with candle',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v013a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 22, sku: 'RB-VT-100' },
    ],
    rating: 4.6,
    reviewCount: 67,
    stock: 22,
    details: ['Madagascar vanilla, tonka bean, cedarwood, amber', 'Warm amber glass'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'prod_014',
    slug: 'lavender-cistus-diffuser',
    name: 'Lavender & Cistus',
    shortDescription: 'Provençal lavender and warm labdanum. Sleep-inducing calm.',
    description:
      'Lavender & Cistus elevates lavender beyond its humble origins. Fine Provençal lavender is warmed and deepened with cistus labdanum — a rich, ambery resin — and softened with clary sage. The result is a sophisticated, sleep-promoting fragrance that turns any room into a sanctuary.',
    price: 520000,
    category: 'diffusers',
    tags: ['lavender', 'cistus', 'floral', 'herbal', 'calming', 'sleep'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80',
        alt: 'Lavender Cistus diffuser with dried lavender bundle',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v014a', name: '100ml / ~3 months', type: 'size', price: 0, stock: 20, sku: 'RB-LC-100' },
    ],
    rating: 4.7,
    reviewCount: 91,
    stock: 20,
    bestseller: true,
    details: ['Lavender absolute, cistus labdanum, clary sage, oakmoss', 'Frosted lavender glass'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened diffusers may be returned within 30 days.',
    createdAt: '2024-06-01T00:00:00Z',
  },

  // ── ROOM SPRAYS (5) ───────────────────────────────────────
  {
    id: 'prod_015',
    slug: 'amber-room-spray',
    name: 'Amber Solstice Room Spray',
    shortDescription: 'Instant atmosphere. The candle fragrance in a mist.',
    description:
      'The room spray is the fastest way into the Rose Bud universe. One or two spritzes of Amber Solstice will fill a room with warm amber and sandalwood in seconds. Alcohol-based for a clean, non-greasy finish. The fragrance settles and lingers beautifully on soft furnishings.',
    price: 320000,
    category: 'room-sprays',
    tags: ['amber', 'sandalwood', 'vanilla', 'warm', 'woody'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605814515250-719543e30f14?auto=format&fit=crop&q=80',
        alt: 'Amber room spray in amber glass atomiser bottle',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v015a', name: '100ml', type: 'size', price: 0, stock: 35, sku: 'RB-ARS-100' },
    ],
    rating: 4.7,
    reviewCount: 112,
    stock: 35,
    bestseller: true,
    details: [
      'Fast-acting, long-lasting mist',
      'Safe on all fabrics — test in inconspicuous area first',
      '100% vegan, no parabens',
      'Alcohol-based for clean application',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened room sprays may be returned within 30 days.',
    createdAt: '2024-09-15T00:00:00Z',
  },
  {
    id: 'prod_016',
    slug: 'white-tea-room-spray',
    name: 'White Tea & Orris',
    shortDescription: 'A fragrance of quiet mornings: pale light, white tea, powdery iris.',
    description:
      'White Tea & Orris is our most delicate room spray — a fragrance of slowness and stillness. First-pick white tea and powdery orris root are joined by soft peach skin and a near-invisible white musk. Spritz into the air of any room before a moment of stillness.',
    price: 320000,
    category: 'room-sprays',
    tags: ['white tea', 'orris', 'iris', 'clean', 'powdery', 'delicate'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608528577891-eb0558ebda3c?auto=format&fit=crop&q=80',
        alt: 'White Tea Orris room spray in pale frosted glass atomiser',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v016a', name: '100ml', type: 'size', price: 0, stock: 28, sku: 'RB-WTO-100' },
    ],
    rating: 4.5,
    reviewCount: 74,
    stock: 28,
    isNew: true,
    details: ['White tea extract, orris root, white peach, musk', 'Frosted glass atomiser'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened room sprays may be returned within 30 days.',
    createdAt: '2025-01-20T00:00:00Z',
  },
  {
    id: 'prod_017',
    slug: 'cedar-sage-room-spray',
    name: 'Cedar & White Sage',
    shortDescription: 'Cleansing, grounding, and woodsy. A botanical reset for any space.',
    description:
      'Cedar & White Sage draws on ancient cleansing traditions: the clearing energy of white sage, the steadfast grounding of Atlas cedarwood, and the bright lift of eucalyptus. Not incense — something much cleaner and more contemporary. An essential reset spray.',
    price: 320000,
    category: 'room-sprays',
    tags: ['cedar', 'sage', 'eucalyptus', 'fresh', 'woody', 'cleansing'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80',
        alt: 'Cedar Sage room spray on wooden surface with sage bundle',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v017a', name: '100ml', type: 'size', price: 0, stock: 32, sku: 'RB-CS-100' },
    ],
    rating: 4.6,
    reviewCount: 58,
    stock: 32,
    details: ['White sage, cedarwood, eucalyptus, vetiver', 'Kraft paper label, recycled glass'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened room sprays may be returned within 30 days.',
    createdAt: '2024-11-01T00:00:00Z',
  },
  {
    id: 'prod_018',
    slug: 'jasmine-neroli-room-spray',
    name: 'Jasmine & Neroli',
    shortDescription: 'A sun-drenched Mediterranean courtyard in a bottle.',
    description:
      'Jasmine & Neroli is the room spray for those who love bright, joyful, radiant spaces. Grand Jasmine from Grasse and Tunisian neroli blossom are lifted by a bergamot top note and anchored in a soft musk base. Uplifting, sensual, and deeply Mediterranean in spirit.',
    price: 380000,
    category: 'room-sprays',
    tags: ['jasmine', 'neroli', 'bergamot', 'floral', 'fresh', 'radiant'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583248352195-d3a8e766edf2?auto=format&fit=crop&q=80',
        alt: 'Jasmine Neroli room spray in clear glass on sun-dappled surface',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v018a', name: '100ml', type: 'size', price: 0, stock: 26, sku: 'RB-JN-100' },
    ],
    rating: 4.8,
    reviewCount: 43,
    stock: 26,
    details: ['Jasmine absolute, neroli, bergamot, white musk', 'Clear borosilicate glass'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened room sprays may be returned within 30 days.',
    createdAt: '2024-08-15T00:00:00Z',
  },
  {
    id: 'prod_019',
    slug: 'petrichor-room-spray',
    name: 'Petrichor',
    shortDescription: 'The exact scent of rain on warm earth. Bottled.',
    description:
      'Our most conceptual fragrance. Petrichor — from the Greek petra (stone) and ichor (fluid of the gods) — is the name for the scent of rain falling on dry earth. We have captured it: geosmin note, oakmoss, damp stone, violet leaf, and a breath of ozone. Extraordinary.',
    price: 420000,
    category: 'room-sprays',
    tags: ['petrichor', 'rain', 'moss', 'earthy', 'fresh', 'unique'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616147424911-c918ff0fccfc?auto=format&fit=crop&q=80',
        alt: 'Petrichor room spray in dark slate-grey bottle',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v019a', name: '100ml', type: 'size', price: 0, stock: 15, sku: 'RB-PT-100' },
    ],
    rating: 4.9,
    reviewCount: 29,
    stock: 15,
    isNew: true,
    details: ['Geosmin accord, oakmoss, violet leaf, ozone, vetiver', 'Dark slate borosilicate glass'],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unopened room sprays may be returned within 30 days.',
    createdAt: '2025-02-15T00:00:00Z',
  },

  // ── BATH (5) ──────────────────────────────────────────────
  {
    id: 'prod_020',
    slug: 'botanical-bath-salts',
    name: 'Botanical Bath Salts',
    shortDescription: 'Himalayan pink salt, magnesium flakes, and rose petal. Deep restoration.',
    description:
      'A restorative bath ritual. Himalayan pink salt and magnesium flakes combine with dried rose petals, lavender buds, and a bespoke botanical essential oil blend (rose geranium, palmarosa, and lavender) to create a soak that is both beautifying and deeply relaxing. Your bath will never feel the same again.',
    price: 380000,
    category: 'bath',
    tags: ['bath', 'salts', 'lavender', 'rose', 'botanical', 'relaxing'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80',
        alt: 'Pink botanical bath salts in a white ceramic dish with rose petals',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v020a', name: '250g', type: 'size', price: 0, stock: 30, sku: 'RB-BBS-250' },
      { id: 'v020b', name: '500g', type: 'size', price: 240000, stock: 18, sku: 'RB-BBS-500' },
    ],
    rating: 4.8,
    reviewCount: 95,
    stock: 48,
    featured: true,
    bestseller: true,
    details: [
      'Himalayan pink salt, magnesium flakes, Dead Sea salt',
      'Dried rose petals, lavender buds, calendula',
      'Essential oils: rose geranium, palmarosa, lavender',
      'Free from synthetic fragrance, parabens, SLS',
      'Vegan, cruelty-free',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days.',
    ingredients:
      'Sodium Chloride (Himalayan Pink Salt), Magnesium Chloride Flakes, Maris Sal, Rosa Damascena Petal, Lavandula Angustifolia Bud, Pelargonium Graveolens Flower Oil, Cymbopogon Martini Oil, Lavandula Angustifolia Oil.',
    createdAt: '2024-07-15T00:00:00Z',
  },
  {
    id: 'prod_021',
    slug: 'rose-body-oil',
    name: 'Rose & Marula Body Oil',
    shortDescription: 'Ethiopian marula oil, Bulgarian rose, and dry rosehip. Skin-transforming.',
    description:
      'Our best-selling body oil: a golden, fast-absorbing dry oil that leaves skin luminous, scented, and deeply nourished. Ethiopian marula oil provides omega-rich hydration; rosehip seed oil brightens; Bulgarian rose absolute leaves you smelling extraordinary. A two-minute ritual that transforms how your skin looks and feels.',
    price: 640000,
    compareAtPrice: 720000,
    category: 'bath',
    tags: ['body oil', 'rose', 'marula', 'rosehip', 'nourishing', 'luxury'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80',
        alt: 'Rose Body Oil in amber dropper bottle with rose petals',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v021a', name: '50ml', type: 'size', price: 0, stock: 22, sku: 'RB-RBO-50' },
      { id: 'v021b', name: '100ml', type: 'size', price: 300000, stock: 14, sku: 'RB-RBO-100' },
    ],
    rating: 4.9,
    reviewCount: 138,
    stock: 36,
    bestseller: true,
    featured: true,
    details: [
      'Marula seed oil, rosehip seed oil, jojoba, squalane',
      'Bulgarian rose absolute (0.5%)',
      'Dry oil — absorbs in under 60 seconds',
      'Suitable for all skin types, including sensitive',
      'Vegan, cruelty-free, no mineral oils',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days.',
    ingredients:
      'Sclerocarya Birrea Seed Oil, Rosa Canina Fruit Oil, Simmondsia Chinensis Seed Oil, Squalane, Rosa Damascena Flower Oil, Tocopherol.',
    createdAt: '2024-08-01T00:00:00Z',
  },
  {
    id: 'prod_022',
    slug: 'clay-face-mask',
    name: 'Botanical Clay Mask',
    shortDescription: 'Kaolin, French green clay, and rose hip powder. A weekly ritual.',
    description:
      'The Botanical Clay Mask is a once-or-twice weekly deep cleanse that your skin will thank you for. Pure kaolin and French green clay draw out impurities while calming rose clay, rose hip powder, and chamomile extract soothe and brighten. Mix with water or rose water for a precise, customised consistency.',
    price: 480000,
    category: 'bath',
    tags: ['face mask', 'clay', 'rose', 'cleansing', 'botanical', 'skincare'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80',
        alt: 'Botanical clay mask powder in white ceramic pot',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v022a', name: '60g / ~20 uses', type: 'size', price: 0, stock: 24, sku: 'RB-BCM-60' },
    ],
    rating: 4.6,
    reviewCount: 67,
    stock: 24,
    isNew: true,
    details: [
      'Kaolin, French green clay, rose clay',
      'Rose hip powder, chamomile extract, aloe',
      'Mix to paste with water or rose water',
      'Suitable for normal, combination, and oily skin',
      'Packaging: recycled glass pot with bamboo lid',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days.',
    createdAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_023',
    slug: 'linen-pillow-mist',
    name: 'Linen & Sleep Pillow Mist',
    shortDescription: 'Lavender, chamomile, and vetiver. Spray, breathe, sleep.',
    description:
      'An evening ritual in a bottle. Spritz onto your pillow and bed linen before sleep and let lavender essential oil, chamomile, and grounding vetiver do their work. The mist dries in seconds and leaves the gentlest, most comforting scent. Sleep studies suggest lavender reduces sleep onset by up to 20 minutes.',
    price: 280000,
    category: 'bath',
    tags: ['sleep', 'pillow mist', 'lavender', 'chamomile', 'calming', 'night'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512413346513-5a0225d3dfdf?auto=format&fit=crop&q=80',
        alt: 'Pillow mist spray on linen bed in candlelit bedroom',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v023a', name: '75ml', type: 'size', price: 0, stock: 40, sku: 'RB-LPM-75' },
    ],
    rating: 4.7,
    reviewCount: 121,
    stock: 40,
    bestseller: true,
    details: [
      'Lavender essential oil, chamomile extract, vetiver, sandalwood',
      'Fast-drying, non-staining formula',
      'Safe on all fabrics',
    ],
    shippingInfo: 'Ships within 2–3 business days. Free delivery over ₹5,000.',
    returnPolicy: 'Unused, sealed products may be returned within 30 days.',
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'prod_024',
    slug: 'discovery-set',
    name: 'Discovery Set — Signature Fragrances',
    shortDescription: 'Five miniature candles. Find your signature scent.',
    description:
      'New to Rose Bud, or buying a gift? Our Discovery Set is the perfect starting point. Five 60g miniature candles — Amber Solstice, Rose & Vetiver, White Neroli, Dark Fig & Oud, and Linen Air — presented in a beautiful gift box. Each burns for 15 hours. Discover your favourite, then invest in the full size.',
    price: 880000,
    compareAtPrice: 1080000,
    category: 'candles',
    tags: ['gift', 'discovery', 'set', 'miniature', 'multi-scent', 'bestseller'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80',
        alt: 'Discovery Set — five miniature candles in a luxury gift box',
        width: 800,
        height: 1000,
      },
      {
        url: 'https://images.unsplash.com/photo-1615397323049-5ebbbdf49c40?auto=format&fit=crop&q=80',
        alt: 'Close up of candle miniatures',
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      { id: 'v024a', name: 'Set of 5', type: 'size', price: 0, stock: 20, sku: 'RB-DS-5' },
    ],
    rating: 5.0,
    reviewCount: 203,
    stock: 20,
    bestseller: true,
    featured: true,
    details: [
      '5 × 60g miniature candles (15hr burn each)',
      'Fragrances: Amber Solstice, Rose & Vetiver, White Neroli, Dark Fig & Oud, Linen Air',
      'Presented in a rigid gift box with ribbon',
      'Perfect as a gift — includes a handwritten gift card option',
      'Each candle in its own vessel, reusable',
    ],
    shippingInfo: 'Ships within 1–2 business days (gift orders prioritised). Free delivery on all sets.',
    returnPolicy: 'Unopened gift sets may be returned within 30 days.',
    createdAt: '2024-11-15T00:00:00Z',
  },
];

// ============================================================
// Helper: Get product by slug
// ============================================================
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// ============================================================
// Helper: Filter & sort products
// ============================================================
export function filterProducts(params: {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStockOnly?: boolean;
  minRating?: number;
  search?: string;
  sort?: string;
  page?: number;
  perPage?: number;
}): { products: Product[]; total: number; totalPages: number } {
  const {
    categories,
    minPrice = 0,
    maxPrice = 100000,
    tags,
    inStockOnly,
    minRating = 0,
    search,
    sort = 'featured',
    page = 1,
    perPage = 12,
  } = params;

  const filtered = PRODUCTS.filter((p) => {
    if (categories && categories.length > 0 && !categories.includes(p.category)) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (tags && tags.length > 0 && !tags.some((t) => p.tags.includes(t))) return false;
    if (inStockOnly && p.stock === 0) return false;
    if (p.rating < minRating) return false;
    if (search) {
      const q = search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Sort
  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'bestselling':
      filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) || b.reviewCount - a.reviewCount);
      break;
    default: // featured
      filtered.sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
      );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const products = filtered.slice(start, start + perPage);

  return { products, total, totalPages };
}

// ============================================================
// Helper: Get featured + bestseller products
// ============================================================
export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.bestseller).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.tags.some((t) => product.tags.includes(t)))
  ).slice(0, limit);
}

// ============================================================
// All unique tags and categories
// ============================================================
export const ALL_CATEGORIES = ['candles', 'diffusers', 'room-sprays', 'bath'] as const;

export const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap((p) => p.tags)))
  .filter((t) => !['bestseller', 'gift'].includes(t))
  .sort();

export const PRICE_RANGE = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};


// Re-export formatPrice from utils for convenience
export { formatPrice } from '@/lib/utils';

