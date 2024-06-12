-- Products
create table public.product
(
    id              uuid              not null default gen_random_uuid() primary key,
    slug            character varying not null unique,
    name            character varying not null,
    active          boolean           not null default true,
    description     character varying          default null,
    properties      jsonb             not null default '{}'::jsonb,
    tags            jsonb             not null default '[]'::jsonb,
    related_ids     jsonb             not null default '[]'::jsonb,
    replaced_by     uuid                       default null references public.product (id) on delete cascade,
    meta            jsonb             not null default '{}'::jsonb,
    metrics         jsonb             not null default '{}'::jsonb,
    discontinued_at timestamp with time zone   default null,
    created_at      timestamp with time zone   default now(),
    updated_at      timestamp with time zone   default null
);

alter table public.product
    enable row level security;

create index product_slug_idx on public.product (slug);