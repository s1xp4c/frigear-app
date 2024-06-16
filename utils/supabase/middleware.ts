import {createServerClient, type CookieOptions} from "@supabase/ssr";
import {type NextRequest, NextResponse} from "next/server";
import {ValidationError} from "@/lib/errors";

export const updateSession = async (request: NextRequest) => {
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    // If the cookie is updated, update the cookies for the request and response
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    // If the cookie is removed, update the cookies for the request and response
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        },
    );

    // https://supabase.com/docs/guides/auth/server-side/nextjs
    // This is required for server components.
    await supabase.auth.getUser();

    return response;
};


export async function translateSupabaseError(
    error: any,
    messages: {
        duplicate_key?: string;
    } = {}
) {
    //duplicate key value violates unique constraint "product_slug_key"
    if (error && error.code && error.code === '23505') {
        throw new ValidationError(error.details || messages.duplicate_key || error.message);
    }

    if (error) throw error;
}