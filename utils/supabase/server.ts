import 'server-only';
import {cache} from 'react';
import {CookieOptions, createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';

export const createSupabaseServiceRoleClient = () => {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                }
            }
        }
    );
}

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
                    cookieStore.delete({ name, ...options });
                }
            }
        }
    );

    return supabase;
};
// React Cache: https://react.dev/reference/react/cache
// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
async function getSessionUser() {
    const supabase = createServerSupabaseClient();
    try {
        const {
            data: {user}
        } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const getSession = cache(getSessionUser);