import { createBrowserClient } from "@supabase/ssr";

// TODO: https://github.com/nuxt-modules/supabase/blob/main/src/runtime/plugins/supabase.client.ts
export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
