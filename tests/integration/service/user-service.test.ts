import { describe, expect, it } from 'vitest';
import { createSupabaseServiceRoleClient } from '@/utils/supabase/server';
import AdminUserService from '@/lib/services/admin/admin-user-service';
import { email, password } from '@/tests/mock-data';

describe('service#admin/user-service', () => {
  it('should create a new user and delete it', async () => {
    const client = createSupabaseServiceRoleClient();
    const userService = new AdminUserService(client);
    const user = await userService.create({
      email: `1${email}`,
      email_confirm: true,
      password,
    });

    expect(user).toBeDefined();

    if (user) {
      expect(user.email).toBe(`1${email}`);
      await userService.deleteById(user.id);
    }
  });
});
