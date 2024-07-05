'use client';
import {appContainer} from "@/app/app-container";
import {router} from "next/client";

export default async function Page() {
    const client = appContainer.make('supabaseClient');
    await client.auth.signOut();
    await router.replace('/');
}