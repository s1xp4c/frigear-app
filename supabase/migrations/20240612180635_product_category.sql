create table public.product_category
(
    id          uuid not null            default gen_random_uuid() primary key,
    name        text not null,
    description text                     default null,
    slug        text not null unique,
    created_at  timestamp with time zone default now(),
    updated_at  timestamp with time zone default null
);

create index product_category_slug on public.product_category (slug);