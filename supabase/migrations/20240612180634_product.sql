-- Products
create table public.product
(
    id               uuid    not null         default gen_random_uuid() primary key,
    slug             text    not null unique,
    stripe_id        text                     default null,
    last_stripe_sync timestamp with time zone default null,
    name             text    not null,
    active           boolean not null         default true,
    price            float   not null         default 0.0,
    currency_code    text    not null         default 'EUR',
    role_prices      jsonb   not null         default '{}'::jsonb,
    role_vat         jsonb   not null         default '{}'::jsonb,
    default_stripe_price_id text                     default null,
    description      text                     default null,
    features         jsonb   not null         default '{}'::jsonb,
    tags             jsonb   not null         default '[]'::jsonb,
    related_ids      jsonb   not null         default '[]'::jsonb,
    replaced_by      uuid                     default null references public.product (id) on delete cascade,
    meta             jsonb   not null         default '{}'::jsonb,
    metrics          jsonb   not null         default '{}'::jsonb,
    discontinued_at  timestamp with time zone default null,
    created_at       timestamp with time zone default now(),
    updated_at       timestamp with time zone default null
);

create index product_slug on public.product (slug);

alter table public.product
    enable row level security;

create policy "Product can only be viewed by admin"
    on public.product as permissive for select using (public.current_user_has_role('admin'));

create policy "Product can only be updated by admin"
    on public.product as permissive for update using (public.current_user_has_role('admin'));

create policy "Product can only be deleted by admin"
    on public.product as permissive for delete using (public.current_user_has_role('admin'));

create policy "Product can only be viewed by manager"
    on public.product as permissive for select using (public.current_user_has_role('manager'));

create policy "Product can only be updated by manager"
    on public.product as permissive for update using (public.current_user_has_role('manager'));

create policy "Product can only be viewed publicly if it is active"
    on public.product as permissive for select using (active = true);