insert into public.categories (name, slug, description, image_url)
values
  (
    'Fresh Fruits',
    'fresh-fruits',
    'Seasonal fruits sourced daily from trusted farms.',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Vegetables',
    'vegetables',
    'Crisp vegetables packed for everyday cooking.',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Dairy',
    'dairy',
    'Milk, paneer, curd, butter, and breakfast staples.',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Pantry',
    'pantry',
    'Daily essentials, grains, oils, snacks, and spices.',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80'
  )
on conflict (slug) do nothing;

insert into public.products (
  name,
  slug,
  image_url,
  gallery,
  price,
  offer_price,
  category_id,
  stock_quantity,
  description,
  variant,
  active,
  featured
)
select
  'Alphonso Mango Box',
  'alphonso-mango-box',
  'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=900&q=80',
  array['https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=900&q=80'],
  999,
  849,
  categories.id,
  42,
  'Premium handpicked Alphonso mangoes, naturally ripened and packed in a sturdy gift-ready box.',
  '12 pcs',
  true,
  true
from public.categories
where categories.slug = 'fresh-fruits'
on conflict (slug) do nothing;

insert into public.products (
  name,
  slug,
  image_url,
  gallery,
  price,
  offer_price,
  category_id,
  stock_quantity,
  description,
  variant,
  active,
  featured
)
select
  'Fresh Malai Paneer',
  'fresh-malai-paneer',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',
  array['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80'],
  180,
  159,
  categories.id,
  28,
  'Soft and creamy paneer made from fresh milk for gravies, starters, and rolls.',
  '200 g',
  true,
  true
from public.categories
where categories.slug = 'dairy'
on conflict (slug) do nothing;

insert into public.admin_settings (key, value)
values
  ('store', '{"name":"FreshCart","support_email":"support@freshcart.example"}'),
  ('payments', '{"provider":"razorpay","currency":"INR"}'),
  ('delivery', '{"fee":40,"free_delivery_above":999}')
on conflict (key) do update set value = excluded.value;
