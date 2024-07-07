import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { User } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import type { DatabaseUserProfile } from '@/lib/database/types';

export const createSupabaseServiceRoleClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {},
    },
  );
};

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );

  return supabase;
};
// React Cache: https://react.dev/reference/react/cache
// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
export async function fetchServerSupabaseUser(): Promise<User | undefined> {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user || undefined;
  } catch (err: any) {
    console.error(err);
    return undefined;
  }
}

export async function useServerSupabaseSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session || undefined;
  } catch (err: any) {
    console.error(err);
    return undefined;
  }
}

export async function useServerSupabaseSessionUserProfile() {
  const session = await useServerSupabaseSession();

  if (!session || !session.access_token) {
    return undefined;
  }

  const jwt = jwtDecode(session.access_token) as {
    profile?: DatabaseUserProfile;
  };

  return jwt;
}
