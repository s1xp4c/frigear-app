import { createBrowserClient } from '@supabase/ssr';
import { jwtDecode } from 'jwt-decode';
import type { DatabaseUserProfile } from '@/lib/database/types';
import type { User } from '@supabase/supabase-js';

export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );


export async function useSupabaseBrowserUser(): Promise<User|undefined> {
  try {
    const client = createSupabaseBrowserClient();
    const { data } = await client.auth.getUser();

    if (!data || !data.user) {
      return undefined;
    }

    return data.user;
  } catch (err: any) {
    return undefined;
  }
}

export async function useSupabaseBrowserJwt() {
  const client = createSupabaseBrowserClient();
  const { data } = await client.auth.getSession();

  if (!data || !data.session) {
    return {};
  }

  return jwtDecode(data.session.access_token) as {
    profile: DatabaseUserProfile;
  };
}
