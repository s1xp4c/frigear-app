create table public.post
(
    id         uuid                     not null default gen_random_uuid() primary key,
    slug       character varying        not null unique,
    status     character varying                 default 'draft',
    title      character varying        not null,
    excerpt    character varying                 default null,
    markdown   character varying                 default null,
    tags       jsonb                    not null default '[]'::jsonb,
    authors    jsonb                    not null default '[]'::jsonb,
    options    jsonb                    not null default '{}'::jsonb,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone          default null
);

alter table public.post
    enable row level security;

create index posts_slug_idx on public.post (slug);