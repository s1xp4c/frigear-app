'use server';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export default async function Page() {
  const client = createServerSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <div className="mx-auto mt-[10%]">
      <div>Page</div>
      <div>Hello {user?.email}</div>
    </div>
  );
}
