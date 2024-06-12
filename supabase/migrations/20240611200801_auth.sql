-- user profiles
create table public.user_profile
(
    id         uuid              not null primary key references auth.users (id) on delete cascade,
    nickname   character varying not null default 'my-nick',
    email      character varying not null,
    role       character varying not null default 'user',
    settings   jsonb             not null default '{}'::jsonb,
    fields     jsonb             not null default '{}'::jsonb,
    created_at timestamp with time zone   default now(),
    updated_at timestamp with time zone   default null
);

-- this will only be read by service roles.
alter table public.user_profile
    enable row level security;

create policy "profile can only be viewed by its owner."
    on public.user_profile
    as permissive
    for select
    using (auth.uid() = id);

-- syncs fields back to the auth.users when user_profile is updated
create function public.handle_public_user_profile_updated()
    returns trigger
    language plpgsql
    security definer
    set search_path = public
as
$$
declare
    changed              boolean = false;
    current_app_metadata jsonb   = '{}'::jsonb;
begin
    -- fetch current app metadata
    select app_metadata
    from auth.users
    where id = old.id
    into current_app_metadata;

    -- updating role
    if new.role != old.role then
        select jsonb_set(current_app_metadata, 'role', new.role)
        into current_app_metadata;
        changed = true;
    end if;

    if changed then
        update auth.users
        set app_metadata = current_app_metadata
        where id = old.id;
    end if;
end;
$$;

-- inserts a row into public.user_profile
create function public.handle_auth_user_created()
    returns trigger
    language plpgsql
    security definer set search_path = public
as
$$
declare
    with_role character varying = 'user';
begin
    if new.email = 'someemail@frigear.nonexistingtld' then
        with_role := 'admin';
    end if;

    insert into public.user_profile (id, nickname, email, role)
    values (new.id, new.email, new.email, with_role);
    return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute function public.handle_auth_user_created();

-- updates user_profile when auth.user is updated
create function public.handle_auth_user_updated()
    returns trigger
    language plpgsql
    security definer set search_path = public
as
$$
begin
    -- update email on user_profile if it changed
    -- TODO: Check if this already will have email_verified = true
    --  or if that is triggered later and we need to check it.
    if new.email != old.email then
        update user_profile
        set email = new.email
        where id = new.id;
    end if;
end;
$$;

-- trigger the function when updated.
create trigger on_auth_user_updated
    after update
    on auth.users
    for each row
execute function public.handle_auth_user_updated();