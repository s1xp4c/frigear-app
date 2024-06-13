insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at,
                        last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
                        confirmation_token, email_change, email_change_token_new, recovery_token)
    (select '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4(),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@app.localhost',
            crypt('password123', gen_salt('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
     from generate_series(1, 10));

-- test user email identities
insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    (select uuid_generate_v4(),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
     from auth.users);

create or replace function public.change_user_email_and_set_role(old_email text, new_email text, new_role text = 'user')
    returns boolean
    language plpgsql
    volatile set search_path = ''
as
$$
declare
    user_id_to_change uuid;
begin
    select id into user_id_to_change from auth.users where email = old_email;

    if user_id_to_change is null then
        raise notice 'no user found.';
        return false;
    end if;
    --update user email
    update auth.users set email = new_email where id = user_id_to_change;
    --update identity for user
    update auth.identities
    set identity_data = format('{"sub":"%s","email":"%s"}', id::text, new_email)::jsonb
    where user_id = user_id_to_change;
    --update role
    update public.profile set role = new_role where id = user_id_to_change;
    update public.profile set nickname = new_email where id = user_id_to_change;
    return true;
end;
$$;


do
$$
    begin
        perform public.change_user_email_and_set_role(
                       'user10@app.localhost',
                       'admin@app.localhost',
                       'admin');

        perform public.change_user_email_and_set_role(
                       'user9@app.localhost',
                       'manager@app.localhost',
                       'manager');

        perform public.change_user_email_and_set_role(
                       'user8@app.localhost',
                       'volunteer@app.localhost',
                       'volunteer');
    end;
$$;

