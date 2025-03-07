'use server';
import {
  useServerSupabaseSession,
  useServerSupabaseSessionUserProfile,
} from '@/utils/supabase/server';
import { useServerSupabaseUser } from '@/utils/supabase/server.react';

export default async function Page() {
  const user = await useServerSupabaseUser();
  const session = await useServerSupabaseSession();
  const profile = await useServerSupabaseSessionUserProfile();
  return (
    <div className="mx-auto mt-[10%]">
      <div>Page</div>
      <div>Hello {user?.email}</div>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
