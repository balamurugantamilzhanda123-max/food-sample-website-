# EverydayFresh Food/Grocery Commerce

A responsive Next.js e-commerce starter for food and grocery sales with OTP login, customer profile, cart, checkout, Razorpay-ready payment routes, orders, returns, refunds, and a separate secure admin panel.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage-ready structure, and RLS policies
- Razorpay-ready server-side order creation and signature verification
- Vercel-ready environment variables

## Local Setup

```bash
npm.cmd install
npm.cmd run dev
```

PowerShell may block `npm.ps1` on some Windows machines, so use `npm.cmd` as shown above.

After building, you can also serve the production build on port 3000:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\scripts\start-server.ps1 -Port 3000
```

Create `.env.local` in the project root:

```text
C:\Users\Bala Murugan\OneDrive\Documents\food sample\.env.local
```

Fill these values when connecting real services. This is a Next.js project, so Supabase browser auth must use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are only for Vite apps and will not fix login here.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the values from Supabase Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`: Project URL, like `https://your-project-ref.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project API `anon public` key. This is a long JWT-style value that usually starts with `eyJ`; do not paste the short project ref or service role key here.
- `SUPABASE_SERVICE_ROLE_KEY`: Optional server-only service role key. Do not expose it in frontend code.

Without Supabase public keys, OTP login, protected customer routes, admin routes, and admin APIs fail closed with a configuration message. The `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be imported into frontend components.

## Main Routes

- Customer: `/`, `/products`, `/products/[slug]`, `/cart`, `/checkout`, `/payment`, `/order-success`, `/orders`, `/profile`, `/contact`
- Auth: `/login`, `/signup`, `/verify-otp`
- Admin: `/admin/login`, `/admin/dashboard`, `/admin/products`, `/admin/products/new`, `/admin/orders`, `/admin/customers`, `/admin/returns`, `/admin/refunds`, `/admin/payments`, `/admin/categories`, `/admin/settings`
- Server API: `/api/payments/create-order`, `/api/payments/verify`, `/api/admin/products`, `/api/admin/orders/[id]/status`

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` for starter categories and products.
4. Enable email OTP in Supabase Auth settings.
5. Create an admin account, then set that user's row in `profiles.role` to `admin`.
6. Add `http://localhost:3000/auth/callback` and your production `/auth/callback` URL to Supabase Auth redirect URLs.

RLS policies ensure customers can only access their own profile, addresses, cart, orders, returns, refunds, and payments. Admin-only writes are protected through role checks and server routes.

## Razorpay Setup

Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID`.

- `/api/payments/create-order` creates Razorpay orders server-side.
- `/api/payments/verify` validates payment signatures server-side.
- Secret keys are never exposed to frontend code.

## Deployment

Deploy to Vercel and add the same environment variables in Project Settings. Set `NEXT_PUBLIC_SITE_URL` to the production URL.

## Notes For Next Implementation Pass

This version includes complete responsive screens, secure route/API structure, schema, RLS, and demo data. The next production hardening pass should wire forms to Supabase mutations, add real image uploads to Supabase Storage, connect Razorpay Checkout.js on the payment page, and add automated tests for route guards and payment verification.
