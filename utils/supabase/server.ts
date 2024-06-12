import {createServerClient, type CookieOptions} from "@supabase/ssr";
import {cookies} from "next/headers";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";


export const createSupabaseServerClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: supabaseSSRCookieManager(cookieStore),
        },
    );
};

export const createSupabaseServiceRoleClient = () => {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_SUPABASE_SERVICE_ROLE!,
        {
            cookies: supabaseSSRCookieManager(cookieStore)
        }
    )
}

export const supabaseSSRCookieManager = (cookieStore: ReadonlyRequestCookies) => ({
    get(name: string) {
        return cookieStore.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
        try {
            cookieStore.set({name, value, ...options});
        } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
        }
    },
    remove(name: string, options: CookieOptions) {
        try {
            cookieStore.set({name, value: "", ...options});
        } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // @see /utils/supabase/middleware & /middleware.ts
        }
    },
})
