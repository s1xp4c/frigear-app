import {type NextRequest, NextResponse} from 'next/server'

import {serverContainer} from "@/app/server-container";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('code')
    console.log(request.url);
    try {
        if (code) {
            const supabase = serverContainer.make('supabaseClient')

            const {data, error} = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                console.warn('Unhandled error: //TODO: fix')
                throw error;
            }

            if (data && data.session) {
                await supabase.auth.setSession(data.session)
                console.log(data);
            }

            redirectTo.searchParams.delete('next')
            return NextResponse.redirect(redirectTo)
        }


        // return the user to an error page with some instructions
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
    } catch (err) {
        throw err;
        return err;
    }
}