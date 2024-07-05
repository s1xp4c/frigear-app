-- user profiles
create table public.profile
(
    id         uuid  not null primary key references auth.users (id) on delete cascade,
    role       text  not null,
    nickname   text  not null unique,
    settings   jsonb not null           default '{}'::jsonb,
    fields     jsonb not null           default '{}'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default null
);

create index profile_nickname on public.profile (nickname);

-- Authorization
create or replace function public.current_user_has_role(requested_role text)
    returns boolean
    language plpgsql
    stable security definer set search_path = ''
as
$$
declare
    user_role text;
begin
    -- Fetch user role once and store it to reduce number of calls
    select (auth.jwt() -> 'profile' ->> 'role')::text into user_role;
    return requested_role = user_role;
end;
$$;

-- Adds additional data to the jwt for a user
create or replace function public.custom_access_token_hook(event jsonb)
    returns jsonb
    language plpgsql
    stable
as
$$
declare
    claims  jsonb;
    profile public.profile;
begin
    -- Fetch the user role in the user_roles table
    select * into profile from public.profile where id = (event ->> 'user_id')::uuid;

    claims := event -> 'claims';

    if profile is not null then
        -- Set the claim
        claims := jsonb_set(claims, '{profile}', to_jsonb(profile));
    else
        claims := jsonb_set(claims, '{profile}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
end;
$$;
grant execute
    on function public.custom_access_token_hook
    to supabase_auth_admin;

grant usage on schema public to supabase_auth_admin;

revoke execute
    on function public.custom_access_token_hook
    from authenticated, anon, public;


-- this will mostly only be read by service roles.
alter table public.profile
    enable row level security;

create policy "User Profile can only be viewed by owner"
    on public.profile as permissive for select using (auth.uid() = id);

create policy "User Profile can only be viewed by admin"
    on public.profile as permissive for select using (public.current_user_has_role('admin'));


-- inserts a row into public.profile
create function public.handle_auth_user_created()
    returns trigger
    language plpgsql
    security definer set search_path = public
as
$$
declare
    with_role text = 'user';
begin
--     TODO: use new.raw_user_meta_data to also fill profile.
    insert into public.profile (id, nickname, role)
    values (new.id, new.email, with_role);
    return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute function public.handle_auth_user_created();

-- Searching for user id by email address
create or replace function get_user_id_by_email(email text)
    returns table
            (
                id UUID
            )
    language plpgsql
    security definer
as
$$
begin
    return query
        select au.id
        from auth.users au
        where au.email = email;
end;
$$;
