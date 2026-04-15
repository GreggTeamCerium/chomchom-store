# Chom Chom Store 🌴

Pre-loved designer women's fashion store built with Next.js.

## Tech Stack
- **Next.js 15+** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **Stripe** (payment processing)
- **Lucide React** (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages
- `/` — Homepage with featured products
- `/shop` — Full product grid with filters (size, brand, category, condition)
- `/product/[slug]` — Product detail with image gallery
- `/cart` — Shopping cart
- `/checkout/success` — Order confirmation
- `/admin` — Admin dashboard (password: `chomchom2026`)
- `/admin/products` — Product management
- `/admin/orders` — Order management

## Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys from the Stripe dashboard
3. Add them to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

Without Stripe configured, checkout runs in **demo mode** (redirects directly to success page).

## Deployment
Deploy to Vercel:
```bash
npm run build
# or push to GitHub and connect to Vercel
```

## Future Improvements
- Supabase database integration
- Cloudinary image hosting
- Product upload form in admin
- Email notifications
- Instagram feed integration
