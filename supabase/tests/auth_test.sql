begin;
select plan(14);

select has_table('profile');
select has_column('profile', 'id');
select col_is_fk('profile', 'id'); -- references auth.user
select col_is_pk('profile', 'id'); -- is primary key

select has_column('profile', 'role');
select col_not_null('profile', 'role');

select has_column('profile', 'nickname');
select col_not_null('profile', 'nickname');
select col_is_unique('profile', 'nickname');

select has_column('profile', 'settings');
select has_column('profile', 'fields');
select has_column('profile', 'updated_at');
select has_column('profile', 'created_at');

select policies_are('profile', ARRAY [
    'User Profile can only be viewed by owner',
    'User Profile can only be viewed by admin']);

select *
from finish();
rollback;
