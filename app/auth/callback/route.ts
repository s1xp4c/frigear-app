import {type EmailOtpType} from '@supabase/supabase-js'
import {type NextRequest, NextResponse} from 'next/server'

import {serverContainer} from "@/app/server-container";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'

    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('token_hash')
    redirectTo.searchParams.delete('type')
    try {

        if (token_hash && type) {
            const supabase = serverContainer.make('supabaseClient')

            const {error} = await supabase.auth.verifyOtp({
                type,
                token_hash,
            })
            if (!error) {
                redirectTo.searchParams.delete('next')
                return NextResponse.redirect(redirectTo)
            }
        }

        // return the user to an error page with some instructions
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
    } catch (err) {
        return err;
    }
}