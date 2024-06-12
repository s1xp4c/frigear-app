BEGIN;
SELECT plan(1);

SELECT has_column('public', 'user_profile', 'id', 'id should exist');
SELECT has_column('public', 'user_profile', 'role', 'role should exist');
SELECT has_column('public', 'user_profile', 'settings', 'settings should exist');
SELECT has_column('public', 'user_profile', 'settings', 'settings should exist');
SELECT has_column('public', 'user_profile', 'fields', 'fields should exist');

SELECT *
FROM finish();
ROLLBACK;
