"use server";

import {url} from "@/utils/helpers";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {createSupabaseActionClient} from "@/utils/supabase/action";

export async function signUp({email}: { email: string }) {
    if (!email || email.length <= 2) {
        throw new Error(`No email.`);
    }

    const client = createSupabaseActionClient();
    const {data, error} = await client.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: url('/auth/callback'),
            data:{
                email,

            },
            shouldCreateUser: true,
        }
    });

    cookies().set({value: email, name: 'email'});

    if(error){
        console.warn('Unhandled error. //TODO: Fix')
        throw error;
    }

    if(!data){
        console.warn('No data.');
    }

    return redirect(url('/'));
}