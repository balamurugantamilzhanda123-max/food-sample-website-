create extension if not exists "pgcrypto";

create type public.profile_role as enum ('customer', 'admin');
create type public.order_status as enum (
  'Pending',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled'
);
create type public.payment_status as enum ('Pending', 'Paid', 'Failed', 'Refunded');
create type public.return_status as enum (
  'Requested',
  'Approved',
  'Rejected',
  'Picked Up',
  'Completed'
);
create type public.refund_status as enum (
  'Requested',
  'Processing',
  'Completed',
  'Rejected'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  mobile text,
  role public.profile_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text not null,
  gallery text[] not null default '{}',
  price numeric(10, 2) not null check (price >= 0),
  offer_price numeric(10, 2) check (offer_price is null or offer_price >= 0),
  category_id uuid not null references public.categories(id),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  description text not null,
  variant text not null,
  active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  recipient_name text not null,
  mobile text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  address_id uuid references public.addresses(id),
  delivery_address jsonb not null,
  subtotal numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  payment_status public.payment_status not null default 'Pending',
  order_status public.order_status not null default 'Pending',
  invoice_url text,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text not null,
  variant text not null,
  quantity integer not null check (quantity > 0),
  price numeric(10, 2) not null
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'Razorpay',
  provider_order_id text not null,
  provider_payment_id text,
  amount numeric(10, 2) not null,
  status text not null default 'Created',
  raw_response jsonb,
  created_at timestamptz not null default now()
);

create table public.returns (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  status public.return_status not null default 'Requested',
  created_at timestamptz not null default now()
);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(10, 2) not null,
  reason text not null,
  status public.refund_status not null default 'Requested',
  created_at timestamptz not null default now()
);

create table public.admin_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, mobile)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'mobile'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.addresses enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.returns enable row level security;
alter table public.refunds enable row level security;
alter table public.admin_settings enable row level security;

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "Public can read active categories"
on public.categories for select
using (active = true or public.is_admin());

create policy "Admins manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "Public can read active products"
on public.products for select
using (active = true or public.is_admin());

create policy "Admins manage products"
on public.products for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users manage own addresses"
on public.addresses for all
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

create policy "Users manage own cart"
on public.cart_items for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users and admins read orders"
on public.orders for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users create own orders"
on public.orders for insert
with check (auth.uid() = user_id);

create policy "Admins update orders"
on public.orders for update
using (public.is_admin())
with check (public.is_admin());

create policy "Users and admins read order items"
on public.order_items for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

create policy "Users read own payments and admins read all"
on public.payments for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = payments.order_id
      and orders.user_id = auth.uid()
  )
);

create policy "Admins manage payments"
on public.payments for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users create own return requests"
on public.returns for insert
with check (auth.uid() = user_id);

create policy "Users and admins read return requests"
on public.returns for select
using (auth.uid() = user_id or public.is_admin());

create policy "Admins update return requests"
on public.returns for update
using (public.is_admin())
with check (public.is_admin());

create policy "Users create own refund requests"
on public.refunds for insert
with check (auth.uid() = user_id);

create policy "Users and admins read refund requests"
on public.refunds for select
using (auth.uid() = user_id or public.is_admin());

create policy "Admins update refund requests"
on public.refunds for update
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage settings"
on public.admin_settings for all
using (public.is_admin())
with check (public.is_admin());
