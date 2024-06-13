create table public.post
(
    id         uuid                     not null default gen_random_uuid() primary key,
    slug       text                     not null unique,
    status     text                              default 'draft',
    title      text                     not null,
    excerpt    text                              default null,
    markdown   text                              default null,
    tags       jsonb                    not null default '[]'::jsonb,
    authors    jsonb                    not null default '[]'::jsonb,
    options    jsonb                    not null default '{}'::jsonb,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone          default null
);

create index posts_slug_idx on public.post (slug);

alter table public.post
    enable row level security;

create policy "Post can only be viewed by admin"
    on public.post as permissive for select using (public.current_user_has_role('admin'));

create policy "Post can only be edited by admin"
    on public.post as permissive for update using (public.current_user_has_role('admin'));

create policy "Post can only be deleted by admin"
    on public.post as permissive for delete using (public.current_user_has_role('admin'));

create policy "Post can only be viewed by manager"
    on public.post as permissive for select using (public.current_user_has_role('manager'));

create policy "Post can only be updated by manager"
    on public.post as permissive for update using (public.current_user_has_role('manager'));

create policy "Post can only be viewed publicly if it is published"
    on public.post as permissive for select using (status = 'published');

create policy "Post can only be viewed by user if it is published"
    on public.post as permissive for select using (status = 'published' AND public.current_user_has_role('user'));

