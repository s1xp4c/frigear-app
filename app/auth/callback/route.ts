import { type NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/admin';

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('code');

  if (code) {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.warn('Unhandled error: //TODO: fix');
      throw error;
    }

    if (data && data.session) {
      await supabase.auth.setSession(data.session);
    }

    redirectTo.searchParams.delete('next');
    return NextResponse.redirect(redirectTo);
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
}
