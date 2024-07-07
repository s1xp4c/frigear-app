import { createBrowserClient } from '@supabase/ssr';
import { jwtDecode } from 'jwt-decode';
import { DatabaseUserProfile } from '@/lib/database/types';

export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

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
