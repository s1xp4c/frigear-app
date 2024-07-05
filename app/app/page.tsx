"use server";

import {serverContainer} from "@/app/server-container";

export default async function AppPage() {
  const client = serverContainer.make("supabaseClient");
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error) {
    throw error;
  }
  if (!user) {
    return <h1>No user</h1>;
  }

  return <h1>{user.email || "n/a"}</h1>;
}
