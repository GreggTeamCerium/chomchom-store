# Chom Chom Store

## Project Overview
Online e-commerce store for pre-owned women's clothing. Lilly Pulitzer-inspired design.

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Stripe Checkout for payments
- Lucide React icons
- Deployed on Vercel, repo at GreggTeamCerium/chomchom-store

## Architecture
- `src/lib/types.ts` — TypeScript types (Product, Order, etc.)
- `src/lib/products.ts` — Seed data (5 real + 8 dummy products)
- `src/lib/data.ts` — Data access layer (in-memory, designed to swap for Supabase)
- `src/components/` — Reusable components (Header, Footer, ProductCard, FilterSidebar, etc.)
- `src/app/` — Pages: homepage, /shop, /product/[slug], /cart, /checkout/success, /admin
- `public/products/` — 16 real product photos (JPG)

## Design
- Primary: Hot pink (#FF3E9A)
- Secondary: Emerald green (#18B35D)
- Accent: Gold (#D4A853)
- White background, feminine resort-chic aesthetic

## Current State
- MVP deployed and working
- Admin panel at /admin (password: chomchom2026) — view-only
- Stripe in demo mode (no real payments yet)
- All data is static (in-memory) — needs Supabase for persistence

## Next Steps
- Supabase integration for persistent product/order data
- Admin product upload form with multi-image upload
- Edit/delete/mark-as-sold functionality
- Real Stripe checkout connection
- Custom domain setup

## Rules
- Mobile-first responsive design
- All TypeScript, zero `any` types
- `next build` must pass clean with zero errors
- Guest checkout only (no user accounts)
- Each product is one-of-one (unique items, no inventory quantities)
