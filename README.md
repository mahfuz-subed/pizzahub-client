# PizzaHub — Pizza Ordering & Delivery Platform

A role-based pizza ordering platform where customers discover local pizza shops, browse their menus, place orders, and track them. Vendors manage their shop, menu, and incoming orders, and can upgrade to a Premium subscription. Admins manage users, menu items, and platform transactions.

## Features

- **Authentication** — Better Auth with email/password and Google sign-in, three roles (customer, vendor, admin). Admin is never created through public registration. JWT verification on protected APIs.
- **Homepage** — hero with a custom SVG illustration, featured approved menu items, pizza categories, "Why Choose PizzaHub?", and a testimonials carousel, with Motion animations.
- **Browse Menu** — public search by name, filters by category and location, and price sorting (ascending/descending).
- **Item Details** — private page with an image gallery, vendor info, and an order form (delivery date, address, message).
- **Orders** — customers place/track/cancel pending orders; vendors accept/reject; duplicate active orders are blocked.
- **Vendor Dashboard** — menu CRUD with ImgBB image upload, availability control, a 3-item Free limit, orders, and a subscription page.
- **Admin Dashboard** — overview statistics, user management (role change, block/unblock), menu review (approve/reject/delete), and read-only transactions.
- **Payments** — Stripe Checkout for the vendor Premium subscription (free vendors are limited to 3 active items).
- **UI/UX** — responsive ShadCN UI, toasts, loading/empty/error states, dark/light theme.

## Tech Stack

**Client:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ShadCN UI (base-ui), Motion (Framer Motion), Better Auth, MongoDB driver, Stripe, `lucide-react`, `react-hot-toast`, `embla-carousel-react`, `next-themes`.

**Server:** Express 5 (ES modules), MongoDB driver, Better Auth JWT verification with `jose`, Stripe, CORS, dotenv.

## Installation

```bash
# client
cd pizzahub-client
npm install

# server
cd ../pizzahub-server
npm install
```

## Environment Variables

Client `.env`:

```
MONGODB_URI
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
IMGBB_API_KEY
NEXT_PUBLIC_BASE_URL
STRIPE_SECRET_KEY
```

Server `.env`:

```
MONGODB_URI
STRIPE_SECRET_KEY
CLIENT_URL
```

## Run Locally

```bash
# server (port 5000)
cd pizzahub-server
npm run dev   # or: node index.js

# client (port 3000)
cd pizzahub-client
npm run dev
```

Open http://localhost:3000. Use `npm run build` for a production build and `npm run typecheck` for type checking.

## Demo Accounts

- Admin: `admin1@example.com` / `Admin1234`
- Vendor: `vendor1@example.com` / `Vendor1234`
- Customer: `customer2@gmail.com` / `Customer1234`

Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC.

## Challenge Implementation

### Advanced search, filters, and price sorting
`GET /menu` builds a MongoDB `query` object from URL parameters:
- `search` → case-insensitive `$regex` across item name, description, category, location, vendor name, and business name using `$or`
- `category` and `location` → exact / regex matches
- `sort=price_asc` → `{ price: 1 }`, `sort=price_desc` → `{ price: -1 }`, default `{ createdAt: -1 }`

The client writes these into the address bar (`?search=...&category=...&location=...&sort=price_asc`), so the server page can re-fetch filtered data on each change.

### JWT / token verification middleware
`app/proxy.ts` redirects logged-out users from private pages. On the Express server:
- `verifyToken` reads `Authorization: Bearer <token>`, verifies it against Better Auth's JWKS endpoint (`${CLIENT_URL}/api/auth/jwks`) using `jose`, loads the user from the `user` collection, attaches it to `req.user`, and returns **401** for missing/invalid tokens or blocked users.
- `verifyAdmin`, `verifyVendor`, and `verifyCustomer` run after `verifyToken` and return **403** for the wrong role.
- Every private API route uses this chain; public routes (`/menu`, `/menuDetails/:id`, `/menu/categories`, `/users/:id/premium`, `/`) stay open.
- Ownership checks use `req.user._id`, never ids sent by the client.

## Links

- Live site: _add your deployed URL here_
- Client repository: https://github.com/mahfuz-subed/pizzahub-client
- Server repository: _add your server repository URL here_
