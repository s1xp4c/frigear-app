"use server";

import {url} from "@/utils/helpers";
import {redirect} from "next/navigation";
import {serverContainer} from "@/app/server-container";

export async function signUp({ email }: { email: string }) {
  if (!email || email.length <= 2) {
    throw new Error(`No email.`);
  }

  const client = serverContainer.make("supabaseClient");
  const { data, error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: url("/auth/callback"),
      data: {
        email,
      },
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.warn("Unhandled error. //TODO: Fix");
    throw error;
  }

  if (!data) {
    console.warn("No data.");
  }

  return redirect(url("/"));
}
