begin;
select plan(6);

select has_table('product');
select has_column('product', 'id');
select col_is_pk('product', 'id'); -- is primary key

select has_column('product', 'slug');
select col_is_unique('product', 'slug');

select has_column('product', 'stripe_id');

select *
from finish();
rollback;
