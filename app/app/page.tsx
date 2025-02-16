"use server";

import { serverContainer } from "@/constants/server-container";

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

  return (
    <div className="">
      <h1>{JSON.stringify(user) || "n/a"}</h1>
    </div>
  );
}
